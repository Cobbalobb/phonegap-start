<?php
// Create connection
include('config.php');

$userid = $_POST['userid'];
$fbactions = $_POST['fbactions'];

$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$sql2 = "UPDATE user SET fbactions = '$fbactions' WHERE id = '$userid'";
$q = $con->prepare($sql2);
$q->execute(array($fbactions)); 

?>