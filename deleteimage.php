<?php
//connect to database
require_once("connection.php");
require_once("headfile.php");

$user_id = $_SESSION['user_id'];

if (isset($_GET['product_id']))
{
	// get id from url
	$id = $_GET['product_id'];
	$sql = "DELETE FROM photo WHERE id=$id AND `user_id`=$user_id";
	$sql = rtrim($sql, ',');
}

$query1 = "SELECT `path` FROM photo WHERE `id`=$id";  //get image id

if($imagetodelete = $conn->query($query1))
{	
	// var_dump($imagetodelete);
	while($row = $imagetodelete->fetch_assoc())
	{
		//echo $row['path'];
		//var_dump($row);
		unlink($row['path']);   // delete image from server
	}
	
}
if($result = $conn->query($sql))
{
    header('Location: /gallery.html');
}
else
{
    echo "Error: " . $sql . "<br>" . $conn->error;
}
