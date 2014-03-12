<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';

	$dbhost = '10.168.1.52';
	$dbuser = 'carbonja_carbon';
	$dbpass = 'GSwMAYuNyVzSguTf';
	$dbname = 'carbonja_carb';


//$fname = $_GET['firstname'];
$id = $_POST['id'];
$house = $_POST['house'];
$meat= $_POST['meat'];
$organic = $_POST['organic'];
$local = $_POST['local'];
$compost = $_POST['compost'];
$engine = $_POST['engine'];
$car_size = $_POST['car_size'];
$car_miles = $_POST['car_miles'];
$train_miles = $_POST['train_miles'];
$bus_miles = $_POST['bus_miles'];
$domestic_flights = $_POST['domestic_flights'];
$short_flights = $_POST['short_flights'];
$long_flights = $_POST['long_flights'];
$clothes = $_POST['clothes'];
$electronics = $_POST['electronics'];
$shopping = $_POST['other_shopping'];
$total = $_POST['total'];

// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');
$con = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conn=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$results = mysqli_query($conn,"SELECT * FROM footprint WHERE id=$id");
if($row = mysqli_fetch_array($results)){
      $results2 = mysqli_query($conn,"DELETE FROM footprint WHERE id=$id");
};

// query
$sql = "INSERT INTO footprint (id, house, meat, organic, local, compost, car_engine, car_size, car_miles, train_miles, bus_miles, domestic_flights, short_flights, long_flights, clothes, electronics, other_shopping, total, current) VALUES ('$id', '$house', '$meat', '$organic', '$local', '$compost', '$engine', '$car_size', '$car_miles', '$train_miles', '$bus_miles', '$domestic_flights', '$short_flights', '$long_flights', '$clothes', '$electronics', '$shopping', '$total', '$total')";
$q = $con->prepare($sql);
$q->execute(array(':id'=>$id,
                  ':house'=>$house,
                  ':meat'=>$meat,
                  ':organic'=>$organic,
                  ':local'=>$local,
                  ':compost'=>$compost,
                  ':car_engine'=>$engine,
                  ':car_size'=>$car_size,
                  ':car_miles'=>$car_miles,
                  ':train_miles'=>$train_miles,
                  ':bus_miles'=>$bus_miles,
                  ':domestic_flights'=>$domestic_flights,
                  ':short_flights'=>$short_flights,
                  ':long_flights'=>$long_flights,
                  ':clothes'=>$clothes,
                  ':electronics'=>$electronics,
                  ':other_shopping'=>$other_shopping,
                  ':total'=>$total,
                  ':current'=>$total,
                  ));

 if (!$q->errorCode() != 0) {
     echo $con->errorInfo();
 } else {
 	echo "success";
 }	 	
?>