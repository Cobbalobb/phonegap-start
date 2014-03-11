<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';


// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$user = array();

$term = $_POST['term'];
$id = $_POST['userid'];


$results = mysqli_query($con,"SELECT * FROM user WHERE '$term' IN (email,username) ");
while($row = mysqli_fetch_array($results)){
	if($id === $row['id']){
		$user['user'] = true;
	} else {
		$user['id'] = $row['id'];
		$user['username'] = $row['username'];
		$user['first_name'] = $row['first_name'];
		$user['last_name'] = $row['last_name'];
		$user['email'] = $row['email'];
		$user['image'] = $row['image'];
	}
}
	
	echo json_encode($user); 

?>