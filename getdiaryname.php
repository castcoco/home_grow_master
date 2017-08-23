<?php

include_once("connection.php");
require_once("headfile.php");

//converting db values into json
header('Content-type:application/json');

$user_id = $_SESSION['user_id'];

$sql = "SELECT DISTINCT diary_name FROM `plant_diary` WHERE user_id =$user_id;";

$sql =rtrim($sql,',');

var_dump($sql);

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