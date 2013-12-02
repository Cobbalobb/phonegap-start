<?php
include 'config.php';


// Create connection
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//Check connection
$user = array();
$results = mysqli_query($con,"SELECT * FROM user");
while($row = mysqli_fetch_array($results)){
	$user['id'] = $row['id'];
	$user['name'] = $row['name'];
};
echo '{"items":'. json_encode($user) .'}'; 



// $sql = "select e.id, e.name";

// try {
// 	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
// 	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// 	$stmt = $dbh->prepare($sql);  
// 	$stmt->bindParam("id", $_GET[id]);
// 	$stmt->execute();
// 	$user = $stmt->fetchObject();  
// 	$dbh = null;
// 	echo '{"item":'. json_encode($user) .'}'; 
// } catch(PDOException $e) {
// 	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
// }

?>