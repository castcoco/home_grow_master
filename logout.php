<?php
//logout.php

session_start();
echo " You have logged out! ";

setcookie("loggedin", '', time() - 3600);

session_destroy();

header('Location: /index.html');

