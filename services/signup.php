<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


//$fname = $_GET['firstname'];
$fname = $_POST['firstname'];
$lname = $_POST['lastname'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$image = $_POST['image'];

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// query
$sql = "INSERT INTO user (first_name, last_name, username, email, password, image) VALUES ('$fname', '$lname', '$username', '$email', '$password', '$image')";
$q = $con->prepare($sql);
$q->execute(array(':fname'=>$fname,
                  ':lname'=>$lname,
                  ':username'=>$username,
                  ':email'=>$email,
                  ':password'=>$password,
                  ':image'=>$image));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	//Log user in
	$user = array();

	$statement = $con->prepare("select * from user where email = :email");
	$statement->execute(array(':email' => $email));
	$row = $statement->fetch();
	//print_r($row);
	//$results = mysqli_query($con,"SELECT * FROM user WHERE email='$email' ");
	//while($row = mysqli_fetch_array($results)){
	//while($row){
	 	$user['id'] = $row['id'];
	 	$user['first_name'] = $row['first_name'];
	 	$user['last_name'] = $row['first_name'];
	 	$user['email'] = $row['first_name'];
	 	$user['image'] = $row['image'];
	// };
 	echo "success ".'{"items":'. json_encode($user) .'}';
 }
$id = $user['id'];
// POPULATE user_actions table
$con2=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$results = mysqli_query($con2,"SELECT * FROM actions");
while($row = mysqli_fetch_array($results)){
	$action_id = $row['id'];
	$sql = "INSERT INTO user_actions (user_id, action_id, status) VALUES ('$id', '$action_id', '0')";
	$q = $con->prepare($sql);
	$q->execute(array(':id'=>$id,
	                  ':action_id'=>$action_id,
	                  ':status'=>'0',
	               	));

}
?>