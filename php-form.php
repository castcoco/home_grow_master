<?php
$servername = "localhost";
$username = "root";
$password = "James0505!";
$dbname = "home_grow";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	
	
$sql = "INSERT INTO garden(id, name, user_id, `width`, `length`, `garden_type`) VALUES";


foreach($_POST['formSave'] as $formData)
{
	// $varName = $_POST['garName'];
	// $varType = $_POST['garType'];
	// $varWidth = $_POST['widthMenu'];
	// $varLength = $_POST['lengthMenu'];
	// $errorMessage = "";
	
	$sql .= sprintf("('%s', '%s', '%s', %d,  %d, '%s'),", 
	$formData['id'], $formData['name'], $formData['user_id'], $formData['width'], $formData['length'], $formData['garden_type']) ;

}
print_r( $formData );

}

$sql = rtrim($sql, ',');

// echo $sql;
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();