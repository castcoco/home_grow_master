<?php

include_once("connection.php");

session_start();

//cookie setting
$cookie_name = "loggedin";

$username = mysqli_real_escape_string($conn, trim($_POST['username']));
$password = mysqli_real_escape_string($conn, trim(($_POST['password'])));

$sql = "SELECT id, username, pwd, email FROM users WHERE (`username` = '$username')";

$result = $conn->query($sql);

if ($result->num_rows == 1) {

    $user = $result->fetch_assoc();

    if (password_verify($password, $user["pwd"])) {

        // Set user session info
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SEESION['email'] = $user['email'];

        echo 'success';
        setcookie($cookie_name, 'true');

        exit;
    }
}

setcookie($cookie_name, "", time() - 3600);

echo "fail";

$conn->close();
