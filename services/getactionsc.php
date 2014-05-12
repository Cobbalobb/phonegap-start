<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$actions = array();
$i=0;
$id=$_POST['id'];
$results = mysqli_query($con,"SELECT * FROM user_actions where user_id=$id");
while($row = mysqli_fetch_array($results)){
		$actions[$i]['user_id'] = $row['user_id'];
		$actions[$i]['action_id'] = $row['action_id'];
		$actions[$i]['status'] = $row['status'];
		$actions[$i]['timestamp'] = $row['timestamp'];
		$i++;
}
	//$actions[$i]['id'] = $row['action_id'];
	//$i++;
echo json_encode($actions); 

?>