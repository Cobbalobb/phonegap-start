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