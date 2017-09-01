<?php

if ($_POST){
	$to = "ymak01@mail.bbk.ac.uk"; //garden website admin email
	$firstname = filter_var($_POST["firstname"], FILTER_SANITIZE_STRING);
	$lastname = filter_var($_POST["lastname"], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
	$subject = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
	$message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
	$body = "Message: $message\nE-mail: $email";
	
  if(mail($to, $subject, $body)) {
    $output = json_encode(array('success' => true));
    die($output);
  } else {
    $output = json_encode(array('success' => false));
    die($output);
  }
}
