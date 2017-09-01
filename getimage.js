 $(document).ready(function(){
	 	//var id = $('#imageTable').html();
	 	var dir = '/uploads';
	 	var filetype = '.gif|.jpg|.png|.jpeg';
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
					"<img src="+data[i].path+" style='width:30%; height:30%; margin-right:1%;margin-bottom:0.5em;'>";
					
				}
				if (img!=""){
					$('#imageTable').append(img);
				}
			}
		});
		
	 });