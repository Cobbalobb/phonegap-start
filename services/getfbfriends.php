<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$user = array();
$id = $_POST['id'];
$facebookid = $_POST['facebookid'];


$results = mysqli_query($con,"SELECT * FROM user WHERE facebookid = '$facebookid' ");
while($row = mysqli_fetch_array($results)){
	$results2 = mysqli_query($con,"SELECT * FROM friends WHERE (id1 = '$id' AND id2 = '$facebookid') OR (id1 = '$facebookid' AND id2 = '$id') ");
	if($row2 = mysqli_fetch_array($results2)==0){
		$user['id'] = $row['id'];
		$user['username'] = $row['username'];
		$user['first_name'] = $row['first_name'];
		$user['last_name'] = $row['last_name'];
		$user['email'] = $row['email'];
		$user['image'] = $row['image'];
		$user['confirmed'] = $row['confirmed'];
	}
	else{

	}
}
	
	echo json_encode($user); 

?>