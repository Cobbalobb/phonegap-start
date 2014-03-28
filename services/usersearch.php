<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';


// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$user = array();

$term = $_POST['term'];
$id = $_POST['userid'];
$user = array();
$i = 0;

$results = mysqli_query($con,"SELECT * FROM user WHERE '$term' IN (email,username, first_name, last_name) ");
while($row = mysqli_fetch_array($results)){
	if($id === $row['id']){
		$user[$i]['user'] = true;
		$i++;
	} else {
		$user[$i]['id'] = $row['id'];
		$user[$i]['username'] = $row['username'];
		$user[$i]['first_name'] = $row['first_name'];
		$user[$i]['last_name'] = $row['last_name'];
		$user[$i]['email'] = $row['email'];
		$user[$i]['image'] = $row['image'];
		$i++;
	}
}
	
	echo json_encode($user); 

?>