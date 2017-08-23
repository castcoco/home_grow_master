<?
//cookie setting
$cookie_name = "loggedin";
if (isset($_COOKIE[$cookie_name]))
{
	$cookie_value - $COOKIE[$cookie_name];
	echo 'welcome to here $cookie_value!';
	echo '<a href="logout.php"></a>';
}

//<?
//logout page
//setcookie("loggedin", "val", "time()" - (120) "/");
//header("Location:index.php");
//

?>

