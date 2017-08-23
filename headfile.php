<?php

session_start();

if (!isset($_SESSION['user_id']) || is_null($_SESSION['user_id']) ) {
	header('Location: /logout.php');
	exit;
}