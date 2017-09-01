<?php

	$to = "castcoco@hotmail.com"; //garden website admin email
	$subject = "test"; // filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
	$body = "message show"; //"Message: $message\nE-mail: $email";
	
  if(mail($to, $subject, $body)) {
    $output = json_encode(array('success' => true));
	echo "hi";
    die($output);
  } else {
    $output = json_encode(array('success' => false));
    die($output);
  }

