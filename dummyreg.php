<?php
	require_once("connection.php");
	
	$username = trim($_POST["username"]);
	$password = trim(md5($_POST["password"]));
	$email = trim($_POST["email"]);

	//validation, if js is not available
	if (empty($username) || empty($email) || empty($pwd))
	{
		echo "please fill in all fields!!";
		exit();
	}
	
	//validation
	$result = $conn->query("SELECT username FROM users WHERE username ='$username'");
	$row = mysql_fetch_row($result);
	
	if( $row > 0 )
	{
		echo "Username $username is existed already!";	
	}
	else
	{
	$sql = "INSERT INTO `users`(`username`, `pwd`, `email`)VALUES('$username','$password','$email')";
	
		if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	
	}

