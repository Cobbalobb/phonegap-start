<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


$userid = $_POST['userid'];
$actionid = $_POST['actionid'];
$status = 1;

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
$sql = "UPDATE user SET total_actions_added = total_actions_added+1 WHERE id = '$userid'";
$q = $con->prepare($sql);
$q->execute(array(':total_actions_added'=>total_actions_added+1)
	);

 if (!$q->errorCode() != 0) {
     //echo $con->errorInfo();
 } else {
 	//echo "success";
 }	 	

$sql = "UPDATE user_actions SET status = '$status' WHERE user_id = '$userid' AND action_id = '$actionid'";
$q = $con->prepare($sql);
$q->execute(array($status));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }	 	
// $sql = "INSERT INTO current_actions (user_id, action_id) VALUES ('$userid', '$actionid')";
// $q = $con->prepare($sql);
// $q->execute(array(':user-id'=>$userid,
//                   ':action-id'=>$actionid,
//                   ));

//  if (!$q->errorCode() != 0) {
//      echo $con->errorInfo();
//  } else {
//  	echo "success";
//  }	 	
?>