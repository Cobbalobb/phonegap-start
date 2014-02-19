<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


//$fname = $_GET['firstname'];
$current_id = $_POST['current-id'];
$friend_id = $_POST['friend-id'];

// Create connection
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
$sql = "UPDATE friends SET confirmed = 1 WHERE id1 = '$friend_id' AND id2 = '$current_id'";
$q = $con->prepare($sql);
$q->execute();

if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "Succesfully Added";
 }
?>