<?php
//cookie setting
$cookie_name = "loggedin";

//include connection file
include_once("connection.php");
// session starts
session_start();

if(isset($_POST['loginButton']))
{
	$username = trim($_POST['username']);
	//$email = trim($_POST['email']);
	$password = md5($pwd);
	
	try
	{
	$stmt = $db_con->prepare("SELECT * FROM users WHERE username=:username");
	$stmt->execute(array(":email"=>$user_email));
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	$count = $stmt->rowCount();
   
   if($row['pwd']==$password){
    
    echo "you sucessfully login"; // log in
    $_SESSION['user_session'] = $row['id'];
   }
   else{
    
    echo "email or password does not exist."; // wrong information
   }
    
  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
 }

//$conn->close();