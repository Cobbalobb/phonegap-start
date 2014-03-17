<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


$userid = $_POST['userid'];
$fbactions = $_POST['fbactions'];

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$sql2 = "UPDATE user SET fbactions = '$fbactions' WHERE id = '$userid'";
$q = $con->prepare($sql2);
$q->execute(array($fbactions)); 

?>