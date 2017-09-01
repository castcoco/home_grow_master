$(document).ready(function(){
	$('#findbtn').on('click', function(ev){
		ev.preventDefault();
		searchName();
	});


	 //$('#submitButton').on('click', function(ev){
	  //	ev.preventDefault();
	  	searchSun();
	//	searchSoil();
	  	//searchList();
	  	//console.log("list2")
	// });

	 // $('#submitButton').on('click', function(ev){
	 //  	console.log("sun")
	 // 	ev.preventDefault();
  // 		searchSun();
  // 		console.log("sun2")
	 // });

	// $('#submitButton').on('click', function(ev){
	//  	console.log("type")
	//  	ev.preventDefault();
 // 		searchSoil();
 // 		console.log("soiltesting")
	// });
	// $('#submitButton').on('click', function(ev){
	//  	console.log("season")
	//  	ev.preventDefault();
 // 		searchSeason();
	// });

	$('#clearButton').click(reset)
});

function reset(){
	$('#searchform')[0].reset();
}
function ajaxSearchCall(){
		$.ajax({
		method:'GET',
		url:'filter.php',
		dataType:'JSON',
		success:function(data){
			console.log(data);
			$('#tableresult').empty();
			var info = '';
			if(data.length >0){
				for(i=0; i< data.length; i++){
				info+= "<tr>"+
				"<td>"+" <b> Common Name: </b>" + data[i].common_name+"</td>"
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
			if (info!=""){
				$('#tableresult').append(info).removeClass('hidden');
				console.log("")
			}
			}
		}
	})
}

function searchName(){
var plantname = $('#plantName').val();
	console.log("hi");	
	$.ajax({
		method:'GET',
		url:'filter.php',
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
				// else{
				// 	if (data.length==0){
				// 		console.log(data.length)
				// 		info = "<tr>"+"<td>No Results</td>"+"</tr>"
				// }
				//$('#tableresult').append(info).removeClass('hidden');
			//}
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
		searchSun();
		console.log('sun',sunvalue);
	}else if
		((sunvalue==='') && (soilvalue !='')){
		searchSoil();
		console.log(soilvalue);
	}else if
		((sunvalue !='') && (soilvalue!='')){
		console.log(sunvalue, soilvalue);
	}
 }

function nothing(){
	var plantname = $('#plantName').val();
	if (plantname ==''){
		('#tableresult').html('please input the plant value!')
	}
}

function searchSun(){
	//$('select#sunlightMenu').bind('change', function(){
	//	var sunvalue = $('option:selected', this).attr('value');
	var sunvalue = $('#sunlightMenu').val();
		console.log('sunvalue:',sunvalue);
		$.ajax({
			method:'GET',
			url:'filter.php',
			data:{sunlightMenu:sunvalue},
			dataType:'JSON',
			success:function(data){
				console.log('data',data);
				$('#tableresult').empty();
				var info = '';
				if(data.length >0){
					for(i=0; i< data.length; i++){
					info+= "<tr>"+
					"<td>"+" <b> Common Name: </b>" + data[i].common_name+"</td>"
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
				if (info!=""){
					$('#tableresult').append(info).removeClass('hidden');
				}
				}
			}
		})
//});
};


function searchSoil(){
		var soilvalue = $('#soilMenu').val();
		console.log('soilvalue:',soilvalue);
		$.ajax({
		method:'GET',
		url:'filter.php',
		data:{soilMenu:soilvalue},
		dataType:'JSON',
		success:function(data){
			console.log('data',data);
			$('#tableresult').empty();
			var info = '';
			if(data.length >0){
				for(i=0; i< data.length; i++){
				info+= "<tr>"+
				"<td>"+" <b> Common Name: </b>" + data[i].common_name+"</td>"
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
			if (info!=""){
				$('#tableresult').append(info).removeClass('hidden');
			}
			}
		}
	})
};




// function search(){
// 	console.log("search suntype");	
// 	$.ajax({
// 	method:'GET',
// 	url:'filter2.php',
// 	//datatype: 'text',
// 	//data:{search:plantname},
// 	dataType:'json',
// 	success:function(data){
// 		$('#tableresult').html(data);
// 	}
// });
// }


// function searchName(ev){
// var plantname = $('#plantName').val();
// 	ev.preventDefault()
// 	console.log("hi");
// 	$.ajax({
// 		method:'GET',
// 		url:'filter.php',
// 		//datatype: 'text',
// 		//data:{search:plantname},
// 		dataType:'json',
// 		success:function(data){
// 			var comname = data[5];
// 			var vname = data[7];
// 			console.log(comname, vname);
// 			$('#tableresult').html("<b> Common name: </b>" + comname + "<b> Variety Name: </b>" + vname);
// 		}
// 	});
// }
