<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$footprint = array();

$id = $_POST['id'];
if (isset($id)) {
	    $results = mysqli_query($con,"SELECT * FROM footprint WHERE id=$id");
		while($row = mysqli_fetch_array($results)){
			$footprint['id'] = $row['id'];
			$footprint['house'] = $row['house'];
			$footprint['meat'] = $row['meat'];
			$footprint['organic'] = $row['organic'];
			$footprint['local'] = $row['local'];
			$footprint['compost'] = $row['compost'];
			$footprint['engine'] = $row['engine'];
			$footprint['car_size'] = $row['car_size'];
			$footprint['car_miles'] = $row['car_miles'];
			$footprint['train_miles'] = $row['train_miles'];
			$footprint['bus_miles'] = $row['bus_miles'];
			$footprint['domestic_flights'] = $row['domestic_flights'];
			$footprint['short_flights'] = $row['short_flights'];
			$footprint['long_flights'] = $row['long_flights'];
			$footprint['clothes'] = $row['clothes'];
			$footprint['electronics'] = $row['electronics'];
			$footprint['shopping'] = $row['other_shopping'];
			$footprint['total'] = $row['total'];
			$footprint['current'] = $row['current'];
		};
	echo json_encode($footprint); 
} else {
		// $results = mysqli_query($con,"SELECT * FROM user");
		// while($row = mysqli_fetch_array($results)){
		// 	$user['id'] = $row['id'];
		// 	$user['first_name'] = $row['first_name'];
		// 	$user['last_name'] = $row['last_name'];
		// 	$user['email'] = $row['email'];
		};
	//echo '{"items":'. json_encode($user) .'}'; 
//}

?>