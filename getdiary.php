<?php
include_once("connection.php");
require_once("headfile.php");

//converting db values into json
header('Content-type:application/json');

$user_id = $_SESSION['user_id'];

//$sql = "SELECT name, quantity, sow_date, harvest_date, harvest_volume, price, total_amt FROM `plant_diary` WHERE user_id = $GET[user_id]";
$sql = "SELECT id, name, quantity, sow_date, harvest_date, harvest_volume, price, total_amt FROM plant_diary WHERE user_id =$user_id ORDER BY name;";

$sql = rtrim($sql, ',');

//$grand ="SELECT SUM(quantity), SUM(harvest_volume), SUM(total_amt) FROM `plant_diary`";
//$grand =rtrim($grand, ',');

if($result = $conn->query($sql))
{	
	$rows = array();
	
	while($row = $result->fetch_assoc())
	{
		$rows[] = $row; 
	}	
	echo json_encode($rows);
}

$conn->close();