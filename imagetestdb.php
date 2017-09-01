<?php

//connect to database
require_once("connection.php");
require_once("headfile.php");

if(isset($_FILES['attachments'])){
	//echo "<PRE>";
	//var_dump($_FILES);
	
	//declare msg
	$msg = "";
	$user_id = $_SESSION['user_id'];
	
	
	//upload files to upload dir
	$targetFile = "uploads/".basename($_FILES['attachments']['name'][0]);
	
	if(file_exists($targetFile))
		$msg = array("status" =>0, "msg" => "File already exists!");
	else if(move_uploaded_file($_FILES['attachments']['tmp_name'][0], $targetFile))
		$msg = array ("status" =>1, "msg" =>"File has been uploaded" , "path" => $targetFile);		   
    
	$sql = sprintf("INSERT INTO photo (path, user_id) VALUES('%s', %d )", $targetFile, $user_id );

    
    if ($conn->query($sql) === false) {
	   $msg = array ("status" =>2, "msg" =>"Error: Could not save to the database" , "error" => $conn->error);
        
    }
    
	exit(json_encode($msg));
}
$conn->close();