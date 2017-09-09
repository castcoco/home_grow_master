<?php
	include_once("connection.php");
	
	session_start();
	//cookie setting
	$cookie_name = "loggedin";
	
	$username = mysqli_real_escape_string($conn, trim($_POST['username']));

	$password = mysqli_real_escape_string($conn, trim(($_POST['password'])));
	
	$password_encrypted = password_hash($password, PASSWORD_DEFAULT); 
	var_dump($password_encrypted);

	$sql = "SELECT `username`, `password` FROM users WHERE (`username` = '$username')";
	$sql = rtrim($sql, ',');
	$result = $conn->query($sql);
	
	if ($result->num_rows == 1)
	{
		$user = $result->fetch_assoc();
		
		$_SESSION['user_id'] = $user['id'];
		$_SESSION['username'] = $user['username'];
		if (password_verify($password, $user["password"]))
		{
			echo 'success';
		}
		else
		{
			echo 'fail!';	

		}
		setcookie("loggedin", 'true');
		header('Location: /index.html');
				
	}
	else
	{
		echo "Login fail! Please try again!";
		exit;
	} 
		//validate
	
	if (empty($username) || empty($password))
	{
		echo "username and password are missing!!";
		//header('Location: /index.html#');
		exit();
	}	
	
	
	$conn->close();
	
?>
