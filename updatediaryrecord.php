<?php
//connect to database
require_once("connection.php");
require_once("headfile.php");
/* 
$user_id = $_SESSION['user_id'];
$id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
$name = filter_var($_POST["plantName2"], FILTER_SANITIZE_STRING);
$quantity = filter_var($_POST["pQty2"], FILTER_SANITIZE_STRING);
$sow_date = filter_var($_POST["datepicker_sow2"], FILTER_SANITIZE_STRING);
$harvest_date = filter_var($_POST["datepicker_harvest2"], FILTER_SANITIZE_STRING);	
$harvest_volume = filter_var($_POST["pVol2"], FILTER_SANITIZE_STRING);
$price = filter_var($_POST["pPrice2"], FILTER_SANITIZE_STRING);
$total_amt = filter_var($_POST["total2"], FILTER_SANITIZE_STRING);	
$diary_name = filter_var($_POST["diary_name2"], FILTER_SANITIZE_STRING);  */
	
$response = array();
//var_dump($_POST);

//if (isset($_POST['data']))
if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['quantity']) && isset($_POST['sow_date']) && isset($_POST['harvest_date']) && isset($_POST['harvest_volume']) && isset($_POST['price']) && isset($_POST['total_amt']) && isset($_POST['diary_name']))
{
	if($_SERVER['REQUEST_METHOD'] ==='POST'){
		if(isset($_POST['submit'])){
	// get id from url	 
		$name = filter_var($_POST["plantName2"], FILTER_SANITIZE_STRING);
		$quantity = filter_var($_POST["pQty2"], FILTER_SANITIZE_STRING);
		$sow_date = filter_var($_POST["datepicker_sow2"], FILTER_SANITIZE_STRING);
		$harvest_date = filter_var($_POST["datepicker_harvest2"], FILTER_SANITIZE_STRING);	
		$harvest_volume = filter_var($_POST["pVol2"], FILTER_SANITIZE_STRING);
		$price = filter_var($_POST["pPrice2"], FILTER_SANITIZE_STRING);
		$total_amt = filter_var($_POST["total2"], FILTER_SANITIZE_STRING);	
		$diary_name = filter_var($_POST["diary_name2"], FILTER_SANITIZE_STRING); 
		
		$sql = "UPDATE plant_diary SET `name`= '" .$name."', `quantity`= '" .$quantity."', `sow_date`= '" .$sow_date."', `harvest_date`= '" .$harvest_date."', 
				`harvest_volume`= '" .$harvest_volume."', `price` = '" .$price."', `total_amt` ='" .$total_amt."', `diary_name`= '" .$diary_name."' WHERE `id`= '" .$id. "' AND `user_id` = '" . $_SESSION['user_id']."'";
		$sql = rtrim($sql, ',');
	
	
		var_dump($_POST);
		echo $sql;
	
	// @UPDATE plant_diary SET `name`= '". $name . "' ......
	
		if($result = $conn->query($sql))
		{
			$response['success'] = 1;
			$response['message'] = "record is updated";
			 echo json_encode($response);
			header('Location: /harvest_diary.html');
		}
		else
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	
		exit;
		}
	}
	
}
echo "No data";

