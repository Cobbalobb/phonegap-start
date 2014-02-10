<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


$userid = $_POST['userid'];
$actionid = $_POST['actionid'];

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
$sql = "INSERT INTO completed_actions (user_id, action_id) VALUES ('$userid', '$actionid')";
$q = $con->prepare($sql);
$q->execute(array(':user-id'=>$userid,
                  ':action-id'=>$actionid,
                  ));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }	 	
?>