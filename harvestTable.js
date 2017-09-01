
// insert new row with editable cells
	function insertRowFunction(){
		var table = document.getElementById("myTable");
		var insert = 1;
		for (var i=0; i < insert; i++){
			var row = table.insertRow(2);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    var cell4 = row.insertCell(3);
		    var cell5 = row.insertCell(4);
		    var cell6 = row.insertCell(5);
		    var cell7 = row.insertCell(6);
		    var cell8 = row.insertCell(7);
		    var cell9 = row.insertCell(8);
		    row.setAttribute("class", "hello");
			cell1.innerHTML ="<div><button class='rowBtn' onclick='insertRowFunction()'>insert</button></div>";
			cell2.innerHTML ='<div contenteditable="true"></div>';
			cell3.innerHTML ='<div contenteditable="true" class="pcount" id="pQty"></div>';
			cell4.innerHTML ='<div contenteditable="true" class="datepick" id="sowDate"></div>';
			cell5.innerHTML ='<div contenteditable="true" class="datepick" id="harDate"></div>';
			cell6.innerHTML ='<div contenteditable="true" class="pcount" id="pVol"></div>';
			cell7.innerHTML ='<div contenteditable="true" class="pcount" id="pPrice"></div>';
			cell8.innerHTML ='<div class="total">0.00</div>';
			cell9.innerHTML ="<div><input class='deleteBtn' type='button' value='Remove'></div>";		
		}
	}


//remove row on harvest table
	$(document).ready(function(){
		 $("#myTable").on('click','.deleteBtn',function(){
       		$(this).closest('tr').remove();
       		addFunction();
       		multiplyFunction();
     	});
	});

//reset or clear data in table
	// $('#resetBtn').click(function(){
	// })


// multiply price*harvested volume in KG --not work properly --method1
$(document).ready(function(){
	// $("td").keydown(multiplyFunction);
	$('td').keyup(multiplyFunction);
	function multiplyFunction(){
		var multiValue = parseFloat(0);
		var addVolValue = parseFloat(0);
		console.log(multiValue);
		//calculate each row
		$("tr.hello").each(function(){
			// var number = parseFloat($(this).find('div.pVol', this).text(),10);
			// var price = parseFloat($(this).find('div.pPrice', this).text(),10);
			 var number = parseFloat($(this).find('div#pVol', this).text(),10);
			 var price = parseFloat($(this).find('div#pPrice', this).text(),10);

			console.log(number, price);
			var ptotal = ((number*1) * (price*1)|| 0); // multiply value formula plus converting nan to zero
			console.log(number,price,ptotal);
			$(".total",this).text((ptotal));
			console.log(number,price,ptotal, multiValue);
			multiValue= multiValue + ptotal;
			addVolValue = addVolValue + number;
			console.log("multivalue,ptotal",multiValue, ptotal);
			});
			$("tfoot td.sumAmt").text(multiValue);
			$("tfoot td.sumVol").text((addVolValue)||0);
	}
});

// sum of the quantities
$(document).ready(function(){
	$('td').keyup(addFunction);
	function addFunction(){
		var sumValue = parseFloat(0);
		console.log('sumValue',sumValue);
		$('tr.hello').each(function(){
			var qty = parseFloat($(this).find('div#pQty', this).text(),10);
			sumValue = ((sumValue + qty)||0);
			console.log("sumValue, Qty", sumValue, qty);
		});
		$("tfoot td.sumQty").text(sumValue);
	}
});



//datepicker



// Row is based on which $(this) made the event call. 
// Column is based on $(this).closest('tr').find('td:nth-child(2)) (for the 2nd column). 
// Replace 2 with another number to get a different column







//*****NOT WORKABLE CODE**** //

		// function insertRowFunction(){
		// 	$('#mytable tbody').append(
		// 		"<tr>" +
		// 		"<td><button id='rowBtn' onclick='insertRowFunction()'>insert</button></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><input type='text'/></td>" +
		// 		"<td><button id='editBtn'>edit</button></td>" +
		// 		"<td><button id='deleteBtn'>remove</button></td>" +
		// 		"</td>");

		// 		$("#editBtn").bind("click", edit);
		// 		$("#deleteBtn").bind("click", remove);
		// };

// function Save(){
// 	var par = $(this).parent().parent(); //tr
// 	var tdName = par.children("td:nth-child(1)");
// 	var tdQty = par.children("td:nth-child(2)");
// 	var tdSow = par.children("td:nth-child(3)");
// 	var tdHarvest = par.children("td:nth-child(4)");
// 	var tdPrice = par.children("td:nth-child(5)");
// 	var tdButtons = par.children("td:nth-child(6)");

// 	tdName.html("<input type='text' id='txtName' value='"+tdName.html()+"'/>");
// 	tdQty.html("<input type='text' id='txtPhone' value='"+tdQty.html()+"'/>");
// 	tdSow.html("<input type='text' id='txtEmail' value='"+tdSow.html()+"'/>");
// 	tdHarvet.html("<input type='text' id='txtEmail' value='"+tdHarvet.html()+"'/>");
// 	tdPrice.html("<input type='text' id='txtEmail' value='"+tdPrice.html()+"'/>");
// 	tdButtons.html("<img src='images/eraseAll2.png' class='deleteBtn'/>");

// 	$(".saveBtn").bind("click", Save);
// 	$(".btnEdit").bind("click", Edit);
// 	$(".deleteBtn").bind("click", Delete);
// };


