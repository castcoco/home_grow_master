$(document).ready(function(){
	$('#findbtn').click(searchName);
	
});

function searchName(){
var plantname = $('#plantName').val();

	$.ajax({
		method:'GET',
		url:'filter.php',
		//datatype: 'text',
		//data:{search:plantname},
	}).done(function(data){
		console.log(data);
		var info = '';
		if(data.length >0){
			for(i=0; i< data.length; i++){
				info+= "<tr>"
				"<td>"+"Common Name: " + data[i].common_name+"</td>"
				+"</tr>";				
			}
			if (info!=""){
				$('#tableresult').append(info).removeClass('hidden');
			}
		}
	});
}

