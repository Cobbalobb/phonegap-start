<?php
// Create connection
include('config.php');

$userid = $_POST['userid'];
$actionid = $_POST['actionid'];
$reduction = $_POST['reduction'];
$status = 2;

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$sql2 = "UPDATE footprint SET current = current - '$reduction' WHERE id = '$userid'";
$q = $con->prepare($sql2);
$q->execute(array($reduction, $userid));

// query
$sql = "UPDATE user_actions SET status = '$status' WHERE user_id = '$userid' AND action_id = '$actionid'";
$q = $con->prepare($sql);
$q->execute(array($status, $userid, $actionid));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }	 

?>