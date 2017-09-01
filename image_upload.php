<?php
// source from: http://talkerscode.com/webtricks/drag-and-drop-image-upload-using-ajax-jquery-and-php.php
//include connection file
require_once("connection.php");

if(is_array($_FILES))
{
	if(is_uploaded_file($_FILES['userImage']['image_name'])){
		$sourcePath = $_FILES['userImage']['image_name'];
		$targetPath = "images/".$_FILES['userImage']['name'];
		if (move_uploaded_file($sourcePath, $targetPath)){
		?>
	   <img src="<?php echo $targetPath; ?>">
	   <?php
  // exit();
  }
 }
}
?>