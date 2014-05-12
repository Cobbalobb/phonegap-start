<?php
include('config.php');

//$fname = $_GET['firstname'];
$id1 = $_POST['id1'];
$id2 = $_POST['id2'];

// Create connection
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
$sql = "INSERT INTO friends (id1, id2,confirmed) VALUES ('$id1', '$id2', '0')";
$q = $con->prepare($sql);
$q->execute(array(':id1'=>$id1,
                  ':id2'=>$id2,
                  ':confirmed'=>'0'
                  )
);

if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "Succesfully Added";
 }
?>