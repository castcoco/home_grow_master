var $form = $('.boxInput');

// var output = function(){
// 	var div = document.createElement('div');
// 	return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
// }();
// }

$(document).ready(function(){
	$('.boxInput').on('dragover', function(){
		$(this).addClass('file_drag_over');
		return false;
	});
	$('.boxInput').on('dragleave', function(){
		$(this).removeClass('file_drag_over');
		return false;
	});
	$('.boxInput').on('drop', function(ev){
		ev.preventDefault();
		$(this).removeClass('file_drag_over');
		var formData = new FormData();
		var filesList = ev.originalEvent.dataTransfer.files[0];
		console.log(filesList);
		for (var i=0; i<filesList.length; i++)
		{
			formData.append('file[]', filesList[i]);
		}
		console.log(filesList);

		$.ajax({
			url:'demo_upload.php',
			method:'POST',
			data:formData,
			contentType:false,
			cache:false,
			processData: false,
			success:function(data){
				$('.uploaded_file').html(data);
			}
		})

	});

});


// var $input = $form.find('input[type="file"]');
// var $label = $form.find('label');
// var showFile = function(files){
// 	$label.text(file.length >1 ?($input.attr('data-multiple-caption')|| '').replace( '{count}', files.length ) : files[ 0 ].name;)
// };