<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';


// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$actions = array();
$i=0;
$results = mysqli_query($con,"SELECT * FROM actions");
while($row = mysqli_fetch_array($results)){
	$actions[$i]['id'] = $row['id'];
	$actions[$i]['action'] = $row['action'];
	$actions[$i]['category'] = $row['category'];
	$actions[$i]['description'] = $row['description'];
	$i++;
}
echo json_encode($actions); 

?>