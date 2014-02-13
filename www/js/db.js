var db = window.openDatabase("User", "1.0", "User DB", 1000000);

function logout(){
    function dropDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        alert("success!");
        //document.location.href = 'index.html';
    }
    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(dropDB, errorCB, successCB);

    function dropFP(x) {
    x.executeSql('DROP TABLE IF EXISTS Footprint');
    }

    function errorFP(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successFP() {
        alert("success!");
        document.location.href = 'index.html';
    }
    //db = window.openDatabase("Footprint", "1.0", "User DB", 1000000);
    db.transaction(dropFP, errorFP, successFP);
}

function login(id, first_name, last_name, email){
    var data = new FormData();

    data.append("id", id);
    alert(id);

    function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    tx.executeSql('CREATE TABLE IF NOT EXISTS User (id unique, first_name, last_name, email)');
    tx.executeSql('DROP TABLE IF EXISTS Actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Actions (id, action, description, reduction, category)');
    tx.executeSql('DROP TABLE IF EXISTS current_actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS current_actions (user_id, action_id)');
    tx.executeSql('DROP TABLE IF EXISTS completed_actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS completed_actions (user_id, action_id)');
    tx.executeSql('INSERT INTO User (id, first_name, last_name, email) VALUES (?,?,?,?)',[id, first_name, last_name, email]);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        alert("success!");
        //document.location.href = 'index.html';
    }
    //var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(populateDB, errorCB, successCB);
    //document.location.href = 'index.html';
    
    //GET ACTIONS FROM SERVER TO LOCAL DB
    //actionstoDB();
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
               // }(i);
                //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
        }
      }
    xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getactions.php");
    xmlhttp.send();

    //GET ACTIONS IN LIST FROM SERVER TO LOCAL DB
    xmhttp=new XMLHttpRequest();
    xmhttp.onreadystatechange=function()
      {
      if (xmhttp.readyState==4 && xmhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            var response = JSON.parse(xmhttp.responseText);
            console.log("list actions: " + response);
                //function(response) { 
                    db.transaction(function (tx) {  
                    for(var i = 0; i < response.length; i++){
                        console.log('HERE');
                        console.log(response[i]);
                        tx.executeSql('INSERT INTO current_actions (user_id, action_id) VALUES (?,?)',[response[i]['user_id'], response[i]['action_id']]);                    
                    };
                  });
               // }(i);
                //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
        }
      }
    xmhttp.open("POST","http://carbon.jamescobbett.co.uk/services/getactionsl.php");
    xmhttp.send(data);

    //GET COMPLETED ACTIONS FROM SERVER TO LOCAL DB
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
                        tx.executeSql('INSERT INTO completed_actions (user_id, action_id) VALUES (?,?)',[response[i]['user_id'], response[i]['action_id']]);                    
                    };
                  });
               // }(i);
                //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
        }
      }
    cxmhttp.open("POST","http://carbon.jamescobbett.co.uk/services/getactionsc.php");
    cxmhttp.send(data);

    // GET FOOTPRINT FROM DB
    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/getfootprint.php";
    // var data = new FormData();

    // data.append("id", id);
    // alert(id);
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
                    alert('success adding FP');
                    var response = JSON.parse(this.responseText);
                    console.log(response['house']);
                    footprintToDatabase(response['id'], response['house'], response['meat'], response['organic'], response['local'], response['compost'], response['total_clothes'], response['total_electronics'], response['total_shopping'], response['car_engine'], response['car_miles'], response['train'], response['bus'], response['domestic_flights'], response['short_flights'], response['long_flights'], response['total']);
                }
                else {
                    alert('no FP');
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


    setTimeout(function(){redirect();},2000);

    return false;

    //footprintToDatabase(id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total);

}

function redirect(){
    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT total FROM Footprint', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            var original_footprint = results.rows.item(num-1).total; //original footprint
            if (original_footprint == 'undefined'){
                document.location.href = 'calculator.html';
            } else {
                document.location.href = 'index.html';
            }
            return false;
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
}

function getCurrentUsersName() {

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
            return false;
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
        //goToLogin();
        document.location.href = 'login.html';
    }

    //var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }

function getCurrentUsersID() {
    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT id FROM User', [], querySuccess, errorCB);
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
            return id;
        } else {

        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
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
        tx.executeSql('SELECT total FROM Footprint', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            var orignal_footprint = results.rows.item(num-1).total; //original footprint

            $('#footprint').append("<h1 class='dynamic'>"+results.rows.item(num-1).total+" KG");
            return false;
        } else {
            console.log('No rows affected!');
        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
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
        alert("Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }

 function footprintToDatabase(id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total){
    alert("id: " + id);
    function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS Footprint');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Footprint (id unique, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total)');
    tx.executeSql('INSERT INTO Footprint (id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id, house, meat, organic, local, compost, total_clothes, total_electronics, total_shopping, car_engine, car_miles, train, bus, domestic_flights, short_flights, long_flights, total]);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        alert("success footprint added!");
        //document.location.href = 'index.html';
    }
    // var dbfp = window.openDatabase("Footprint", "1.0", "User DB", 1000000);
    // dbfp.transaction(populateDB, errorCB, successCB);
    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(populateDB, errorCB, successCB);
    //document.location.href = 'index.html';
 }

//Add Footprint to Server DB
function footprintToServerDatabase(){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/calculate.php";
    var form = document.getElementById("calculateForm");
    var data = new FormData();

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
                sendData();
                return false;
            } else {
                console.log('No rows affected!');
            }
            // for an insert statement, this property will return the ID of the last inserted row
            console.log("Last inserted row ID = " + results.insertId);
        }

        function errorCB(err) {
            alert("Error processing SQL: "+err.code);
            //document.location.href = 'login.html';
        }

        //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
        db.transaction(queryDB, errorCB);

    //var html = document.getElementById("source").innerHTML;
  //data = 'html='+escape(document.getElementById("source").innerHTML);
    function sendData(){
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
                     //$('#failure').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    //document.getElementById("failure").innerHTML ="<div id='failureText'><img src='images/cross.png' id='cross'> <h1>Oops! " + response + "</h1></div>";
                    alert('success');
                }
                else {
                    //$('#success').slideDown("slow");                    
                    //document.getElementById("failure").style.display = "none";
                    //document.getElementById("firstName").innerHTML ='<div id="newN"><h6>'+name+'</h6></div><div id="newAL">'+age+', '+location+'</div>';
                    alert('failure');
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
function getUserInfo(){
   getCurrentUsersID();
   getCurrentUsersName();
   getCurrentUsersFootprint();
   getCurrentUsersActionsNo();
}

function addActionToList(actionid){

    var id = localStorage.getItem('id');

    function populateDB(tx) {
        tx.executeSql('INSERT INTO current_actions (user_id, action_id) VALUES (?,?)',[id, actionid]);                    
    };

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        alert("success adding actions");
    }
    
    db.transaction(populateDB, errorCB, successCB);


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
                    $('#succesfully-added').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    document.getElementById("success-message").innerHTML = "Succesfully added to your list.";
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

    return false;
}

function completeAction(actionid){

    var id = localStorage.getItem('id');

    function populateDB(tx) {
        tx.executeSql('INSERT INTO completed_actions (user_id, action_id) VALUES (?,?)',[id, actionid]);                    
    };

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        alert("success adding actions");
    }
    
    db.transaction(populateDB, errorCB, successCB);

    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/completeAction.php";
    var data = new FormData();

    data.append("userid",   localStorage.getItem('id'));
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
                    $('#succesfully-added').slideToggle("slow");                    
                    //document.getElementById("failure").style.display = "block";
                    document.getElementById("success-message").innerHTML = "Well done, you have completed the action.";
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



    return false;
}

//Add actions to phone DB
function actionstoDB(id, action, description, reduction, category, max){
    alert(action);
                    function populateDB(tx) {
                        //tx.executeSql('DROP TABLE IF EXISTS Actions');
                        alert('attempt');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Actions (id unique, action, description, reduction, category, max)');
                        tx.executeSql('INSERT INTO Actions (id, action, description, reduction, category, max) VALUES (?,?,?,?,?,?)',[id, action, description, reduction, category, max]);
                        }(i);

                        function errorCB(err) {
                            alert("Error processing SQL: "+err.code);
                        }

                        function successCB() {
                            alert("success adding actions");
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
                            alert("Error processing SQL: "+err.code);
                        }

                        function successCB() {
                            alert("success adding current_actions");
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
                            alert("Error processing SQL: "+err.code);
                        }

                        function successCB() {
                            alert("success adding completed actions");
                        }
                        var db = window.openDatabase("completed_actions", "1.0", "completed_actions DB", 1000000);
                        db.transaction(populateDB, errorCB, successCB);
            };
        }
      }
    xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getcompletedactions.php");
    xmlhttp.send();
}