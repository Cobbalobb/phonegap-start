//GET ACTIONS FROM SERVER
function getActions(){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	//console.log(xmlhttp.responseText);
	    	var response = JSON.parse(xmlhttp.responseText);
	    	console.log(response[0]);
	    	for(var i = 0; i < response.length; i++){
	    		var action = "<div class='action'><div class='action-title'>"+response[i]['action']+"</div><div class='action-description'>"+response[i]['description']+"</div><div class='action-category'>"+response[i]['category']+"</div>";
			 	var action = action + "<a onclick='addActionToList("+response[i]['id']+")' href='#'>Add to list</a> <a href='#'>Mark as completed</a></div>";
			 	document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['action'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['description'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['category'];
			};
	    }
	  }
	xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getactions.php");
	xmlhttp.send();
};

function getListActions(){
	var data = new FormData();
	var id = localStorage.getItem('id');
    data.append("id", id);
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	console.log(xmlhttp.responseText);
	    	var response = JSON.parse(xmlhttp.responseText);
	    	console.log(response[0]);
	    	for(var i = 0; i < response.length; i++){
	    		console.log(response);
	    		var action = "<div class='action'><div class='action-title'>"+response[i]['action']+"</div><div class='action-description'>"+response[i]['description']+"</div><div class='action-category'>"+response[i]['category']+"</div>";
			 	var action = action + "<a onclick='addActionToList("+response[i]['id']+")' href='#'>Remove from list</a> <a href='#' onclick='completeAction("+response[i]['id']+","+response[i]['reduction']+")'>Mark as completed</a></div>";
			 	document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['action'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['description'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['category'];
			};
	    }
	  }
	var url = "http://carbon.jamescobbett.co.uk/services/getlistactions.php";
    xmlhttp.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
};

function getCompletedActions(){
	var data = new FormData();
	var id = localStorage.getItem('id');
    data.append("id", id);
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	console.log(xmlhttp.responseText);
	    	var response = JSON.parse(xmlhttp.responseText);
	    	console.log(response[0]);
	    	for(var i = 0; i < response.length; i++){
	    		console.log(response);
	    		var action = "<div class='action'><div class='action-title'>"+response[i]['action']+"</div><div class='action-description'>"+response[i]['description']+"</div><div class='action-category'>"+response[i]['category']+"</div>";
			 	/*var action = action + "<a onclick='completeAction("+response[i]['id']+")' href='#'>Remove from list</a> <a href='#'>Mark as completed</a></div>";*/
			 	document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['action'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['description'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['category'];
			};
	    }
	  }
	var url = "http://carbon.jamescobbett.co.uk/services/getcompletedactions.php";
    xmlhttp.open('POST', url, true);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
};


//GET ACTIONS FROM LOCAL
function getActionsL(){
	function queryDB(tx) {
        tx.executeSql('SELECT * FROM Actions', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
        	for(var i = 0; i < results.rows.length; i++){
	    		var action = "<div class='action'><div class='action-title'>"+results.rows.item(i).action+"</div><div class='action-description'>"+results.rows.item(i).description+"</div><div class='action-category'>"+results.rows.item(1).category+"</div>";
			 	var action = action + "<a onclick='addActionToList("+results.rows.item(i).id+")' href='#'>Add to list</a> <a href='#'>Mark as completed</a></div>";
			 	document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['action'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['description'];
			 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['category'];
			};
   //          //$('#name').append(results.rows.item(num-1).first_name + ',');
   //          var action = "<div class='action'><div class='action-title'>"+results.rows.item(num-1).action+"</div><div class='action-description'>"+results.rows.item(num-1).description+"</div><div class='action-category'>"+results.rows.item(num-1).category+"</div>";
			// var action = action + "<a onclick='addActionToList("+results.rows.item(num-1).id+")' href='#'>Add to list</a> <a href='#'>Mark as completed</a></div>";
			// document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
   //          return false;
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
};

//GET LIST ACTIONS FROM LOCAL
function getListActionsL(){
	function queryDB(tx) {
        //tx.executeSql('SELECT action_id FROM current_actions', [], querySuccess, errorCB);
        tx.executeSql('SELECT current_actions.action_id, Actions.id, Actions.action, Actions.description, Actions.reduction, Actions.category FROM current_actions INNER JOIN Actions ON current_actions.action_id=Actions.id', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows from current_actions = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
        	for(var i = 0; i < results.rows.length; i++){
        		console.log(results.rows.item(i));
			    var action = "<div class='action'><div class='action-title'>"+results.rows.item(i).action+"</div><div class='action-description'>"+results.rows.item(i).description+"</div><div class='action-category'>"+results.rows.item(1).category+"</div>";
				var action = action + "<a onclick='addActionToList("+results.rows.item(i).id+")' href='#'>Remove from list</a> <a href='#' onclick='completeAction("+results.rows.item(i).id+","+results.rows.item(i).reduction+")'>Mark as completed</a></div>";
				document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
					};
        } else {
            console.log('No rows affected!');
        }
    }

    function errorCB(err) {
    }

    db.transaction(queryDB, errorCB);
};