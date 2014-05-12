<?php
// Create connection
include('config.php');
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

$user = array();

$id = $_POST['id'];
$i=0;
$results = mysqli_query($con,"SELECT * FROM friends WHERE '$id' IN (id1,id2) ");
while($row = mysqli_fetch_array($results)){
	$id1=$row['id1'];
	$id2=$row['id2'];
	$confirmed = $row['confirmed'];
	if($id1 != $id){
	$results1 = mysqli_query($con,"SELECT user.id, user.username, user.first_name, user.last_name, user.image, footprint.total, footprint.current FROM user INNER JOIN footprint ON user.id=footprint.id WHERE user.id = '$id1'");
	while($row = mysqli_fetch_array($results1)){
		$user[$i]['id'] = $row['id'];
		$user[$i]['username'] = $row['username'];
		$user[$i]['first_name'] = $row['first_name'];
		$user[$i]['last_name'] = $row['last_name'];
		$user[$i]['original_fp'] = $row['total'];
		$user[$i]['current_fp'] = $row['current'];
		$user[$i]['image'] = $row['image'];
		$user[$i]['confirmed'] = $confirmed;
		$user[$i]['sent'] = '0';
		$i++;
	}
	}elseif($id2 != $id){
	$results2 = mysqli_query($con,"SELECT user.id, user.username, user.first_name, user.last_name, user.image, footprint.total, footprint.current FROM user INNER JOIN footprint ON user.id=footprint.id WHERE user.id = '$id2'");
	while($row = mysqli_fetch_array($results2)){
		$user[$i]['id'] = $row['id'];
		$user[$i]['username'] = $row['username'];
		$user[$i]['first_name'] = $row['first_name'];
		$user[$i]['last_name'] = $row['last_name'];
		$user[$i]['original_fp'] = $row['total'];
		$user[$i]['current_fp'] = $row['current'];
		$user[$i]['image'] = $row['image'];
		$user[$i]['confirmed'] = $confirmed;
		$user[$i]['sent'] = '1';
		$i++;
	}
}
	}

	$results3 = mysqli_query($con,"SELECT user.id, user.username, user.first_name, user.last_name, user.image, footprint.total, footprint.current FROM user INNER JOIN footprint ON user.id=footprint.id WHERE user.id = '$id'");
	while($row = mysqli_fetch_array($results3)){
		$user[$i]['id'] = $row['id'];
		$user[$i]['username'] = $row['username'];
		$user[$i]['first_name'] = $row['first_name'];
		$user[$i]['last_name'] = $row['last_name'];
		$user[$i]['original_fp'] = $row['total'];
		$user[$i]['current_fp'] = $row['current'];
		$user[$i]['image'] = $row['image'];
		$user[$i]['confirmed'] = '2';
		$user[$i]['sent'] = '1';	
	};

	function sort_2d_asc($array, $key) {
	    usort($array, function($a, $b) use ($key) {
	        return strnatcasecmp($a[$key], $b[$key]);
	    });

	    return $array;
	}

	$user = sort_2d_asc($user, 'current_fp');
	echo json_encode($user); 

//THIS WORKS, NEXT TO BUILD JS FUNCTION TO GET THESE RESULTS

?>