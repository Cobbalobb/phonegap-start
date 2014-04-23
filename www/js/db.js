//Declare gloabl variables
var db = window.openDatabase("User", "1.0", "User DB", 1000000);
var show;
// Variable to enable web testing
var web = true;
var redirecttologin = false;

function logout(){
    function dropDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    }

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        //alert("success!");
        //document.location.href = 'index.html';
    }
    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(dropDB, errorCB, successCB);

    function dropFP(x) {
    x.executeSql('DROP TABLE IF EXISTS Footprint');
    }

    function errorFP(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successFP() {
        show = true;
        redirecttologin = true;
        goToLogin();
    }
    db.transaction(dropFP, errorFP, successFP);
}

function login(id, first_name, last_name, email, image, facebookid, fbactions, total_actions_added){
    var count = 0;
    var data = new FormData();
    data.append("id", id);
    window.localStorage.setItem("id", id);

    function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    tx.executeSql('CREATE TABLE IF NOT EXISTS User (id unique, first_name, last_name, email, image, facebookid, fbactions, total_actions_added)');
    tx.executeSql('DROP TABLE IF EXISTS Actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Actions (id, action, description, reduction, category)');
   
    tx.executeSql('DROP TABLE IF EXISTS user_actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS user_actions (user_id, action_id, status, timestamp)');
    
    tx.executeSql('DROP TABLE IF EXISTS completed_badges');
    tx.executeSql('CREATE TABLE IF NOT EXISTS completed_badges (user_id, badge_id, completed)');    
    tx.executeSql('DROP TABLE IF EXISTS badges');
    tx.executeSql('CREATE TABLE IF NOT EXISTS badges (id, badge)');
    tx.executeSql('INSERT INTO User (id, first_name, last_name, email, image, facebookid, fbactions, total_actions_added) VALUES (?,?,?,?,?,?,?,?)',[id, first_name, last_name, email, image, facebookid, fbactions, total_actions_added]);
    }

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        count += 1;
        if(count == 6){
            redirect();
        }
    }
    db.transaction(populateDB, errorCB, successCB);
    
    //GET ACTIONS FROM SERVER TO LOCAL DB
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
                //function(response) { 
                    db.transaction(function (tx) {  
                    for(var i = 0; i < response.length; i++){
                        //alert(response[i]['action']);
                        tx.executeSql('INSERT INTO Actions (id, action, description, reduction, category) VALUES (?,?,?,?,?)', [response[i]['id'],response[i]['action'],response[i]['description'],response[i]['reduction'],response[i]['category']]);
                    };
                  });
               count += 1;
                if(count == 6){
                    redirect();
                }
        }
      }
    xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getactions.php");
    xmlhttp.send();

    //GET ACTIONS FROM SERVER TO LOCAL DB
    baxmlhttp=new XMLHttpRequest();
    baxmlhttp.onreadystatechange=function()
      {
      if (baxmlhttp.readyState==4 && baxmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(baxmlhttp.responseText);
            console.log("badges all: " + response);
                //function(response) { 
                    db.transaction(function (tx) {  
                    for(var i = 0; i < response.length; i++){
                        //alert(response[i]['action']);
                        tx.executeSql('INSERT INTO Badges (id, badge) VALUES (?,?)', [response[i]['id'],response[i]['badge']]);
                    };
                  });
               count += 1;
            if(count == 6){
                redirect();
            }
        }
      }
    baxmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getallbadges.php");
    baxmlhttp.send();

    //GET USER ACTIONS FROM SERVER TO LOCAL DB
    cxmhttp=new XMLHttpRequest();
    cxmhttp.onreadystatechange=function()
      {
      if (cxmhttp.readyState==4 && cxmhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(cxmhttp.responseText);
            console.log("list actions: " + response);
                //function(response) { 
                    db.transaction(function (tx) {  
                    for(var i = 0; i < response.length; i++){
                        //  console.log('HERE');
                        //console.log(response[i]);
                        tx.executeSql('INSERT INTO user_actions (user_id, action_id, status, timestamp) VALUES (?,?,?,?)',[response[i]['user_id'], response[i]['action_id'], response[i]['status'], response[i]['timestamp']]);                    
                    };
                  });
               count += 1;
                if(count == 6){
                    redirect();
                }
        }
      }
    cxmhttp.open("POST","http://carbon.jamescobbett.co.uk/services/getuseractions.php");
    cxmhttp.send(data);

    //GET COMPLETED BADGES FROM SERVER TO LOCAL DB
    bxmhttp=new XMLHttpRequest();
    bxmhttp.onreadystatechange=function()
      {
      if (bxmhttp.readyState==4 && bxmhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(bxmhttp.responseText);
            console.log("badges: " + response);
                //function(response) { 
                    db.transaction(function (tx) {  
                    for(var i = 0; i < response.length; i++){
                        //  console.log('HERE');
                        //console.log(response[i]);
                        tx.executeSql('INSERT INTO completed_badges (user_id, badge_id, completed) VALUES (?,?,?)',[response[i]['user_id'], response[i]['badge_id'], response[i]['completed']]);                    
                    };
                  });
               count += 1;
                if(count == 6){
                    redirect();
                }
        }
      }
    bxmhttp.open("POST","http://carbon.jamescobbett.co.uk/services/getbadges.php");
    bxmhttp.send(data);

    // GET FOOTPRINT FROM DB
    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/getfootprint.php";

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                if (message == -1){
                    var response = JSON.parse(this.responseText);
                    console.log(response['house']);
                    footprintToDatabase(response['id'], response['house'], response['meat'], response['organic'], response['local'], response['compost'], response['total_clothes'], response['total_electronics'], response['total_shopping'], response['car_engine'], response['car_miles'], response['train'], response['bus'], response['domestic_flights'], response['short_flights'], response['long_flights'], response['total'], response['current']);
                    count += 1;
                    if(count == 6){
                        redirect();
                    }
                }
                else {
                }
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);


    //setTimeout(function(){redirect();},2500);

    return false;

    //footprintToDatabase(id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total);

}

function redirect(){
    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT total FROM Footprint', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        closebadgepopup();
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            var original_footprint = results.rows.item(num-1).total; //original footprint
            if (original_footprint == 'undefined'){
                html = '<h1 id="badgeearned">Welcome to Carbon Cutter</h1>';
                html += '<div id="badge-name"><h3>The next stage is to complete the carbon footprint calculator. This will provide an estimate of your footprint, and allow you start monitoring your footprint reductions.</h3></div>';
                html += '<div id="welcome-link"><a id="close-badge" href="#" onclick="closebadgepopup(); goToCalculator();">Go to calculator</a></div>';
                $('#badgealert').append(html);
                $( "#badgealert" ).addClass( "extra-height" );
                $('#bgfade').fadeIn();
                $('#badgealert').fadeIn();
                //goToCalculator();
            } else {
                //document.location.href = 'index.html';
                goToHome();
            }
            return false;
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("FP Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
}

function getCurrentUsersName() {
//alert('392');
    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT first_name FROM User', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            $('#name').append(results.rows.item(num-1).first_name + ',');
            //alert("name: "+results.rows.item(num-1).first_name);
            $( document ).ready(function() {
                newsfeed();
            });
            return false;
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        redirecttologin = true;
        goToLogin();
    }
    db.transaction(queryDB, errorCB);
 }

function getCurrentUsersImage() {

    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT image FROM User', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            if(results.rows.item(num-1).image == ""){
                document.getElementById("user-img").innerHTML = "<img alt='user-image' src='../www/img/nopic.jpg'</img>";
            } else {
                document.getElementById("user-img").innerHTML = "<img alt='user-image' src='"+results.rows.item(num-1).image+"'</img>";
            }
            return false;
        } else {
            document.getElementById("user-img").innerHTML = "<img alt='user-image' src='../img/nopic.jpg'</img>";
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("Image Error processing SQL: "+err.code);
        //goToLogin();
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }

function getCurrentUsersID(goToCalc) {
    //alert('470');
    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT id, fbactions FROM User', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            console.log('No rows affected!');
            console.log(results.rows.item(num-1).id);
            //alert('found results');
            var id = results.rows.item(num-1).id;
            //$('#name').append(results.rows.item(num-1).first_name + ',');
            console.log("id: " + id);
            window.localStorage.setItem("id", id);
            window.localStorage.setItem("fbactions", results.rows.item(num-1).fbactions);
            if(goToCalc == true){
                goToCalculator();
            } else {
                return id;
            }
        } else {

        }
        // for an insert statement, this propert will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("ID Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }

 function getCurrentUsersFootprint() {

    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT current FROM Footprint', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            var orignal_footprint = results.rows.item(num-1).total; //original footprint
            var fp = results.rows.item(num-1).current;
            //alert(fp);
            if (fp == undefined){
                goToCalculator();      
            } else {
                document.getElementById("footprint").innerHTML="<h1 class='dynamic'>"+Math.round(fp * 100) / 100+" tonnes<br />" + document.getElementById("footprint").innerHTML;
                //$('#footprint').append("<h1 class='dynamic'>"+results.rows.item(num-1).current+" KG");
                return false;
            }
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("FP Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }

 function getCurrentUsersReduction() {

    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT * FROM Footprint', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            var orignal_footprint = results.rows.item(num-1).total; //original footprint
            var current_footprint = results.rows.item(num-1).current;
            var reductions = ((orignal_footprint - current_footprint)/orignal_footprint)*100;
            document.getElementById("reductions").innerHTML="<h1 class='dynamic'>"+Math.round(reductions)+"%<br />" + document.getElementById("reductions").innerHTML;
            //$('#reductions').append("<h1 class='dynamic'>"+reductions+" KG");
            return false;
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("Reduction Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }

 function getCurrentUsersActionsNo() {

    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT * FROM current_actions', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        $('#actions').append("<h1 class='dynamic'>"+num);
    }

    function errorCB(err) {
        //alert("Actions Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }


 function getCurrentUsersBadgesNo() {

    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT * FROM completed_badges', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        $('#badges').append("<h1 class='dynamic'>"+num);
    }

    function errorCB(err) {
        //alert("BadgesError processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }


 function footprintToDatabase(id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total, current){
    //alert("id: " + id);
    //alert(jQuery.type(current));
    current = parseFloat(current);
    //alert(jQuery.type(current));
    function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS Footprint');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Footprint (id unique, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total, current)');
    tx.executeSql('INSERT INTO Footprint (id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total, current) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total, current]);
    }

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        //alert("success footprint added!");
        //document.location.href = 'index.html';
    }
    // var dbfp = window.openDatabase("Footprint", "1.0", "User DB", 1000000);
    // dbfp.transaction(populateDB, errorCB, successCB);
    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(populateDB, errorCB, successCB);
    //document.location.href = 'index.html';
 }

//Add Footprint to Server DB
function footprintToServerDatabase(id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/calculate.php";
    var form = document.getElementById("calculateForm");
    var data = new FormData();

    if(id == undefined){
        alert('668');
        // get data from local storage
        function queryDB(tx) {
                //tx.executeSql('DROP TABLE IF EXISTS User');
                tx.executeSql('SELECT * FROM Footprint', [], querySuccess, errorCB);
            }

        function querySuccess(tx, results) {
            console.log("Returned rows = " + results.rows.length);
            var num = results.rows.length;
            // this will be true since it was a select statement and so rowsAffected was 0
            if (!results.rowsAffected) {
                //$('#footprint').append("<h1 class='dynamic'>"+results.rows.item(num-1).total+" KG");
                data.append("id", results.rows.item(num-1).id);
                console.log("gdsgdfgdsgd " + results.rows.item(num-1).id);
                data.append("house", results.rows.item(num-1).house);
                data.append("meat", results.rows.item(num-1).meat);
                data.append("organic", results.rows.item(num-1).organic);
                data.append("local", results.rows.item(num-1).local);
                data.append("compost", results.rows.item(num-1).compost);
                data.append("clothes", results.rows.item(num-1).total_clothes);
                data.append("electronics", results.rows.item(num-1).total_electronics);
                data.append("other_shopping", results.rows.item(num-1).total_shopping);
                data.append("engine", results.rows.item(num-1).car_engine);
                data.append("car_miles", results.rows.item(num-1).car_miles);
                data.append("train_miles", results.rows.item(num-1).train);
                data.append("bus_miles", results.rows.item(num-1).bus);
                data.append("domestic_flights", results.rows.item(num-1).domestic_flights);
                data.append("short_flights", results.rows.item(num-1).short_flights);
                data.append("long_flights", results.rows.item(num-1).long_flights);
                data.append("total", results.rows.item(num-1).total);
                sendData(data);
                return false;
            } else {
                console.log('No rows affected!');
            }
            // for an insert statement, this property will return the ID of the last inserted row
            console.log("Last inserted row ID = " + results.insertId);
            }

        function errorCB(err) {
                //alert("Error processing SQL: "+err.code);
                //document.location.href = 'login.html';
        }

        //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
        db.transaction(queryDB, errorCB);
    } else {
        data.append("id", id);
        data.append("house", house);
        data.append("meat", meat);
        data.append("organic", organic);
        data.append("local", local);
        data.append("compost", compost);
        data.append("clothes", total_clothes);
        data.append("electronics", total_electronics);
        data.append("other_shopping", total_shopping);
        data.append("engine", car_engine);
        data.append("car_miles", car_miles);
        data.append("train_miles", train);
        data.append("bus_miles", bus);
        data.append("domestic_flights", domestic_flights);
        data.append("short_flights", short_flights);
        data.append("long_flights", long_flights);
        data.append("total", total);
        sendData(data);
    }

    //var html = document.getElementById("source").innerHTML;
  //data = 'html='+escape(document.getElementById("source").innerHTML);
    function sendData(data){
    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                //alert(response);
                if (message == -1){
                    //alert('763');
                    html = '<h1 id="badgeearned">Footprint Calculated</h1>';
                    html += '<div id="badge-name"><h3>Your Carbon Footprint is '+Math.round(total * 100) / 100+' tonnes.</h3></div>';
                    html += '<div id="badge-link"><a id="close-badge" href="#" onclick="closebadgepopup(); docToHome();">OK</a></div>';
                    $('#badgealert').append(html);
                    $('#bgfade').fadeIn();
                    $('#badgealert').fadeIn();
                }
                else {
                    //alert('766');
                }
                //result = JSON.parse(this.responseText);
                //injectContent(result.id, form);
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);



    return false;
}
}
 //Functions to run on homepage
function getUserInfo(load){
    //alert('796');
    if(localStorage.getItem('id') == undefined){
        getCurrentUsersID();
    }
   //getCurrentUsersID();
   //alert('802');
   getCurrentUsersName();
   //getCurrentUsersActionsNo();
   //getCurrentUsersBadgesNo();
   getCurrentUsersReduction();
   getCurrentUsersImage();
   getCurrentUsersFootprint();
   actionmessage();
}

function addActionToList(actionid){

    var id = localStorage.getItem('id');
    var fb = localStorage.getItem('fbactions');

    function updateAction(tx) {
        tx.executeSql('UPDATE user_actions SET status = ? WHERE action_id = ?',['1', actionid.toString()]);                    
    };

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        document.getElementById(actionid+"success").innerHTML ='<div class="successful-added">Action added to your list.</div>';
        if(fb==1){
        FB.api(
          'me/carboncutter:added',
          'post',
          {
            carbon_action: "http://samples.ogp.me/488117217965116"
          },
          function(response) {
            console.log(response);
            if (!response || response.error) {
            //alert('Error occured');
            } else {
            //alert('Demo was liked successfully! Action ID: ' + response.id);
            }
          }
        );
        }
    }
    
    db.transaction(updateAction, errorCB, successCB);

    function addAction(tx) {
        tx.executeSql('UPDATE user SET total_actions_added = total_actions_added+1',[]);                    
    };

    function adderrorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function addsuccessCB() {

        }
    
    db.transaction(addAction, errorCB, successCB);

    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/addActionToList.php";
    var data = new FormData();

    data.append("userid", id);
    data.append("actionid", actionid);

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                if (message == -1){
                    //$('#succesfully-added').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    //document.getElementById("success-message").innerHTML = "Succesfully added to your list.";
                    //alert('success');
                }
                else {
                    //$('#success').slideDown("slow");                    
                    //document.getElementById("failure").style.display = "none";
                    //document.getElementById("firstName").innerHTML ='<div id="newN"><h6>'+name+'</h6></div><div id="newAL">'+age+', '+location+'</div>';
                    //alert('failure');
                }
                //result = JSON.parse(this.responseText);
                //injectContent(result.id, form);
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);

    function queryDB(tx) {
            tx.executeSql('SELECT total_actions_added FROM user', [], querySuccess, errorCB);
        }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.item(num-1).total_actions_added; //RETURNED VALUE
        var badge;
        if(num == 1){
            //award badge
            badge = 1;
            //alert('Badge earned: 1st action added');
            completebadge(badge);
        } else if (num == 10){
            badge = 2;
            //alert('Badge earned: 10th action completed');
            completebadge(badge);
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        //console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Actions", "1.0", "Actions DB", 1000000);
    db.transaction(queryDB, errorCB);

    return false;
}

function removeActionFromList(actionid){

    var id = localStorage.getItem('id');
    var fb = localStorage.getItem('fbactions');

    function updateAction(tx) {
        tx.executeSql('UPDATE user_actions SET status = ? WHERE action_id = ?',['0', actionid.toString()]);                    
    };

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        document.getElementById(actionid+"success").innerHTML ='<div class="successful-added">Action removed from your list.</div>';
    }
    
    db.transaction(updateAction, errorCB, successCB);


    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/removeActionFromList.php";
    var data = new FormData();

    data.append("userid", id);
    data.append("actionid", actionid);

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                if (message == -1){
                }
                else {
                }
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
    return false;
}

function completeAction(actionid, reduction){

    var id = localStorage.getItem('id');               

    function populateD(tx) {
        tx.executeSql('UPDATE user_actions SET status = 2 WHERE action_id=?',[actionid.toString()]);                    
    };

    function errorC(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successC() {
        document.getElementById(actionid+"success").innerHTML ='<div class="successful-completed">Well done! Action complete!</div>';
        if(fb==1){
        FB.api(
          'me/carboncutter:complete',
          'post',
          {
            carbon_action: "http://samples.ogp.me/488117217965116"
          },
          function(response) {
            console.log(response);
            if (!response || response.error) {
            //alert('Error occured');
            } else {
            //alert('Demo was liked successfully! Action ID: ' + response.id);
            }
          }
        );
        }
    }
    
    db.transaction(populateD, errorC, successC);

    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/completeAction.php";
    var data = new FormData();

    data.append("userid",   localStorage.getItem('id'));
    data.append("actionid", actionid);
    data.append("reduction", reduction);

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                if (message == -1){
                    //$('#succesfully-added').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    //document.getElementById("success-message").innerHTML = "Well done, you have completed the action.";
                    //alert('success');
                }
                else {
                    //$('#success').slideDown("slow");                    
                    //document.getElementById("failure").style.display = "none";
                    //document.getElementById("firstName").innerHTML ='<div id="newN"><h6>'+name+'</h6></div><div id="newAL">'+age+', '+location+'</div>';
                    //alert('failure');
                }
                //result = JSON.parse(this.responseText);
                //injectContent(result.id, form);
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);


    //UPDATE FOOTPRINT
    function updateFP(tx) {
        //tx.executeSql('INSERT INTO completed_actions (user_id, action_id) VALUES (?,?)',[id, actionid]);     
        //alert(reduction);
        //alert(jQuery.type(reduction));
        tx.executeSql('UPDATE Footprint SET current = current - ?', [reduction]);                    
    };

    function errorUFP(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successUFP() {
        //alert("success reducing fp");
    }
    
    db.transaction(updateFP, errorUFP, successUFP);


    // Check action to see if badge should be given
    // 1) Check number of actions taken
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM user_actions WHERE status=2', [], querySucceed, errorCB);
    }

    function querySucceed(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        var badge;
        if(num === 1){
            //award badge
            badge = 3;
            //alert('Badge earned: 1st action completed');
            completebadge(badge);
        } else if (num === 5){
            badge = 4;
            //alert('Badge earned: 5th action completed');
            completebadge(badge);
        } else if (num === 10){
            badge = 5;
            //alert('Badge earned: 10th action completed');
            completebadge(badge);
        } else if (num === 15){
            badge = 10;
            //alert('Badge earned: 15th action completed');
            completebadge(badge);
        } else if (num === 20){
            badge = 6;
            //alert('Badge earned: 20th action completed');
            completebadge(badge);
        } else if (num === 30){
            badge = 7;
            //alert('Badge earned: 30th action completed');
            completebadge(badge);
        } else if (num === 40){
            badge = 8;
            //alert('Badge earned: 40th action completed');
            completebadge(badge);
        } else if (num === 60){
            badge = 9;
            //alert('Badge earned: 60th action completed');
            completebadge(badge);
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        //console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Actions", "1.0", "Actions DB", 1000000);
    db.transaction(queryDB, errorCB);
    // 2) Check reduction %
    function queryFP(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT * FROM Footprint', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var number = results.rows.length;
        var badge;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            var orignal_footprint = results.rows.item(number-1).total; //original footprint
            var current_footprint = results.rows.item(number-1).current;
            //var reductions = orignal_footprint - current_footprint;
            //var percentage = orignal_footprint / reductions;
            var percentage = ((orignal_footprint - current_footprint)/orignal_footprint)*100;
            if (percentage >= 15){
                badge = 18;
                percentcheck(badge);
            } else if (percentage >= 10){
                badge = 17;
                percentcheck(badge);
            } else if (percentage >= 5){
                badge = 16;
                percentcheck(badge);
            } else if (percentage >= 2){
                badge = 15;
                percentcheck(badge);
            }
        } else {
            console.log('No rows affected!');
        }
    }

    function errorFP(err) {
        //alert("Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryFP, errorFP);
    return false;
}

function percentcheck(badge){
    function queryDB(tx) {
        tx.executeSql('SELECT badge_id FROM completed_badges WHERE completed = 1 AND badge_id = ?', [badge.toString()], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows from current_actions = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (num == 0) {
            completebadge(badge);
        } else {
            console.log('No rows affected!');
        }
    }

    function errorCB(err) {
    }

    db.transaction(queryDB, errorCB);

}

function completebadge(badge){
    var id = localStorage.getItem('id');

    function populateBadge(tx) {
        tx.executeSql('UPDATE completed_badges SET completed = 1 WHERE badge_id=? AND completed = ?',[badge.toString(), '0']);                    
    };

    function errorBadge(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successBadge() {
        //GET BADGE NAME
        function queryDBbadge(btx) {
        btx.executeSql('SELECT badge FROM badges WHERE id = ?',[badge.toString()], querySuccessbadge, errorCBbadge);
        }

        function querySuccessbadge(tx, results) {
            console.log("Returned rows from current_actions = " + results.rows.length);
            var num = results.rows.length;
            // this will be true since it was a select statement and so rowsAffected was 0
            if (!results.rowsAffected) {
                badgename = results.rows.item(0).badge;
                html = '<h1 id="badgeearned">Badge earned</h1>';
                html += '<div id="badge-image-alert-contain"><img class="badge-image-alert" src="img/badges/colour/'+badge+'.png"></div>';
                html += '<div id="badge-name"><h3>'+badgename+'</h3></div>';
                html += '<div id="badge-link"><a id="close-badge" href="#" onclick="closebadgepopup()">Ok</a></div>';
                $('#badgealert').append(html);
                $('#bgfade').fadeIn();
                $('#badgealert').fadeIn();
            } else {
                console.log('No rows affected!');
            }
        }

        function errorCBbadge(err) {
            //alert(err);
        }

        db.transaction(queryDBbadge, errorCBbadge);
        //alert("success adding badge");
        // declaring variables to be used
        var xhr, target, changeListener, url, data;
        //setting url to the php code to add comments to the db
        url = "http://carbon.jamescobbett.co.uk/services/completeBadge.php";
        var data = new FormData();

        data.append("userid", localStorage.getItem('id'));
        data.append("badgeid", badge);

        console.log("Sending", data);
        console.log(this.test);
        // create a request object
        xhr = new XMLHttpRequest();

        changeListener = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Response", this.responseText);
                    var response = this.responseText;
                    var s = "success";
                    var message = response.indexOf("exception");
                    console.log(message);
                    if (message == -1){
                    }
                    else {
                    }
                }
            }
        };

        // initialise a request, specifying the HTTP method
        // to be used and the URL to be connected to.
        xhr.onreadystatechange = changeListener;
        xhr.open('POST', url, true);
        //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
        return false;
    }
    
    db.transaction(populateBadge, errorBadge, successBadge);
}

//Add actions to phone DB
function actionstoDB(id, action, description, reduction, category, max){
    //alert(action);
                    function populateDB(tx) {
                        //tx.executeSql('DROP TABLE IF EXISTS Actions');
                        //alert('attempt');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Actions (id unique, action, description, reduction, category, max)');
                        tx.executeSql('INSERT INTO Actions (id, action, description, reduction, category, max) VALUES (?,?,?,?,?,?)',[id, action, description, reduction, category, max]);
                        }(i);

                        function errorCB(err) {
                            //alert("Error processing SQL: "+err.code);
                        }

                        function successCB() {
                            //alert("success adding actions");
                        }
                        //var dbact = window.openDatabase("Actions", "1.0", "Actions DB", 1000000);
                        db.transaction(populateDB, errorCB, successCB);
}

//Add listed actions to phone DB
function currentactionstoDB(){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response[0]);
            for(var i = 0; i < response.length; i++){

                    function populateDB(tx) {
                        tx.executeSql('DROP TABLE IF EXISTS current_actions');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS current_actions (user_id, action_id)');
                        tx.executeSql('INSERT INTO current_actions (user_id, action_id) VALUES (?,?)',[response[i]['user_id'], response[i]['action_id']]);
                        }

                        function errorCB(err) {
                            //alert("Error processing SQL: "+err.code);
                        }

                        function successCB() {
                            //alert("success adding current_actions");
                        }
                        var db = window.openDatabase("current_actions", "1.0", "current_actions DB", 1000000);
                        db.transaction(populateDB, errorCB, successCB);

            };
        }
      }
    xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getlistactions.php");
    xmlhttp.send();
}

//Add listed actions to phone DB
function completedactionstoDB(){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response[0]);
            for(var i = 0; i < response.length; i++){

                    function populateDB(tx) {
                        tx.executeSql('DROP TABLE IF EXISTS completed_actions');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS current_actions (user_id, action_id, date)');
                        tx.executeSql('INSERT INTO completed_actions (user_id, action_id, date) VALUES (?,?)',[response[i]['user_id'], response[i]['action_id'], response[i]['date']]);
                        }

                        function errorCB(err) {
                            //alert("Error processing SQL: "+err.code);
                        }

                        function successCB() {
                            //alert("success adding completed actions");
                        }
                        var db = window.openDatabase("completed_actions", "1.0", "completed_actions DB", 1000000);
                        db.transaction(populateDB, errorCB, successCB);
            };
        }
      }
    xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getcompletedactions.php");
    xmlhttp.send();
}

function changepassword(){
    var password = document.getElementById('password').value;
    var passwordrepeat = document.getElementById('password-repeat').value;
    if(password != passwordrepeat){
        document.getElementById("failure").innerHTML ="<div class='black' id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! Passwords don't match.<h1></div>";      
        jQuery('#failure').slideDown("slow");    
        //$('#emailerror').slideDown("slow");  
        //alert('password error');
        return false;
    }
    if (password.length < 7)
    {
      document.getElementById("failure").innerHTML ="<div class='black' id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/delete.png' id='cross'> <h1>Oops! Passwords must be at least 7 characters.<h1></div>";      
      jQuery('#failure').slideDown("slow");    
      //$('#emailerror').slideDown("slow");  
      //alert('password error');
      return false;
    }
    // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/changepassword.php";
    
    var data = new FormData();
    data.append("password", password);
    data.append("id", localStorage.getItem('id'));

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("exception");
                console.log(message);
                if (message == -1){
                    document.getElementById("failure").innerHTML ="<div class='black' id='failureText'><img src='http://carbon.jamescobbett.co.uk/www/img/complete.png' id='cross'> <h1>Password successfully changed.<h1></div>";
                    jQuery('#failure').slideDown("slow");
                }
                else {
                    //alert('failure');
                }
            }
        }
    };

    // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);

    return false;
}

function direct(){
  function queryDB(tx) {
          //tx.executeSql('DROP TABLE IF EXISTS User');
          tx.executeSql('SELECT first_name FROM User', [], querySuccess, errorCB);
      }

      function querySuccess(tx, results) {
        //alert('success direct');
          console.log("Returned rows = " + results.rows.length);
          var num = results.rows.length;
          // this will be true since it was a select statement and so rowsAffected was 0
          if (!results.rowsAffected) {
              directToHome();
              return false;
          } else {
              console.log('No rows affected!');
          }
          // for an insert statement, this property will return the ID of the last inserted row
          console.log("Last inserted row ID = " + results.insertId);
      }

      function errorCB(err) {
        //alert('fail direct');
          goToLogin();
      }

      db.transaction(queryDB, errorCB);
}