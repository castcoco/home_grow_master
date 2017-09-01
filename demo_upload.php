<?php

//include connection file
//include_once("connection.php");

echo 'done';

$output ='' ;

if(isset($_FILES['file']['name'][0]))
{
	echo 'OK';
	foreach($_FILES['file']['name'] as $key => $values)
	{
		if(uploaded_fileMoved($_FILES['file']['temp_name'][$keys]), 'upload/'.$values)
		{
				$output .= '<img src="upload/'.$values.">'
		}
	}
}
echo $output;

?>