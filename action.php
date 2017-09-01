<?
//for login

//connection
require_once("connection.php");



$username = $_POST['username'];
$password = $_POST['password'];

var_dump($_POST);
exit();

if(isset($_POST["username"]))
{
	$query = "
	SELECT * FROM users
	WHERE username = '".$POST["username"]."'
	AND pwd = '".$POST["password"]."'
	";
	$result = mysqli_query($connect,$query);
	if(mysqli_num_rows($result)>0)
	{
		$_SESSION['username']=$_POST['username'];
		echo 'YES';
	}
	else{
		echo 'no'
	}
	
}
	
	//exit();
} 
