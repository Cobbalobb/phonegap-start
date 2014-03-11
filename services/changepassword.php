<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


$id = $_POST['id'];
$password = $_POST['password'];

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
$sql = "UPDATE user SET password = '$password' WHERE id = '$id'";
$q = $con->prepare($sql);
$q->execute(array($password));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }	 

?>