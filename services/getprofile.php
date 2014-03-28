<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';


// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$user = array();

$id = $_POST['id'];
$user_id = $_POST['user_id'];

$user['id'] = $row['id'];
$user['friends'] = 0;
$user['status'] ="";
$user['sent'] ="";


$results = mysqli_query($con,"SELECT first_name, last_name, image, total, current FROM user, footprint WHERE user.id = '$id' AND footprint.id = '$id'");
while($row = mysqli_fetch_array($results)){
	$user['id'] = $user_id;
	$user['first_name'] = $row['first_name'];
	$user['last_name'] = $row['last_name'];
	$user['image'] = $row['image'];
	$user['total'] = $row['total'];
	$user['current'] = $row['current'];
};

$results2 = mysqli_query($con,"SELECT * FROM user_actions WHERE user_id = '$id'");
$row = mysqli_fetch_array($results2);
$user['actions'] = sizeof($row);

$results3 = mysqli_query($con,"SELECT * FROM completed_badges WHERE user_id = '$id'");
$row2 = mysqli_fetch_array($results3);
$user['badges'] = sizeof($row2);

$results4 = mysqli_query($con,"SELECT * FROM friends WHERE id1 = '$id' AND id2 = '$user_id'");
$row4 = mysqli_fetch_array($results4);
if(sizeof($row4) > 0){
	$user['friends'] = 1;
	$user['status'] = $row['confirmed'];
	$user['sent'] = '0';
}

$results4 = mysqli_query($con,"SELECT * FROM friends WHERE id1 = '$user_id' AND id2 = '$id' ");
$row4 = mysqli_fetch_array($results4);
if(sizeof($row4) > 0){
	$user['friends'] = 1;
	$user['status'] = $row['confirmed'];
	$user['sent'] = '1';
}

echo json_encode($user); 

?>