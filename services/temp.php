<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con2=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$image = 3;
$email = 'mavs5@hotmail.co.uk';
$sql = "UPDATE user SET image = :image WHERE email = :email";
		$q = $con->prepare($sql);
		$q->execute(array(':image' => $image, 
			':email' => $email));

if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }	 

// $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// $id = 4;
// // POPULATE user_actions table
// $results = mysqli_query($con2,"SELECT * FROM actions");
// while($row = mysqli_fetch_array($results)){
// 	$action_id = $row['id'];
// 	$sql = "INSERT INTO user_actions (user_id, action_id, status) VALUES ('$id', '$action_id', '0')";
// 	$q = $con->prepare($sql);
// 	$q->execute(array(':user_id'=>$id,
// 	                  ':action_id'=>$action_id,
// 	                  ':status'=>'0',
// 	               	));

// }
?>