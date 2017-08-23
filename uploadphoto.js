$(document).ready(function(){	 	
			getImage();
			$(".remove").click(deleteImage);

	 	});

		function getImage(){
			$.ajax({
			type:"GET",
			url:'dbimage.php',
		}).done(function(data){
			console.log(data);
			var img= '';
			//display image
			if(data.length >0){
				for (i=0; i<data.length; i++){
					img+=
					"<img src="+data[i].path+" style='width:30%; height:30%; margin-right:1%;margin-bottom:0.5em;'>"
					+"<input type='submit' class='remove' value='Delete Image' name='submit'>";
					
				}
				if (img!=""){
					$('#imageTable').append(img);
				}
			}
		});
		
		}

		function deleteImage(){
			var status =confirm("Are you sure to remove the image?")
			ajax({
				type:"POST",
				url:'delete.php',
			}).done(function(data))
		}