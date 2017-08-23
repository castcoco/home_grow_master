<?php
	require_once("connection.php");
	//cookie setting
	$cookie_name = "loggedin";
	
	//session_start();
	//if(isset($_SESSION['signUser']) && $_SESSION['signUser']!=''){
	//	header("location:index.php");
	//}
	
	$username = mysqli_real_escape_string($conn, trim($_POST['signUser']));
	$password = mysqli_real_escape_string($conn, trim(md5($_POST['signPwd'])));
	$email = mysqli_real_escape_string($conn, trim($_POST['signEmail']));

	//validation, if js is not available
	if (empty($username) || empty($email) || empty($password))
	{
		echo "please fill in all fields!!";
		exit();
	}
	
	//validation
	/* $dupname = "SELECT username FROM users WHERE username = $username";
	$dupname = rtrim($dupname, ',');
	$result = $conn->query(dupname); */
		
	if ($result->num_rows == 1)
	{
		echo "Username $username is existed already!";
		
	}
	else
	{
	$sql = "INSERT INTO `users`(`username`, `pwd`, `email`)VALUES('$username','$password','$email')";
	
		if ($conn->query($sql) === TRUE) {
			header('Location:index.html');
			//echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	
	}

