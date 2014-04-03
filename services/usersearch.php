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
		$user_id = $row['id'];
		$user[$i]['id'] = $row['id'];
		$user[$i]['username'] = $row['username'];
		$user[$i]['first_name'] = $row['first_name'];
		$user[$i]['last_name'] = $row['last_name'];
		$user[$i]['email'] = $row['email'];
		$user[$i]['image'] = $row['image'];
		$results2 = mysqli_query($con,"SELECT * FROM friends WHERE id1 = '$id' AND id2 = '$user_id'");
		$row2 = mysqli_fetch_array($results2);
		if(sizeof($row2) > 0){
			$user[$i]['status'] = $row2['confirmed'];
			$user[$i]['sent'] = '1';
		}

		$results3 = mysqli_query($con,"SELECT * FROM friends WHERE id1 = '$user_id' AND id2 = '$id'");
		$row3 = mysqli_fetch_array($results3);
		if(sizeof($row3) > 0){
			$user[$i]['status'] = $row3['confirmed'];
			$user[$i]['sent'] = '0';
		}
		$i++;
	}
}
	
	echo json_encode($user); 

?>