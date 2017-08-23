<?php
//connect to database
require_once("connection.php");
require_once("headfile.php");

/* $user_id = $_SESSION['user_id'];
$id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
$name = filter_var($_POST["plantName"], FILTER_SANITIZE_STRING);
$quantity = filter_var($_POST["pQty"], FILTER_SANITIZE_STRING);
$sow_date = filter_var($_POST["datepicker_sow"], FILTER_SANITIZE_STRING);
$harvest_date = filter_var($_POST["datepicker_harvest"], FILTER_SANITIZE_STRING);	
$harvest_volume = filter_var($_POST["pVol"], FILTER_SANITIZE_STRING);
$price = filter_var($_POST["pPrice"], FILTER_SANITIZE_STRING);
$total_amt = filter_var($_POST["total"], FILTER_SANITIZE_STRING);	
$diary_name = filter_var($_POST["diary_name"], FILTER_SANITIZE_STRING);	 */

if (isset($_GET['id']))
{
	// get id from url
	$id = $_GET['id'];
	
	$sql = "UPDATE plant_diary SET '".$name."', '".$quantity."', '".$sow_date."', '".$harvest_date."', 
	   '".$harvest_volume."', '".$price."', '".$price."', '".$total_amt."', '".$diary_name."') WHERE `id`=$id";
	$sql = rtrim($sql, ',');
	var_dump($sql);
	
}
if($result = $conn->query($sql))
{
    header('Location: /harvest_diary.html');
}
else
{
    echo "Error: " . $sql . "<br>" . $conn->error;
}
