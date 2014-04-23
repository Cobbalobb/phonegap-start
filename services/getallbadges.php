<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$badges = array();
$i=0;
$results = mysqli_query($con,"SELECT * FROM badges");
while($row = mysqli_fetch_array($results)){
	$badges[$i]['id'] = $row['id'];
	$badges[$i]['badge'] = $row['badge'];
	$i++;
}
echo json_encode($badges); 

?>