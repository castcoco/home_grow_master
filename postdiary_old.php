<?php

require_once("connection.php");
require_once("headfile.php");

//var_dump($_POST);
//exit;

/* if ($_POST){
	$name = filter_var($_POST["plantName"], FILTER_SANITIZE_STRING);
	$quantity = filter_var($_POST["pQty"], FILTER_SANITIZE_STRING);
	$sow_date = filter_var($_POST["datepicker_sow"], FILTER_SANITIZE_STRING);	
	$harvest_date = filter_var($_POST["datepicker_harvest"], FILTER_SANITIZE_STRING);	
	$harvest_volume = filter_var($_POST["pVol"], FILTER_SANITIZE_STRING);
	$price = filter_var($_POST["pPrice"], FILTER_SANITIZE_STRING);	
	$total_amt = filter_var($_POST["total"], FILTER_SANITIZE_STRING);	
	$diary_name = filter_var($_POST["diary_name"], FILTER_SANITIZE_STRING);	
	
	$user_id = "1"; // filter_var($_POST["user_id"], FILTER_SANITIZE_STRING);
	//$user_id = $_SESSION['user_id'];	
	
$sql = "INSERT INTO plant_diary (name, quantity, sow_date, harvest_date, harvest_volume, price, total_amt,`diary_name`, `user_id`) VALUES";

$sql .= sprintf(" ('%s', %d, '%s', '%s', '%0.2f', '%0.2f', '%0.2f', '%s', %d),", 
		$name, $quantity, $sow_date, $harvest_date, $harvest_volume, $price,
		$total_amt, $diary_name, $user_id);
 */
 
$user_id = $_SESSION['user_id'];	

$sql = "INSERT INTO plant_diary (`name`, `quantity`, `sow_date`, `harvest_date`, `harvest_volume`, `price`, `total_amt`, `diary_name`, `user_id`) VALUES";


foreach($_POST['data'] as $harvest) {
	
$sql .= sprintf(" ('%s', %d, '%s', '%s', '%0.2f', '%0.2f', '%0.2f', '%s', %d),", 
		$harvest['name'], $harvest['quantity'], $harvest['sow_date'], 
		$harvest['harvest_date'], $harvest['harvest_volume'], $harvest['price'], 
		$harvest['total_amt'], $harvest['diary_name'], $user_id) ;
	
	//var_dump($sql);
	$sql = rtrim($sql, ','); 
 
	var_dump($sql);

	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
}	
$conn->close();
	
// } else {
	
//	echo "No data";
//}

