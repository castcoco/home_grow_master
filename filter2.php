<?php
require_once("connection.php");


	//isset($_GET['sunlightMenu']);
	$val = $_GET['sunlightMenu'];
	echo $val ;
	echo "<br>";
	
	$sql = "SELECT common_name FROM `plants` WHERE `sun_type`= $val;";
	//SELECT common_name FROM home_grow.plants WHERE `sun_type` = 'Full';
	//$result = rtrim($sql, ',');
	
	$result = $conn->query($sql);
	var_dump($sql);
	var_dump($result);

if ($result->num_rows == 0)
{
	echo "no information is found";
}
else
{
	if($result->num_rows >= 1 )
	{	
		$plants = array();
		while($plant = $result->fetch_assoc())
		{
			$plants[] = $plant; 
		}	
	}
	echo " We have found '$result->num_rows' products that match your search!";
	echo json_encode($plants);
	exit();
}
