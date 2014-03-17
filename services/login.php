<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


//$fname = $_GET['firstname'];
$email = $_POST['email'];
$password = $_POST['password'];
$image = $_POST['image'];
$image = (string)$image;
// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//Log user in
$user = array();

$statement = $con->prepare("select * from user where email = :email");
$statement->execute(array(':email' => $email));
$row = $statement->fetch();
if ($row['id'] == null) {	
     echo $con->errorInfo();
     echo "Login failed: Wrong email address"; 
 } else {
	//Check passwords match
	//If pass is blank it's come from FB, blank passwords can not be entered through the form
 	if($password == $row['password'] || $password == ''){
		$user['id'] = $row['id'];
	 	$user['first_name'] = $row['first_name'];
	 	$user['last_name'] = $row['last_name'];
	 	$user['email'] = $row['email'];
	 	$user['image'] = $row['image'];
	 	$user['facebookid'] = $row['facebookid'];
	 	$user['fbactions'] = $row['fbactions'];
	 	if($image != null){
		 	$sql = "UPDATE user SET image = :image WHERE email = :email";
			$q = $con->prepare($sql);
			$q->execute(array(':image' => $image, 
				':email' => $email));
		}

		echo json_encode($user); 
 	} else {
 		echo "Login failed: Incorrect Password";
 	}
 }
?>