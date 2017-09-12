$(document).ready(function(){
	$('#findbtn').on('click', function(ev){
		ev.preventDefault();
		searchName();
	});


	 $('#submitButton').on('click', function(ev){
	  	ev.preventDefault();
	  	searchList();
	 });

	$('#clearButton').click(reset)
});

function reset(){
	$('#searchform')[0].reset();
}

function searchName(){
var plantname = $('#plantName').val();
	console.log("hi");	
	$.ajax({
		method:'GET',
		url:'filternew.php',
		data:{search:plantname},
		dataType:'JSON',
		success:function(data){
			console.log(data);
			$('#tableresult').empty();
			var info = '';

			if(data.length >0){
				for(i=0; i< data.length; i++){
					//console.log(info);
					info+= "<tr>"
					+ "<td>"+"<img src="+data[i].path+" style='width:300px; height:300px; margin-right:1%;margin-bottom:0.5em;'>"+"</td>"
					+ "</tr>"
					+ "<td>"+" <b> Common Name: </b>" + data[i].common_name+"</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td>"+" <b>Variety Name: </b>" + data[i].variety_name+"</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td>"+" <b>Sun Type: </b>" + data[i].sun_type+"</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td>"+" <b>Soil Type: </b>" + data[i].soil_type+"</td>"
					+ "</tr>";				
				}
				console.log("info="+info);
				$('#tableresult').append(info).removeClass('hidden');
			} 
				else{
				
				$('#tableresult').html('No record is found!').removeClass('hidden');
			}
		}
		});
		}

function searchList(){
	$('#tableresult').empty();
	var sunvalue = $('#sunlightMenu').val();
	console.log('sun val:',sunvalue);
	var soilvalue = $('#soilMenu').val();
	console.log('soil value:',soilvalue);
	$('#tableresult').empty();
	var info = '';

	if ((sunvalue !='') && (soilvalue==='')){
		data = {sunlightMenu:sunvalue};
		//searchSun();
		console.log('sun',sunvalue);
	}else if
		((sunvalue==='') && (soilvalue !='')){
		data = {soilMenu:soilvalue};
		//searchSoil();
		console.log(soilvalue);
	}else if
		((sunvalue !='') && (soilvalue!='')){
		data = {
			sunlightMenu:sunvalue,
			soilMenu:soilvalue
		};
		console.log(sunvalue, soilvalue);
	}

	searchAll(data);
 }



function searchAll(data){
	//$('select#sunlightMenu').bind('change', function(){
	//	var sunvalue = $('option:selected', this).attr('value');
	//var sunvalue = $('#sunlightMenu').val();
		//console.log('sunvalue:',sunvalue);
		$.ajax({
			method:'GET',
			url:'filternew.php',
			data:data,
			dataType:'JSON',
			success:function(data){
				console.log('data',data);
				//console.log(typeof(data));
				$('#tableresult').empty();
				var info = '';
				if(typeof(data) == "object" && data.length >0){
					for(i=0; i< data.length; i++){
						info+= "<tr>"
						+ "<td>"+"<img src="+data[i].path+" style='width:300px; height:300px; margin-right:1%;margin-bottom:0.5em;'>"+"</td>"
						+ "</tr>"
						+ "<td>"+" <b> Common Name: </b>" + data[i].common_name+"</td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td>"+" <b>Variety Name: </b>" + data[i].variety_name+"</td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td>"+" <b>Sun Type: </b>" + data[i].sun_type+"</td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td>"+" <b>Soil Type: </b>" + data[i].soil_type+"</td>"
						+ "</tr>"
						+ "<tr>"
						+ "<td>"+" <b>Season: </b>" + data[i].season+"</td>"
						+ "</tr>";				
					}

				}

				if (info!=""){
					$('#tableresult').append(info).removeClass('hidden');
				}
				else{
					console.log("KHVKDSHKDSNV" + info);
					$('#tableresult').html('No record!').removeClass('hidden');
				}
			}
		})

};





