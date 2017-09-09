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
	$sql = "SELECT `path`, `common_name`,`variety_name`, `sun_type`, soil_type FROM plants WHERE common_name COLLATE UTF8_GENERAL_CI LIKE '%".$search."%' GROUP BY `common_name`";
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
	$sunval = isset($_GET['sunlightMenu']) ? $_GET['sunlightMenu'] : NULL;
	$soilval = isset($_GET['soilMenu']) ? $_GET['soilMenu'] : NULL;
	//var_dump($_GET);
	
	
	
if (isset($_GET['sunlightMenu']) && isset($_GET['soilMenu']))
{
	
	$sql5 = 'SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`=  "' . $sunval . '" AND `soil_type` = "' . $soilval . '";';
	
	$result5 = $conn->query($sql5);
	
	$alls=array();
	
	if ($result5->num_rows==1)
	{
		$alls[0] = $result5->fetch_assoc();
	}
	elseif ($result5->num_rows >1)
	{
		while ($all = $result5->fetch_assoc())
		{
			$alls[] = $all;
		}
	}else
	{
		
	}
	echo json_encode($alls);
	exit();
}	
elseif ((!empty($sunval)) && ($soilval === NULL)) {

	//var_dump($sunval);
	$sql2 = 'SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`= "' . $sunval . '";';
	
	$result2 = $conn->query($sql2);
	//var_dump($result2);
	$suns = array();
	
	if ($result2->num_rows ==1)
	{
		$suns[0] = $result2->fetch_assoc();
	}
	elseif ($result2->num_rows > 1 )
	{
		while($sun = $result2->fetch_assoc())
			{
				$suns[] = $sun; 			
			}	
	}else
	{
		
	}
	echo json_encode($suns);
	exit();
}
elseif ((!empty($soilval)) && ($sunval === NULL))
{
	$sql3 = 'SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `soil_type`= "' . $soilval . '";';
	
	$result3 = $conn->query($sql3);
	//var_dump($result3);
	
	if($result3) {
		$soils = array();
		if ($result3->num_rows ==1)
		{
			$soils[0] = $result3->fetch_assoc();
		}
		elseif ($result3->num_rows > 1 )
		{
			while($soil = $result3->fetch_assoc())
				{
					$soils[] = $soil; 			
				}	
		}
		echo json_encode($soils);
		exit();
	} else {
		echo "empty";
	}
}
else {
	echo "please submit the search term";
};	

function runQuery($sql) {
	$result3 = $conn->query($sql);
	//var_dump($result3);
	
	if($result3) {
		$soils = array();
		if ($result3->num_rows ==1)
		{
			$soils[0] = $result3->fetch_assoc();
		}
		elseif ($result3->num_rows > 1 )
		{
			while($soil = $result3->fetch_assoc())
				{
					$soils[] = $soil; 			
				}	
		}
		echo json_encode($soils);
		exit();
	} else {
		echo "empty";
	}
}
	
	
