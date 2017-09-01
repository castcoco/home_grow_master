<?

//cookie setting
$cookie_name = "loggedin";
require_once("connection.php");

function newUser()
{
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $POST['password'];
	
	$sql = "INSERT INTO users(username, pwd, email)VALUES";
	
	$sql .= sprintf(" ('%s', '%s', '%s'),", 
			$username, $password, $email);
	
	//$data = mysql_query ($sql) or die(mysql_error());
	//if ($data)
	if($conn->query($sql) === false){
		$msg = array("status" =>2, "msg" => "Error! Could not save to the database!", 
		"error" =>$conn->error);
	{
		echo "Registraton is completed";
	}
}

function signUp()
{
	$msg = "";
	if(!empty($_POST['username'])) //check the user name in the form is empty or not
	{
		$query = mysql("SELECT * FROM users WHERE username ='$_POST['username'] AND email=$_POST['email'] AND pwd=$_POST['password']") or die(mysql_error());
		
/* 		if($conn->query($sql) === false){
			$msg = array("status" =>2, "msg" => "Error! Could not save to the database!", 
			"error" =>$conn->error);
			newUser();
		} */
		
		if (!$row = mysql_fetch_array($query) or die(mysql_error())
		{
			newUser();
		}
		else
		{
			echo "You have already registered"
		}		
	}
}

if(isset($_POST['submit']))
{
	signUp();
}
