<?php
require_once("connection.php");
require_once("headfile.php");

//converting db values into json
header('Content-type:application/json');

$user_id = $_SESSION['user_id'];

$sql = "SELECT * FROM `photo` WHERE user_id = $_SESSION['user_id'];"; 
//$result = mysqli_query($sql) or exit('could not be executed!');
$sql = rtrim($sql, ',');

if($result = $conn->query($sql))
{	
	$rows = array();
	//while($row = mysql_fetch_assoc($result))
	while($row = $result->fetch_assoc())
	{
		$rows[] = $row; 
		//$rows[] = array('$name'=>$row['$name']);
	}
	
	echo json_encode($rows);
	
}

$conn->close();