<?php
require_once("connection.php");

header('Content-type:application/json');

	$search = isset($_GET['search']) ? $_GET['search'] : '';
	htmlspecialchars($search);

	//echo $_GET['sunlightMenu'];
	//echo $_GET['soilMenu'];
	//exit();
	
if(isset($_GET['search'])){	
	
	$sql = "SELECT `path`, `common_name`,`variety_name`, `sun_type`, soil_type FROM plants WHERE common_name COLLATE UTF8_GENERAL_CI LIKE '%".$search."%' GROUP BY `common_name`";

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
	$sql = "";
	
	
if (isset($_GET['sunlightMenu']) && isset($_GET['soilMenu']))
{
	
	$sql = 'SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`=  "' . $sunval . '" AND `soil_type` = "' . $soilval . '";';
	
}	
elseif ((!empty($sunval)) && ($soilval === NULL)) {

	//var_dump($sunval);
	$sql = 'SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `sun_type`= "' . $sunval . '";';
	
	
}
elseif ((!empty($soilval)) && ($sunval === NULL))
{
	$sql = 'SELECT `path`, `common_name`, `variety_name`, `soil_type`, `season` FROM `plants` WHERE `soil_type`= "' . $soilval . '";';
	
	
}
else {
	$sql = "empty";
};

runQuery($conn, $sql);	

function runQuery($conn, $sql) {
	if($sql != "" && $sql != "empty") {
		$result = $conn->query($sql);
		//var_dump($result);
		
		if($result->num_rows > 0 ) {
			$soils = array();
			if ($result->num_rows ==1)
			{
				$soils[0] = $result->fetch_assoc();
			}
			elseif ($result->num_rows > 1 )
			{
				while($soil = $result->fetch_assoc())
					{
						$soils[] = $soil; 			
					}	
			}
			echo json_encode($soils);
			exit();
		} else {
			echo json_encode("empty");
		}
	} else {
		echo json_encode("error");
	}
}
	
	
