<?php
include('connection.php');


$email = $connection->mysqli_real_escape_string($_POST['email']);

$data = $connection->query("");


?>