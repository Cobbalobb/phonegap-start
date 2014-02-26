<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';


// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

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