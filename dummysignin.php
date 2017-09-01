<?php
	include_once("connection.php");
	
	session_start();
	//cookie setting
	$cookie_name = "loggedin";
	
	$username = mysqli_real_escape_string($conn, trim($_POST['username']));
	$password = mysqli_real_escape_string($conn, trim(md5($_POST['password'])));
	//validate
	if (empty($username) || empty($password))
	{
		//echo "username and password are missing!!";
		header('Location: /index.html#');
		exit();
	}
	
	$sql = "SELECT id,username,email FROM users WHERE (`username` = '$username' AND `pwd` ='$password')";
	$sql = rtrim($sql, ',');
	$result = $conn->query($sql);
	
	if ($result->num_rows == 1)
	{
		$user = $result->fetch_assoc();
		
		$_SESSION['user_id'] = $user['id'];
		$_SESSION['username'] = $user['username'];
		
		setcookie("loggedin", 'true');
		header('Location: index.html');
				
	}
	else
	{
		echo "Login fail! Please try again!";
	} 
	$conn->close();
	
?>
