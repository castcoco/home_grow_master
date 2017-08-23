$(document).ready(function()
{
 $("#dropArea").on('dragenter', function (ev){
  ev.preventDefault();
  $(this).css('background', '#BBD5B8');
 	});

	$("#dropArea").on('dragover', function(ev){
		ev.preventDefault();
	});

	$('#dropArea').on('drop', function(ev){
		$(this).css('background', 'pink')
		ev.preventDefault();
		var images = ev.originalEvent.dataTransfer.files;
		createData(image);
	});
});

function createDataForm(image)
{
	var imagedata = new dataForm();
	imagedata.append('userImage, image[0]');
	uploadDataForm(imageData);
}

function uploadDataForm(dataForm)
{
	$.ajax({
	url: "image_upload.php",
	type: "POST",
	data:dataForm,
	cache:false,
	contentType:false,
	success: function(data){
		$("#dropArea").html(data);
	}});
}