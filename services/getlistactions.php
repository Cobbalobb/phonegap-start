<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$actions = array();
$i=0;
$id=$_POST['id'];
$results = mysqli_query($con,"SELECT * FROM current_actions where user_id=$id");
while($row = mysqli_fetch_array($results)){
	$idtemp = $row['action_id'];
	$result = mysqli_query($con,"SELECT * FROM actions where id=$idtemp");
	while($row = mysqli_fetch_array($result)){
		$actions[$i]['id'] = $row['id'];
		$actions[$i]['action'] = $row['action'];
		$actions[$i]['category'] = $row['category'];
		$actions[$i]['description'] = $row['description'];
		$i++;
}
	//$actions[$i]['id'] = $row['action_id'];
	//$i++;
}
echo json_encode($actions); 

?>