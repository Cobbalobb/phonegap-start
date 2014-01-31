function getActions(){
	alert('sdgsd');
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    alert('succes');
	    }
	  }
	xmlhttp.open("GET","http://carbon.jamescobbett.co.uk/services/getactions.php");
	xmlhttp.send();
};