<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$user = array();

$email = $_POST['email'];
if (isset($email)) {
	    $results = mysqli_query($con,"SELECT * FROM user WHERE email='$email");
		while($row = mysqli_fetch_array($results)){
			$user['id'] = $row['id'];
			$user['first_name'] = $row['first_name'];
		};
	echo '{"items":'. json_encode($user) .'}'; 
} else {
		$results = mysqli_query($con,"SELECT * FROM user");
		while($row = mysqli_fetch_array($results)){
			$user['id'] = $row['id'];
			$user['first_name'] = $row['first_name'];
			$user['last_name'] = $row['last_name'];
			$user['email'] = $row['email'];
		};
	echo '{"items":'. json_encode($user) .'}'; 
}

?>