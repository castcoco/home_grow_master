<?php

session_start();
require_once("connection.php");
require_once("headfile.php");

/* if (!isset($_SESSION['user_id']) || is_null($_SESSION['user_id']) ) {
	header('Location: /logout.php');
	exit;
}
 */
if (!isset($_SESSION['garden_id'])) {
		echo 'No garden id';
		exit;
}

$garden_id = $_SESSION['garden_id'];
$deletesql = "DELETE FROM garden_items WHERE `garden_id`=$garden_id";
if ($conn->query($deletesql) === TRUE) {
	
    echo "New record created successfully";
} else {
    echo "Error: " . $deletesql . "<br>" . $conn->error;
}

//echo 'coco';
//var_dump($_SESSION);
//exit;

$sql = "INSERT INTO garden_items (type, height, width, top, bottom, `left`, `right`, `garden_id`) VALUES";

foreach($_POST['data'] as $plant) {
	
$sql .= sprintf(" ('%s', '%s', '%s', '%s', '%s', '%s', '%s', %d),", 
	$plant['type'], $plant['height'], $plant['width'], $plant['top'], $plant['bottom'], $plant['left'], $plant['right'], $garden_id) ;

	
//print_r( $plant );

}

$sql = rtrim($sql, ',');

// echo $sql;

if ($conn->query($sql) === TRUE) {
	
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();