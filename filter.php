<?php
require_once("connection.php");

//if(isset($_GET['search'])){
	$search = $_GET['search'];
	echo $search;
	//$sql = '%'.$search. '%';
	$sql = "SELECT `common_name`,`variety_name` FROM plants WHERE common_name COLLATE UTF8_GENERAL_CI LIKE '%".$search."%' ";
	//$sql = "SELECT * FROM plants WHERE common_name COLLATE utf8_general_ci = $search";

	$result = rtrim($sql, ',');
	$result = $conn->query($sql);
	//var_dump($result);
//}

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
}

//sun



//}	
/* {
	if ($result->num_rows == 1)
	{
		$plant = $result->fetch_assoc();			
	}
	else 
	{
		$plants = array();
		while($plant = $result->fetch_assoc())
		{
		$plants[] = $plant ;
		}	
		//echo json_encode($plants);
	}
	echo " We have found '$result->num_rows' products that match your search!";
	echo json_encode($plant);
	echo json_encode($plant);
	var_dump($result);
}	 */