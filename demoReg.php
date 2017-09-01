<?
//cookie setting
$cookie_name = "loggedin";

include("connection.php")

/* 

session_start();
$username=$_POST["signUser"];
$password=$_POST["signpwd"];
$email=$_POST["signEmail"]; */

if (isset($_POST['login']))
{

	$user = filter_var($_POST["username"], FILTER_SANITIZE_STRING);
	$pass= filter_var($_POST["password"], FILTER_SANITIZE_STRING);
	
	$phash = sha1(sha1($password."salt")."salt");   
	
	$sql = "SELECT * FROM users WHERE username = '$username' AND pwd ='$phash';";
	
	$result = mysqli_query($conn, $sql);
	$count = mysqli_num_rows($result);
	echo json_encode($result);
	if($count == 1)
	{
		$cookie_value = $username;
		setcookie($cookie_name, $cookie_value, time()+ (120), "/")
		while($row=mysqli_fetch_array($result)){
			$_SESSION['id'] = $row['id'];
		$response = array('success' => true, 'message' => 'Login successful');
		
		echo json_encode($response);
	}
	else
	{
		$response = array('success' => false, 'message' => 'Login fail');
		echo "Username or password is incorrect"
	}
}
else if(isset($_POST['register'))
	{

	$username = filter_var($_POST["signUser"], FILTER_SANITIZE_STRING);
	$password= filter_var($_POST["signpwd"], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST["widthMenu"], FILTER_SANITIZE_STRING);

	//security 
	$phash = sha1(sha1($password."salt")."salt");  
	
	$sql = "INSERT INTO users(username, pwd , email) VALUES";
	$sql.= sprintf(" ('%s', '%s', '%s'),"
			($username, $phash, $email);
	
	//$result = mysqli_query($conn, $sql);
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

}



?>