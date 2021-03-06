//GET ACTIONS FROM LOCAL
function getActionsL(){
	function queryDB(tx) {
		tx.executeSql('SELECT user_actions.action_id, user_actions.status, Actions.id, Actions.action, Actions.description, Actions.reduction, Actions.category FROM user_actions INNER JOIN Actions ON user_actions.action_id=Actions.id', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
    	$( "#action-list" ).empty();
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
        	for(var i = 0; i < results.rows.length; i++){
        		if (results.rows.item(i).status==0){
        			var name = escape(results.rows.item(i).action);
		    		var action = "<div class='action con-"+results.rows.item(i).category+"'><div class='action-category "+results.rows.item(i).category+"'>"+results.rows.item(i).category+"</div><div class='action-title'>"+results.rows.item(i).action+"</div><div class='action-description'>"+results.rows.item(i).description+"</div>";
				 	var action = action + "<div class='action-links-container'><div class='action-links'id='"+results.rows.item(i).id+"success'><a class='action-add' onclick='addActionToList("+results.rows.item(i).id+")' href='#'>Add to list</a> <a href='#' class='action-complete' onclick='completeAction("+results.rows.item(i).id+","+results.rows.item(i).reduction+")'>Mark as completed</a></div><div style='clear: both;'></div>";
				 	var action = action + '<div style="clear: both;"></div>';
					var action = action + '<div class="action-links padd-top"><a href="#" class="calendar-add-list" onClick="calendarevent(\''+name+'\');">Add to calendar</a><a href="#" class="facebook-share" onclick="facebookWallPost(\''+name+'\')">Share</a></div><div style="clear: both;"></div></div></div>';
				 	document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
				 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['action'];
				 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['description'];
				 	//document.getElementById("actions").innerHTML=document.getElementById("actions").innerHTML + response[i]['category'];
				 }
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
	var m = 0;
	function queryDB(tx) {
        //tx.executeSql('SELECT action_id FROM current_actions', [], querySuccess, errorCB);
		tx.executeSql('SELECT user_actions.action_id, user_actions.status, Actions.id, Actions.action, Actions.description, Actions.reduction, Actions.category FROM user_actions INNER JOIN Actions ON user_actions.action_id=Actions.id', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
    	$( "#action-list" ).empty();
        console.log("Returned rows from current_actions = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
        	for(var i = 0; i < results.rows.length; i++){
        		if (results.rows.item(i).status==1){
	        		console.log(results.rows.item(i));
	        		//var name = results.rows.item(i).action.replace("'","&#39;");
				    var name = escape(results.rows.item(i).action);
				    var action = "<div class='action con-"+results.rows.item(i).category+"'><div class='action-category "+results.rows.item(i).category+"'>"+results.rows.item(i).category+"</div><div class='action-title'>"+results.rows.item(i).action+"</div><div class='action-description'>"+results.rows.item(i).description+"</div>";
					var action = action + "<div class='action-links-container'><div class='action-links' id='"+results.rows.item(i).id+"success'><a class='action-remove' onclick='removeActionFromList("+results.rows.item(i).id+")' href='#'>Remove from list</a> <a href='#' class='action-complete' onclick='completeAction("+results.rows.item(i).id+","+results.rows.item(i).reduction+")'>Mark as completed</a></div>";
					var action = action + '<div style="clear: both;"></div>';
					var action = action + '<div class="action-links padd-top"><a href="#" class="calendar-add-list" onClick="calendarevent(\''+name+'\');">Add to calendar</a><a href="#" class="facebook-share" onclick="facebookWallPost(\''+name+'\')">Share</a></div><div style="clear: both;"></div></div></div>';
					m = 1;
					document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
				}
					};
        			if(m == 0){
						document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + "<div id='action-message'><h2>No Actions on your list. Why not <a href='#' onClick='goToActions();'>add some?</a></h2></div>";
					}
    	}
	}

    function errorCB(err) {
    		document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + "<div id='action-message'><h2>No Actions on your list. Why not <a href='#' onClick='goToActions();'>add some?</a></h2></div>";
    }

    db.transaction(queryDB, errorCB);
};

//SHOW COMPLETED ACTIONS FROM LOCAL
function getCompletedActionsL(){
	var m = 0;
	function queryDB(tx) {
		        tx.executeSql('SELECT user_actions.action_id, user_actions.status, Actions.id, Actions.action, Actions.description, Actions.reduction, Actions.category FROM user_actions INNER JOIN Actions ON user_actions.action_id=Actions.id', [], querySuccess, errorCB);
		    }

		    function querySuccess(tx, results) {
		        $( "#action-list" ).empty();
		        console.log("Returned rows from current_actions = " + results.rows.length);
		        var num = results.rows.length;
		        // this will be true since it was a select statement and so rowsAffected was 0
		        if (!results.rowsAffected) {
					for(var i = 0; i < results.rows.length; i++){
						if (results.rows.item(i).status==2){
						    console.log(results.rows.item(i));
							var action = "<div class='action con-"+results.rows.item(i).category+"'><div class='action-category "+results.rows.item(i).category+"'>"+results.rows.item(i).category+"</div><div class='action-title'>"+results.rows.item(i).action+"</div><div class='action-description'>"+results.rows.item(i).description+"</div>";
							//var action = action + "<div class='action-links'><a onclick='addActionToList("+results.rows.item(i).id+")' href='#'>Remove from list</a> <a href='#' onclick='completeAction("+results.rows.item(i).id+","+results.rows.item(i).reduction+")'>Mark as completed</a></div></div>";
							document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + action;
							m = 1;
						}
					};
					if(m == 0){
						document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + "<div id='action-message'><h2>No Actions completed yet.</h2></div>";
					}
		        } 
		       
		    }

		    function errorCB(err) {
		    	document.getElementById("action-list").innerHTML=document.getElementById("action-list").innerHTML + "<h2>No Actions completed yet.</h2>";
		    }

	    db.transaction(queryDB, errorCB);
};

//GET COMPLETED BADGES FROM LOCAL
function getCompletedBadges(){
	function queryDB(tx) {
        //tx.executeSql('SELECT action_id FROM current_actions', [], querySuccess, errorCB);
        tx.executeSql('SELECT completed_badges.badge_id, completed_badges.completed, badges.id, badges.badge FROM completed_badges INNER JOIN badges ON completed_badges.badge_id=badges.id', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows from current_actions = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
        	for(var i = 0; i < results.rows.length; i++){
        		console.log(results.rows.item(i));
			    var html = "<div class='badges badge"+results.rows.item(i).completed+"'>";
			    if(results.rows.item(i).completed == 0){
			    	html += "<img class='badge-image' src='img/badges/saturated/"+results.rows.item(i).badge_id+".png'>";
			    } else {
			    	html += "<img class='badge-image' src='img/badges/colour/"+results.rows.item(i).badge_id+".png'>";
			    }
			    html += "<div class='badge-title'>"+results.rows.item(i).badge+"</div></div>";
				document.getElementById("badges-list").innerHTML=document.getElementById("badges-list").innerHTML + html;
					};
        } else {
            console.log('No rows affected!');
        }
    }

    function errorCB(err) {
    	console.log("error: "+err);
    }

    db.transaction(queryDB, errorCB);
};