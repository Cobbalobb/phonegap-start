<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$actions = array();
$i=0;
$results = mysqli_query($con,"SELECT * FROM actions");
while($row = mysqli_fetch_array($results)){
	$actions[$i]['id'] = $row['id'];
	$actions[$i]['action'] = $row['action'];
	$actions[$i]['category'] = $row['category'];
	$actions[$i]['description'] = $row['description'];
	$actions[$i]['reduction'] = $row['reduction'];
	$i++;
}
echo json_encode($actions); 

?>