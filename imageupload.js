$(function(){
	var files = $('#files');

	$('#fileupload').fileupload({
		url:'imagetest.php',
		dropZone:'#droparea',
		dataType:'json',
		autoUpload:false
	}).on('fileuploadadd', function(e,data){
		//verify file
		var fileTypeAllowed = /.\.(gif|jpg|png|jpeg)$/i;
		var fileName =data.originalFiles[0]['name'];
		var fileSize =data.originalFiles[0]['size'];
		
		if (!fileTypeAllowed.test(fileName))
			$('#error').html('Only images are allowed!');
		else if(fileSize > 1000000)
			$('#error').html("your file size is too large!");
		else {
			$('#error').html('');
			data.submit();
		}
	}).on('fileuploaddone', function(e, data){
		console.log(data);
		var status = data.jqXHR.responseJSON.status;
		var msg = data.jqXHR.responseJSON.msg;

		if (status == 1){
			var path = data.jqXHR.responseJSON.path;
			$('#files').fadeIn().append('<p><img style="width:200px;height:200px;" src ="'+ path +'"/></p>');
		}else
			$('#error').html(msg);
	}).on('fileuploadprogressall', function(e, data){
		// console.log(data);
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('#progress').html('Completed:' + progress + '%');
	});

});