<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';


// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$actions = array();
$i=0;
$id=$_POST['id'];
$results = mysqli_query($con,"SELECT * FROM completed_badges where user_id=$id");
while($row = mysqli_fetch_array($results)){
		$actions[$i]['user_id'] = $row['user_id'];
		$actions[$i]['badge_id'] = $row['badge_id'];
		$actions[$i]['completed'] = $row['completed'];
		$i++;
}
	//$actions[$i]['id'] = $row['action_id'];
	//$i++;
echo json_encode($actions); 

?>