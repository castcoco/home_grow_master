<?php
require_once("headfile.php");

if(isset($_FILES['attachments'])){
	//echo "<PRE>";
	//var_dump($_FILES);
	
	//declare msg
	$msg = "";
	
	//upload files to upload dir
	$targetFile = "uploads/".basename($_FILES['attachments']['name'][0]);
	
	//connect to database
	require_once("connection.php");

	if(file_exists($targetFile))
		//echo "The file $targetFile exists";
		$msg = array("status" =>0, "msg" => "File already exists!");
	else if(move_uploaded_file($_FILES['attachments']['tmp_name'][0], $targetFile))
		$msg = array ("status" =>1, "msg" =>"File has been uploaded" , "path" => $targetFile);
		//echo "new record created successfully";
		
	exit(json_encode($msg));
	}
?>