<?php

if ( 'localhost' == $_SERVER['SERVER_NAME'] ) {
	
	$servername = "localhost";
	$username = "root";
	$password = "James0505!";
	$dbname = "home_grow";
	
} else {

//if ( $_SERVER['SERVER_NAME'] == ('http://35.177.243.135')) ) {
	
	$servername = "localhost";
	$username = "hgm_web_app";
	$password = "C0c0C0c0C0c0!";
	$dbname = "homegrowmaster";
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	exit();
}

//$conn->close();