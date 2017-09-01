<?php

//connect to database
require_once("connection.php");
require_once("headfile.php");

$user_id = $_SESSION['user_id'];
//$diary_name = $_POST['diary_name'];

$sql = "INSERT INTO plant_diary (`name`, `quantity`, `sow_date`, `harvest_date`, `harvest_volume`, `price`, `total_amt`, `diary_name`, `user_id`) VALUES";

foreach($_POST['data'] as $harvestdata) {
	
$sql .= sprintf(" ('%s', %d, '%s', '%s', '%0.2f', '%0.2f', '%0.2f', '%s', %d),", 
	//$name, $quantity, $sow_date, $harvest_date, $harvest_volume, $price, $total_amt);
	$harvestdata['name'],$harvestdata['quantity'],$harvestdata['sow_date'],
	$harvestdata['harvest_date'],$harvestdata['harvest_volume'], $harvestdata['price'],
	$harvestdata['total_amt'],$harvestdata['diary_name'] , $user_id);
}
	
//print_r( $harvestdata );

$sql = rtrim($sql, ',');

// echo $sql;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();