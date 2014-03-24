<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


$userid = $_POST['userid'];
$badgeid = $_POST['badgeid'];
$completed = 1;

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
// $sql = "INSERT INTO completed_badges (user_id, badge_id) VALUES ('$userid', '$badgeid')";
// $q = $con->prepare($sql);
// $q->execute(array(':user-id'=>$userid,
//                   ':badge-id'=>$badgeid,
//                   ));

//  if (!$q->errorCode() != 0) {
//      echo $con->errorInfo();
//  } else {
//  	echo "success";
//  }	 

$sql = "UPDATE completed_badges SET completed = '$completed' WHERE user_id = '$userid' AND badge_id = '$badgeid'";
$q = $con->prepare($sql);
$q->execute(array($completed, $userid, $badgeid));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }

?>