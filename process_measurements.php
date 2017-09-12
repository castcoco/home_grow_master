<?php

session_start();
require_once("connection.php");

//print_r($_POST);
//var_dump($_SESSION);
//exit;

if (!isset($_SESSION['user_id']) || is_null($_SESSION['user_id']) ) {
	header('Location: /logout.php');
	exit;
}

if ($_POST){
	$name = filter_var($_POST["garName"], FILTER_SANITIZE_STRING);
	//$user_id = filter_var($_POST["user_id"], FILTER_SANITIZE_STRING);
	$user_id = $_SESSION['user_id'];
	$width = filter_var($_POST["widthMenu"], FILTER_SANITIZE_STRING);
	$length = filter_var($_POST["lengthMenu"], FILTER_SANITIZE_STRING);
	
$sql = "INSERT INTO gardens (name, user_id, width, length) VALUES";
	
$sql .= sprintf(" ('%s', %d, %d, %d),", 
	$name, $user_id, $width, $length);

}	
//print_r( $gardens );

$sql = rtrim($sql, ',');

// echo $sql;
$result = $conn->query($sql);

if ($result === TRUE) {
	
	$_SESSION['garden_id'] = $conn->insert_id;
	
	//echo $_SESSION['garden_id'];
	//exit;
	
	header('Location:gardenplan.html');
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

