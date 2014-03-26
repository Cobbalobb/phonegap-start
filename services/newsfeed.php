<?php
//include 'http://carbon.jamescobbett.co.uk/services/config.php';
function timeago($time)
{
   $periods = array("second", "minute", "hour", "day", "week", "month", "year", "decade");
   $lengths = array("60","60","24","7","4.35","12","10");

   $now = time();
   $time = strtotime($time);
       $difference    = $now - $time;
       $tense         = "ago";

   for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
       $difference /= $lengths[$j];
   }

   $difference = round($difference);

   if($difference != 1) {
       $periods[$j].= "s";
   }

   return "$difference $periods[$j] ago ";
}
// Create connection
//$con=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con=mysqli_connect('10.168.1.52','carbonja_carbon','GSwMAYuNyVzSguTf','carbonja_carb');

$id = $_POST['id'];
//$id = 1;
$user = array();
$user[0]['id'] = $id;
$user[0]['first_name'] = 'You';
$u=1;
$news = array();
$n=0;
$image = false;

$actions = array();
//GET FRIENDS AND ADD TO ARRAY WITH CURRENT USER
$results2 = mysqli_query($con,"SELECT * FROM friends WHERE '$id' IN (id1,id2)");
while($row = mysqli_fetch_array($results2)){
	$id1=$row['id1'];
	$id2=$row['id2'];
	$confirmed = $row['confirmed'];
	if($id1 == $id || $id2 == $id && $image===false ){
		$results1 = mysqli_query($con,"SELECT user.image FROM user WHERE id = '$id'");
		while($row = mysqli_fetch_array($results1)){
			$user[0]['image'] = $row['image'];
			$image = true;
		}
	}
	if($id1 != $id){
	$results3 = mysqli_query($con,"SELECT user.id, user.username, user.first_name, user.last_name, user.image, footprint.total, footprint.current FROM user INNER JOIN footprint ON user.id=footprint.id WHERE user.id = '$id1'");
	while($row = mysqli_fetch_array($results1)){
		if($confirmed==1){
			$user[$u]['id'] = $row['id'];
			$user[$u]['first_name'] = $row['first_name'];
			$user[$u]['image'] = $row['image'];
			$u++;
		}
		$news['feed'][$n]['image'] = $row['image'];
		$news['feed'][$n]['type'] = 2;
		$news['feed'][$n]['user_id'] = $row['id'];
		$news['feed'][$n]['confirmed'] = $confirmed;
		$news['feed'][$n]['timestamp'] = timeago($row['timestamp']);
		$news['feed'][$n]['sent'] = 0;
		$n++;
	}
	}elseif($id2 != $id){
		$results3 = mysqli_query($con,"SELECT user.id, user.username, user.first_name, user.last_name, user.image, footprint.total, footprint.current FROM user INNER JOIN footprint ON user.id=footprint.id WHERE user.id = '$id2'");
		while($row = mysqli_fetch_array($results3)){
			if($confirmed==1){
				$user[$u]['id'] = $row['id'];
				$user[$u]['first_name'] = $row['first_name'];
				$user[$u]['image'] = $row['image'];
				$u++;
			}
			$news['feed'][$n]['image'] = $row['image'];
			$news['feed'][$n]['type'] = 2;
			$news['feed'][$n]['user_id'] = $row['id'];
			$news['feed'][$n]['confirmed'] = $confirmed;
			$news['feed'][$n]['timestamp'] = timeago($row['timestamp']);
			$news['feed'][$n]['sent'] = 1;
			$n++;
		}
	}
}

//GET ACTIONS AND PUT IN NEWS ARRAY
foreach ($user as $use) {
    $id = $use['id'];
    $results = mysqli_query($con,"SELECT user_actions.user_id, user_actions.timestamp, user_actions.status, user_actions.action_id, actions.action FROM user_actions INNER JOIN actions ON user_actions.action_id=actions.id WHERE user_actions.user_id='$id' AND (user_actions.status=1 OR user_actions.status=2)");

	while($row = mysqli_fetch_array($results)){
		$news['feed'][$n]['type'] = 1;
		$news['feed'][$n]['user_id'] = $row['user_id'];
		$news['feed'][$n]['user_name'] = $use['first_name'];
		$news['feed'][$n]['image'] = $use['image'];
		$news['feed'][$n]['timestamp'] = timeago($row['timestamp']);
		$news['feed'][$n]['status'] = $row['status'];
		$news['feed'][$n]['action_id'] = $row['action_id'];
		$news['feed'][$n]['action_name'] = $row['action'];
		$n++;
}
}
$p=0;
$results4 = mysqli_query($con,"SELECT * FROM news");
	while($row = mysqli_fetch_array($results4)){
		$news['news'][$p]['headline'] = $row['headline'];
		$news['news'][$p]['source'] = $row['source'];
		$news['news'][$p]['url'] = $row['url'];
		$news['news'][$p]['current'] = $row['current'];
		$p++;
	}

//print_r($news);
	function sort_2d_asc($array, $key) {
	    usort($array, function($a, $b) use ($key) {
	        return strnatcasecmp($a[$key], $b[$key]);
	    });

	    return $array;
	}

	function sort_2d_desc($array, $key) {
    usort($array, function($a, $b) use ($key) {
        return strnatcasecmp($b[$key], $a[$key]);
    });

    return $array;
}
shuffle($news['news']);

	$news['feed'] = sort_2d_desc($news['feed'], 'timestamp');
	//print_r($news);
 	echo json_encode($news); 

//THIS WORKS, NEXT TO BUILD JS FUNCTION TO GET THESE RESULTS

?>