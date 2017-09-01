<?php
require_once("connection.php");

header('Content-type:application/json');

	$search = isset($_GET['search']) ? $_GET['search'] : '';
	htmlspecialchars($search);

	//echo $_GET['sunlightMenu'];
	//echo $_GET['soilMenu'];
	//exit();
	
if(isset($_GET['search'])){	
	//echo htmlspecialchars($search);
	//echo "<br>";
	//$sql = '%'.$search. '%';
	$sql = "SELECT `path`, `common_name`,`variety_name`, `sun_type`, soil_type FROM plants WHERE common_name COLLATE UTF8_GENERAL_CI LIKE '%".$search."%' ";
	//$sql = "SELECT * FROM plants WHERE common_name COLLATE utf8_general_ci = $search";
	//$sql1 = "SELECT * FROM `plant_image` WHERE variety_id =$variety_id;"; 
	$result = rtrim($sql, ',');
	//echo htmlspecialchars($result);
	
	$result = $conn->query($sql);
	//var_dump($result);

	$plants = array();
	
if ($result->num_rows == 1)
	{
	//echo "$result->num_rows' result match your search!";
	
	$plants[0] = $result->fetch_assoc();
	//var_dump($result);
	}
	elseif ($result->num_rows > 1 )
		{	
			
			//echo "We have found '$result->num_rows' products that match your search!";
			
			while($plant = $result->fetch_assoc())
			{
				$plants[] = $plant; 			
			}	
				
		}
	else
		//if($result->num_rows == 0 )
		{
			//echo "$result->num_rows' is found";
			
		}
	
	echo json_encode($plants);
	exit();
}	
//search sunlight 
	//$sunval = isset($_GET['sunlightMenu']);
	//$soilval = isset($_GET['soilMenu']);
	//$catval = isset($_GET['typeMenu']);
	//$seasonval = isset($_GET['seasonMenu']);
	//var_dump($_GET);
	//$where = array();
	
if (isset($_GET['sunlightMenu']) && isset($_GET['soilMenu']))
{
	$sunval = isset($_GET['sunlightMenu']);
	//var_dump($sunval);
	$soilval = isset($_GET['soilMenu']);
	
	$sql2 = "SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`= $sunval AND `soil_type` =$soilval;";
}	
elseif ((!empty($sunval)) && ($soilval === NULL))
{
	$sql2 = "SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`= $sunval;";
	$result2 = rtrim($sql2, ',');
		
}
elseif ((!empty($soilval)) && ($sunval === NULL))
{
	$sql3 = "SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `soil_type`= $soilval;";
}
else {
	echo "please submit the search term";
};	
	
	//if(isset($_GET['soilvalue'])){
	//echo ($sunval);
	//$sql2 = "SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`= $sunval;";
	//$sql2 = "SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`= $sunval AND `soil_type` =$soilval;";

	$result2 = rtrim($sql2, ',');
	$result2 = $conn->query($sql2);
	//var_dump($result2);
	$suns = array();
	
	if ($result2->num_rows ==1)
	{
		$suns[0] = $result->fetch_assoc();
	}
	elseif ($result2->num_rows > 1 )
	{
		while($sun = $result->fetch_assoc())
			{
				$suns[] = $sun; 			
			}	
	}else
	{
		
	}
	
	$result3 = rtrim($sql3, ',');
	$result3 = $conn->query($sql3);
	//var_dump($result3);
	$soils = array();
	if ($result3->num_rows ==1)
	{
		$soils[0] = $result->fetch_assoc();
	}
	elseif ($result3->num_rows > 1 )
	{
		while($soil = $result3->fetch_assoc())
			{
				$soils[] = $soil; 			
			}	
	}else
	{
		
	}
	echo json_encode($suns);
	exit();
//}
