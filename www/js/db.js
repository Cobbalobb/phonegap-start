var db = window.openDatabase("User", "1.0", "User DB", 1000000);
var show;
var web = true;
alert('test');
$(document).live("pagebeforechange", function(e, ob) {

    console.log("pagebeforechange");

    alert("To :"+ob.toPage[0].id);
    alert("From :"+ob.options.fromPage[0].id);

    console.log(ob);
    console.log(ob.toPage[0].id);
    //console.log("PAGE CHANGE: "+ob.toPage[0].id);
    if(ob.options.fromPage != undefined){
    console.log(ob.options.fromPage[0].id);
      if (ob.toPage[0].id === "login" && ob.options.fromPage[0].id === "home") {
          if(redirecttologin === true){
              redirecttologin = false;
          } else {
              console.log("blocking the back");
              e.preventDefault();
              history.go(1);
          }
      }
    }
    if(ob.options.fromPage != undefined){
      if (ob.toPage[0].id === "home" && ob.options.fromPage[0].id === "login") {
        alert('here');
          setTimeout(function(){getUserInfo()},1000);
      } else if(ob.options.fromPage != "holding" && ob.toPage[0].id === "home"){
          setTimeout(function(){getUserInfo()},0100);
      }
    }
});
alert('test2');
// $(document).live("pageafterchange", function(e, ob) {

//     console.log("pageafterchange");

//     console.log(ob);
//     console.log("PAGE AFTER CHANGE: "+ob.toPage[0].id);
    // if (ob.toPage[0].id === "login" && ob.options.fromPage) {
    //     if(redirecttologin === true){
    //         redirecttologin = false;
    //     } else {
    //         console.log("blocking the back");
    //         e.preventDefault();
    //         history.go(1);
    //     }
    // }
    // if(op.toPage[0].id === "home"){

    // }

//});

if(web==true){
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '483622355081269',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
      console.log('Logged in');
    } else {
            FB.login(function(response) {
       // handle the response
     }, {scope: 'email, publish_actions'});
    }
  });
};
}

var redirecttologin = false;

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });
  }

function logout(){
    function dropDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    }

    function errorCB(err) {
        a//lert("Error processing SQL: "+err.code);
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
        //alert("success!");

        //FB.getLoginStatus(function(response) {

          //  FB.api("/me/permissions", "delete", function(response){ 
                //document.location.href = 'index.html';
                // FB.logout(function(response) {
                //           alert('logged out');
                //           });
                show = true;
                redirecttologin = true;
                goToLogin();
            //});

        //});

        //document.location.href = 'index.html';
    }
    //db = window.openDatabase("Footprint", "1.0", "User DB", 1000000);
    db.transaction(dropFP, errorFP, successFP);
}

function login(id, first_name, last_name, email, image, facebookid, fbactions){
    var data = new FormData();

    data.append("id", id);
    //alert(id);

    function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    tx.executeSql('CREATE TABLE IF NOT EXISTS User (id unique, first_name, last_name, email, image, facebookid, fbactions)');
    tx.executeSql('DROP TABLE IF EXISTS Actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Actions (id, action, description, reduction, category)');
   
    tx.executeSql('DROP TABLE IF EXISTS user_actions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS user_actions (user_id, action_id, status, timestamp)');
    
    tx.executeSql('DROP TABLE IF EXISTS completed_badges');
    tx.executeSql('CREATE TABLE IF NOT EXISTS completed_badges (user_id, badge_id, completed)');    
    tx.executeSql('DROP TABLE IF EXISTS badges');
    tx.executeSql('CREATE TABLE IF NOT EXISTS badges (id, badge)');
    tx.executeSql('INSERT INTO User (id, first_name, last_name, email, image, facebookid, fbactions) VALUES (?,?,?,?,?,?,?)',[id, first_name, last_name, email, image, facebookid, fbactions]);
    }

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        //alert("success!");
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
               // }(i);
                //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
        }
      }
    baxmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getallbadges.php");
    baxmlhttp.send();

    //GET ACTIONS IN LIST FROM SERVER TO LOCAL DB
    // xmhttp=new XMLHttpRequest();
    // xmhttp.onreadystatechange=function()
    //   {
    //   if (xmhttp.readyState==4 && xmhttp.status==200)
    //     {
    //         //console.log(xmlhttp.responseText);
    //         var response = JSON.parse(xmhttp.responseText);
    //         console.log("completed actions: " + response);
    //             //function(response) { 
    //                 db.transaction(function (tx) {  
    //                 for(var i = 0; i < response.length; i++){
    //                     console.log('HERE');
    //                     console.log(response[i]);
    //                     tx.executeSql('INSERT INTO current_actions (user_id, action_id) VALUES (?,?)',[response[i]['user_id'], response[i]['action_id']]);                    
    //                 };
    //               });
    //            // }(i);
    //             //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
    //     }
    //   }
    // xmhttp.open("POST","http://carbon.jamescobbett.co.uk/services/getactionsl.php");
    // xmhttp.send(data);

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
               // }(i);
                //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
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
               // }(i);
                //actionstoDB(response[i]['id'], response[i]['action'], response[i]['description'], response[i]['reduction'], response[i]['category'], response[i]['max']);
        }
      }
    bxmhttp.open("POST","http://carbon.jamescobbett.co.uk/services/getbadges.php");
    bxmhttp.send(data);

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
                    //alert('success adding FP');
                    var response = JSON.parse(this.responseText);
                    console.log(response['house']);
                    footprintToDatabase(response['id'], response['house'], response['meat'], response['organic'], response['local'], response['compost'], response['total_clothes'], response['total_electronics'], response['total_shopping'], response['car_engine'], response['car_miles'], response['train'], response['bus'], response['domestic_flights'], response['short_flights'], response['long_flights'], response['total'], response['current']);
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


    setTimeout(function(){redirect();},2500);

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
                goToCalculator();
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
        alert("FP Error processing SQL: "+err.code);
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
        //alert("Name Error processing SQL: "+err.code);
        //goToLogin();
        //document.location.href = 'login.html';
        redirecttologin = true;
        goToLogin();
    }

    //var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
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
            document.getElementById("user-img").innerHTML = "<img alt='user-image' src='"+results.rows.item(num-1).image+"'</img>";
            return false;
        } else {
            console.log('No rows affected!');
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

function getCurrentUsersID() {
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
            return id;
        } else {

        }
        // for an insert statement, this property will return the ID of the last inserted row
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
            document.getElementById("footprint").innerHTML="<h1 class='dynamic'>"+Math.round(fp * 100) / 100+" tonnes<br />" + document.getElementById("footprint").innerHTML;
            //$('#footprint').append("<h1 class='dynamic'>"+results.rows.item(num-1).current+" KG");
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
            //alert("Error processing SQL: "+err.code);
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
}
 //Functions to run on homepage
function getUserInfo(load){
  //alert("show "+show);
  //alert("load "+load)
   //if(load == true){
       getCurrentUsersID();
       getCurrentUsersName();
       getCurrentUsersFootprint();
       //getCurrentUsersActionsNo();
       //getCurrentUsersBadgesNo();
       getCurrentUsersReduction();
       getCurrentUsersImage();
       actionmessage();
   //    show = false;
   //} else if (show == true) {
   //     getCurrentUsersID();
   //     getCurrentUsersName();
   //     getCurrentUsersFootprint();
   //     //getCurrentUsersActionsNo();
   //     //getCurrentUsersBadgesNo();
   //     getCurrentUsersReduction();
   //     getCurrentUsersImage();
   //     actionmessage();
   //     show = false;
   // } else {

   // }
}

function addActionToList(actionid, title){

    var id = localStorage.getItem('id');
    var fb = localStorage.getItem('fbactions');

    function updateAction(tx) {
        tx.executeSql('UPDATE user_actions SET status = ? WHERE action_id = ?',['1', actionid.toString()]);                    
    };

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        document.getElementById(actionid+"success").innerHTML ='<div class="successful-added">Action added to your list.</div><div class="calendar-add"><a href="#" onClick="calendarevent(\''+title+'\');">Add event to calendar</a></div>';
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
            alert('Error occured');
            } else {
            alert('Demo was liked successfully! Action ID: ' + response.id);
            }
          }
        );
        }
    }
    
    db.transaction(updateAction, errorCB, successCB);


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
            tx.executeSql('SELECT * FROM current_actions', [], querySuccess, errorCB);
        }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        var badge;
        if(num === 1){
            //award badge
            badge = 3;
            alert('Badge earned: 1st action added');
            completebadge(badge);
        } else if (num === 10){
            badge = 4;
            alert('Badge earned: 10th action completed');
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
            alert('Error occured');
            } else {
            alert('Demo was liked successfully! Action ID: ' + response.id);
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

    // Check action to see if badge should be given
    // 1) Check number of actions taken
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM completed_actions', [], querySucceed, errorCB);
    }

    function querySucceed(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        var badge;
        if(num === 1){
            //award badge
            badge = 3;
            alert('Badge earned: 1st action completed');
            completebadge(badge);
        } else if (num === 5){
            badge = 4;
            alert('Badge earned: 5th action completed');
            completebadge(badge);
        } else if (num === 10){
            badge = 5;
            alert('Badge earned: 10th action completed');
            completebadge(badge);
        } else if (num === 15){
            badge = 10;
            alert('Badge earned: 15th action completed');
            completebadge(badge);
        } else if (num === 20){
            badge = 6;
            alert('Badge earned: 20th action completed');
            completebadge(badge);
        } else if (num === 30){
            badge = 7;
            alert('Badge earned: 30th action completed');
            completebadge(badge);
        } else if (num === 40){
            badge = 8;
            alert('Badge earned: 40th action completed');
            completebadge(badge);
        } else if (num === 60){
            badge = 9;
            alert('Badge earned: 60th action completed');
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
            var reductions = orignal_footprint - current_footprint;
            var percentage = orignal_footprint / reductions;
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
        alert("Error processing SQL: "+err.code);
        //document.location.href = 'login.html';
    }

    //var db = window.openDatabase("Footprint", "1.0", "Footprint DB", 1000000);
    db.transaction(queryFP, errorFP);
    return false;


    //UPDATE FOOTPRINT
    function populateDB(tx) {
        //tx.executeSql('INSERT INTO completed_actions (user_id, action_id) VALUES (?,?)',[id, actionid]);                    
        tx.executeSql('UPDATE Footprint SET current = current - '+reduction+'');                    
    };

    function errorCB(err) {
        //alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        //alert("success adding actions");
    }
    
    db.transaction(populateDB, errorCB, successCB);
}

function percentcheck(badge){
    function queryDB(tx) {
        tx.executeSql('SELECT badge_id FROM completed_badges WHERE badge_id = ?', [badge], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows from current_actions = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
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
        tx.executeSql('UPDATE completed_badges SET completed = 1 WHERE badge_id=?',[badge.toString()]);                    
    };

    function errorBadge(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successBadge() {
        alert("success adding badge");
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

function facebookLogin(){
    alert('here 2');
     FB.api('/me', {fields: 'first_name, last_name, email, id, picture'}, function(response) {
        var first_name = response['first_name'];
      var last_name = response['last_name'];
      var email = response['email'];
      var facebookid = response['id'];
      var fbactions = 1;
      alert(first_name);
      alert(last_name);
      alert(email);
      alert(facebookid);
        console.log(first_name + " " + last_name);
        FB.api(
        "/me/picture",
        {
            "redirect": false,
            "height": "88",
            "type": "normal",
            "width": "98"
        },
        function (response) {
          if (response && !response.error) {
                  console.log(response);
      var image = response['data']['url'];
      //GOT FIRST,LAST NAMES AND EMAIL
      // Now to check email address with db, if doesn't exist pass paramaters to signup function to sign user up and add to table.
      //If email does exist, log in as that user.

    var xhr, target, changeListener, url, data;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/checkUsers.php";
    var data = new FormData();

    data.append("email", email);

    console.log("Sending", data);
    console.log(this.test);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var message = response.indexOf("New");
                console.log(message);
                if (message == -1){
                    alert('log in');
                    submitLoginForm(email, image);
                }
                else {
                    alert('sign up');
                    // User is new so register them
                    submitSignForm(first_name,last_name,email,image,facebookid, fbactions);
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
        }
    );



    });     
}

//SUBMIT Login FORM
function userSearch(){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/usersearch.php";
    var form = document.getElementById("userSearchForm");
    var data = new FormData(form);
    data.append("userid",   localStorage.getItem('id'));
    console.log("Sending", data);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var s = "success";
                var message = response.indexOf("failed:");
                console.log(message);
                if (response != ''){
                    var response = JSON.parse(this.responseText);
                    if(response['user'] === true){
                        var html = "<div class='user'>";
                        html += "<div class='name searchname'>No results</div>";
                        document.getElementById("friend-search-results").innerHTML = html;
                    }else if(response['username'] === undefined){
                        var html = "<div class='user'>";
                        html += "<div class='name searchname'>No results</div>";
                        document.getElementById("friend-search-results").innerHTML = html;
                    }else{
                        var html = "<div class='user'>";
                        html += "<div class='friends-image'><img class='newsuserimage newuserfriendimage' src='"+response['image']+"'></div>";
                        //html += "<div class='username'>"+response['username']+" </div>";
                        html += "<div class='name searchname'>"+response['first_name']+" "+response['last_name']+ "</div>";
                        html += "<a class='add addfriend' href='#' onclick='addFriend("+response['id']+")'>Add friend</a>";
                        document.getElementById("friend-search-results").innerHTML = html;
                    }
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

//Add friend
function addFriend(id){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/addfriend.php";
    var data = new FormData();
    data.append("id1",   localStorage.getItem('id'));
    data.append("id2", id);
    console.log("Sending", data);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var message = response.indexOf("Succesfully");
                console.log(message);
                if (message == '-1'){
                     console.log('this.responseText');
                } else {
                     console.log('this.responseText');
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

function getFriends(){
  // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = "";
    var html2 = "";
    var n = 1;
    var bool = 0;
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/getFriends.php";
    var data = new FormData();
    data.append("id", localStorage.getItem('id'));
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                for(var  i= 0; i < response.length; i++){
                    if(response[i]['confirmed']==0 && response[i]['sent']==0){
                        html2 += "<div class='user'>";
                        html2 += "<div class='name'>"+response[i]['first_name']+" "+response[i]['last_name']+ "</div>";
                        html2 += "<div class='username'><a href='#' onclick='acceptRequest("+response[i]['id']+")'>Accept friend request</a></div>";
                        html2 += "</div>";
                        html2 += "<div style='clear: both;'></div>";
                        bool = 1;
                    }else if(response[i]['confirmed']==0 && response[i]['sent']==1){
                    
                    }else if(response[i]['confirmed']==2){
                        html += "<div class='user'>";
                        html += "<div class='rank'>"+n+"</div>";
                        html += "<div class='friends-image'><a href='goToProfile("+response[i]['id']+")'><img class='newsuserimage' src='"+response[i]['image']+"'</src></a></div>";
                        html += "<div class='name'><a href='goToProfile("+response[i]['id']+")'>You</a></div>";
                        html += "<div class='FP'>"+response[i]['current_fp']+ "</div>";
                        html += "<div style='clear: both;'></div>";
                        html += "</div>";
                        n++;
                    }else {
                        html += "<div class='user'>";
                        html += "<div class='rank'>"+n+"</div>";
                        html += "<div class='friends-image'><a href='goToProfile("+response[i]['id']+")'><img class='newsuserimage' src='"+response[i]['image']+"'</src></a></div>";
                        html += "<div class='name'><a href='goToProfile("+response[i]['id']+")'>"+response[i]['first_name']+ "</a></div>";
                        html += "<div class='FP'>"+response[i]['current_fp']+ "</div>";
                        html += "<div style='clear: both;'></div>";
                        html += "</div>";
                        n++;
                    }
                }
                document.getElementById("friend-list").innerHTML = "<h3>Current Footprint</h3>"+html;
                if(bool ===1){
                    document.getElementById("uncomfirmed-list").innerHTML = "<h3>Friend Requests</h3>"+ html2;
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
};

function acceptRequest(id){
    var xhr, target, changeListener, url, data;

    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/acceptRequest.php";
    var data = new FormData();
    data.append("current-id", localStorage.getItem('id'));
    data.append("friend-id", id);
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = this.responseText;
                var message = response.indexOf("Succesfully");
                console.log(message);
                if (message != -1){
                    alert('Accepted Friend');
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
}

function inArray(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return true;
    }
    return false;
}

function newsfeed(){
    // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = "";
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/newsfeed.php";
    var data = new FormData();
    data.append("id", localStorage.getItem('id'));
    // create a request object
    xhr = new XMLHttpRequest();
    //Generate random numbers
    var arr = []
    while(arr.length < 5){
      var randomnumber=Math.ceil(Math.random()*20)
      var found=false;
      for(var i=0;i<arr.length;i++){
        if(arr[i]==randomnumber){found=true;break}
      }
      if(!found)arr[arr.length]=randomnumber;
    }
    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                console.log(response['feed'][0]['image']);
                console.log(response['news']);
                var n = 0;
                for(var  i= 0; i < response['feed'].length; i++){
                    //IF NUMBER IN NUMBER ARRAY
                    if (inArray(arr, i)) {
                        html += "<div class='news'>";
                        html += "<div class='news-image'><a href='#'><img class='newsuserimage' src='http://carbon.jamescobbett.co.uk/www/img/news.png'</src></a></div>";
                        html += "<div class='status'>"+response['news'][0]['headline']+"</div>";
                        html += "<div class='source'>"+response['news'][0]['source']+"</div>";
                        //html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                        html += "</div>";
                        n++;
                    }
                     else if(response['feed'][i]['type']==1 && response['feed'][i]['status']==1){
                        html += "<div class='news'>";
                        html += "<div class='news-image'><a href='#' onClick='goToProfile("+response['feed'][i]['user_id']+")'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                        html += "<div class='status'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['user_name']+"</a> added <a href='#'>"+response['feed'][i]['action_name']+"</a> to their list.";
                        html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                        html += "</div>";
                    }else if(response['feed'][i]['type']==1 && response['feed'][i]['status']==2){
                        html += "<div class='news'>";
                        html += "<div class='news-image'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                        html += "<div class='status'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['user_name']+"</a> completed <a href='#'>"+response['feed'][i]['action_name']+"</a>.";
                        html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                        html += "</div>";
                    }else if(response['feed'][i]['type']==2 && response['feed'][i]['status']==1){
                        html += "<div class='news'>";
                        html += "<div class='news-image'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                        html += "<div class='status'>You are now friends with <a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['user_name']+"</a>.";
                        html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                        html += "</div>";
                    }else if(response['feed'][i]['type']==2 && response['feed'][i]['status']==0){
                        html += "<div class='news'>";
                        html += "<div class='news-image'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'><img class='newsuserimage' src='"+response['feed'][i]['image']+"'</src></a></div>";
                        html += "<div class='status'><a onClick='goToProfile("+response['feed'][i]['user_id']+")' href='#'>"+response['feed'][i]['user_name']+"</a> sent you a friend request.";
                        html += "<div class='time'>"+response['feed'][i]['timestamp']+"</div></div>";
                        html += "</div>";
                    }
                    html += "<div class='line'></div>";
                    html += "<div style='clear: both;'></div>";
                }
                document.getElementById("newsfeed").innerHTML = "<h3 id='newstitle'>News Feed</h3>" +html;
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function getProfileInfo(id){
     // declaring variables to be used
    var xhr, target, changeListener, url, data;
    var html = "";
    //setting url to the php code to add comments to the db
    url = "http://carbon.jamescobbett.co.uk/services/getprofile.php";
    var data = new FormData();
    data.append("id", id);
    data.append("user_id", localStorage.getItem('id'));
    // create a request object
    xhr = new XMLHttpRequest();

    changeListener = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log("Response", this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                console.log(response.first_name);
                $('#profile-name').append(response.first_name +" "+ response.last_name);
                if(response.friends === 1 && response.friends ===1){
                    $('#profile-friend').append("Friends");
                } else if (response.friends === 1 && response.friends === 0 && response.sent === 0){
                    $('#profile-friend').append("<a href='#' onClick='acceptFriend("+response['id']+")' class='acceptfriend'>Accept request</a>");
                } else if (response.friends === 1 && response.friends === 0 && response.sent === 1){
                    $('#profile-friend').append("Request sent");
                } else{
                    $('#profile-friend').append("<a href='#' onClick='addFriend("+response['id']+")' class='addfriend'>Add Friend</a>");
                }
                $('#profile-img').append('<img src="'+response.image+'">');
                $('#profile-footprint').append("<h1 class='profile-dynamic'>"+response.total+"</h1>");
                $('#profile-reductions').append("<h1 class='profile-dynamic'>"+(response.total - response.current)+"</h1>");
                $('#profile-actions').append("<h1 class='profile-dynamic'>"+response.actions+"</h1>");
                $('#profile-badges').append("<h1 class='profile-dynamic'>"+response.badges+"</h1>");
            }
        }
    };
        // initialise a request, specifying the HTTP method
    // to be used and the URL to be connected to.
    xhr.onreadystatechange = changeListener;
    xhr.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}
function fblogin(){
    FB.login(function(response) {
        alert('here');
       facebookLogin();
     }, {scope: 'email, publish_actions'});
}

function getFBFriends(){
    FB.api('/me/friends?fields=installed', {fields: 'installed'}, function(response) {
        if(response.data) {
            console.log(response);
            $.each(response.data,function(index,friend) {
                console.log(friend.name + ' has id:' + friend.id);
                console.log("INSTALLED :" + friend.installed);
                if(friend.installed == true){
                    //document.getElementById('uncomfirmed-list').innerHTML = friend.name + ' has id:' + friend.id;
                        var xhr, target, changeListener, url, data;
                        //setting url to the php code to add comments to the db
                        url = "http://carbon.jamescobbett.co.uk/services/getfbfriends.php";
                        var data = new FormData();
                        data.append("facebookid", friend.id);
                        data.append("id", localStorage.getItem('id'));
                        // create a request object
                        xhr = new XMLHttpRequest();

                        changeListener = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    console.log("Response", this.responseText);
                                    var response = JSON.parse(this.responseText);
                                    console.log(response);
                                    console.log(response.first_name);
                                    if(response.first_name == undefined){

                                    } else {
                                        var html = "<div class='user'>";
                                        html += "<div class='friends-image'><img class='newsuserimage newuserfriendimage' src='"+response['image']+"'></div>";
                                        //html += "<div class='username'>"+response['username']+" </div>";
                                        html += "<div class='name searchname'>"+response['first_name']+" "+response['last_name']+ "</div>";
                                        html += "<a class='add addfriend' href='#' onclick='addFriend("+response['id']+")'>Add friend</a>";
                                        document.getElementById('uncomfirmed-list').innerHTML += html;
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
                }
            });
        } else {
            document.getElementById('uncomfirmed-list').innerHTML +='<div id="fb-sign" class="fb-sign-friends"><a href="#" onClick="fblogin();"><img src="http://carbon.jamescobbett.co.uk/www/img/facebooksign.png">Sign in with facebook to see your friends</a></div>';
            
        }
    });
}

function calendarevent(title){
     // prep some variables
  var today = new Date();
  var startDate = new Date(2014,3,6,18,30,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(2014,3,6,19,30,0,0,0);
  var title = title;
  var location = "";
  var notes = "";
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };
  // create an event interactively (only supported on Android)
  window.plugins.calendar.createEventInteractively(title,location,notes,today,today,success,error);
}

function changepassword(){
    var password = document.getElementById('password').value;
    var passwordrepeat = document.getElementById('password-repeat').value;
    if(password === passwordrepeat){
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
                        alert('success');
                    }
                    else {
                        alert('failure');
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
    }else{
        alert('Passwords do not match');
    }
}
 

function shareaction(){
    var objectToLike = 'http://samples.ogp.me/488117217965116';
FB.api(
       'me/carboncutter:added',
       'post',
       { carbon_action: objectToLike },
       function(response) {
         if (!response) {
           alert('Error occurred.');
         } else if (response.error) {
            console.log(response.error.message);
           //document.getElementById('result').innerHTML =
             //'Error: ' + response.error.message;
         } else {
           console.log(
             '<a href=\"https://www.facebook.com/me/activity/' +
             response.id + '\">' +
             'Story created.  ID is ' +
             response.id + '</a>');
         }
       }
    );



// FB.api(
//   'me/carboncutter:added',
//   'post',
//   {
//     carbon_action: "http://samples.ogp.me/488117217965116"
//   },
//   function(response) {
//     console.log(response);
//     if (!response || response.error) {
//     alert('Error occured');
//     } else {
//     alert('Demo was liked successfully! Action ID: ' + response.id);
//     }
//   }
// );
}

function direct(){
  alert('in direct');
  // alert('web: '+web);
  // alert(localStorage.getItem('id'));
  // if(localStorage.getItem('id') != undefined || localStorage.getItem('id') != null){
  //   directToHome();
  // } else {
  //   goToLogin();
  // }
//var db = window.openDatabase("User", "1.0", "User DB", 1000000);

  function queryDB(tx) {
          //tx.executeSql('DROP TABLE IF EXISTS User');
          tx.executeSql('SELECT first_name FROM User', [], querySuccess, errorCB);
      }

      function querySuccess(tx, results) {
        alert('success direct');
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
        alert('fail direct');
          goToLogin();
      }

      //var db = window.openDatabase("User", "1.0", "User DB", 1000000);
      alert('just before giving db');
      db.transaction(queryDB, errorCB);
}