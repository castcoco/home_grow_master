<?php

if ( 'localhost' == $_SERVER['SERVER_NAME'] ) {
	
	$servername = "localhost";
	$username = "root";
	$password = "James0505!";
	$dbname = "home_grow";
}

if ( in_array($_SERVER['SERVER_NAME'], array('homegrowmaster.com','www.homegrowmaster.com')) ) {
	
	$servername = "localhost";
	$username = "mangomag_home_grow";
	$password = "C0c0C0c0C0c0!";
	$dbname = "mangomag_home_grow";
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	exit();
}

