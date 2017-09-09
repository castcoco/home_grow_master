<?php

include_once("connection.php");
require_once("headfile.php");

//converting db values into json
header("Content-type:application/json");

// Check that user id is set
if(isset($_SESSION['user_id'])) {
	$user_id = $_SESSION['user_id'];
	
	// Check that data has been sent by the ajax request
	if (isset($_GET['id2'])){
		
		$diary_name = $_GET['id2'];

		$sql = 'SELECT `id`, `name`, `quantity`, `sow_date`, `harvest_date`, `harvest_volume`, `price`, `total_amt` FROM `plant_diary` WHERE `diary_name` = "' . $diary_name . '" AND `user_id` = ' . $user_id . ' ORDER BY `name`;';	
		$sql = rtrim($sql, ',');
		
		if($result = $conn->query($sql)) {	
			
			$rows = array();
			
			while($row = $result->fetch_assoc())
			{
				$rows[] = $row; 
			}

			// return db results
			echo json_encode($rows);

		} else {
			// return some text and handle fail in ajax success function
			echo json_encode("FAIL1");
		}	

	} else {
		// return some text and handle fail in ajax success function
		echo json_encode("FAIL2");
	}

	$conn->close(); 
} else {
	// return some text and handle fail in ajax success function
	echo json_encode("FAIL3");
}




