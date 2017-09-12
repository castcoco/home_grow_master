<?php

include_once("connection.php");
require_once("headfile.php");

//converting db values into json
header("Content-type:application/json");


$response = array();
//var_dump($_POST);
//if (isset($_POST['data']))
if (isset($_POST['id2']) && isset($_POST['plantName2']) && isset($_POST['pQty2']) && isset($_POST['datepicker_sow2']) && isset($_POST['datepicker_harvest2']) && isset($_POST['pVol2']) && isset($_POST['pPrice2']) && isset($_POST['total2'])) {
    // var_dump($_POST);
    // get id from url	 
    $id = filter_var($_POST["id2"], FILTER_SANITIZE_STRING);
    $name = filter_var($_POST["plantName2"], FILTER_SANITIZE_STRING);
    $quantity = filter_var($_POST["pQty2"], FILTER_SANITIZE_STRING);
    $sow_date = filter_var($_POST["datepicker_sow2"], FILTER_SANITIZE_STRING);
    $harvest_date = filter_var($_POST["datepicker_harvest2"], FILTER_SANITIZE_STRING);
    $harvest_volume = filter_var($_POST["pVol2"], FILTER_SANITIZE_STRING);
    $price = filter_var($_POST["pPrice2"], FILTER_SANITIZE_STRING);
    $total_amt = filter_var($_POST["total2"], FILTER_SANITIZE_STRING);


    $sql = "UPDATE plant_diary SET `name`= '" . $name . "', `quantity`= '" . $quantity . "', `sow_date`= '" . $sow_date . "', `harvest_date`= '" . $harvest_date . "', 
				`harvest_volume`= '" . $harvest_volume . "', `price` = '" . $price . "', `total_amt` ='" . $total_amt . "' WHERE `id`= '" . $id . "' AND `user_id` = '" . $_SESSION['user_id'] . "'";
    $sql = rtrim($sql, ',');


    // @UPDATE plant_diary SET `name`= '". $name . "' ......

    if ($result = $conn->query($sql)) {
        $response['success'] = true;
        $response['message'] = "record is updated";
        echo json_encode($response['message']);
        //header('Location: /harvest_diary.html');
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "No data";
}