

//change the width of container -- bind with dropdown
$(document).ready(function(){
	$("select.widthMenu").bind("change", function(evt){
		var selwidth = $("option:selected", this).attr("value");
		console.log("selected width");
		$("#containerDrop").width(selwidth);

	});
});

//change the width of container -- bind with dropdown
$(document).ready(function(){
	$("select.heightMenu").bind("change", function(evt){
		var selLength = $("option:selected", this).attr("value");
		console.log("selected length");
		$("#containerDrop").height(selLength);

	});
});


$(document).on('change', '.categoriesSelect', function() {
	//alert('koko');
  var target = $(this).data('target');
  var show = $("option:selected", this).data('show');
 $(target).children().addClass('hide');
  $(show).removeClass('hide');
  console.log(show, target);
});
$(document).ready(function(){
	$('.categoriesSelect').trigger('change');
});

//drag and drop
$(".dragObject").draggable({
  	helper:'clone',
  	cursor:'move',
  	revert:"invalid",
  	tolerant:'fit',

});

//dropping to container

$('#containerDrop').droppable({
  accept:'.dragObject',
  drop: function(ev, ui) { 
  	if (ui.draggable[0].id) {
    $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", scroll: false}));
  } 

  // $('#containerDrop .plant').addClass('ui-widget-content');
  // $('#containerDrop .plant').resizable();
  // console.log("hi");
}
});

//remove dropped item in container
$("#eraseAllIcon").click(function(){
	$("#containerDrop .plant").remove();
})


//save dropped item via button in container

$("#saveIcon").click(function(){
	//var jsonData = {"data":[]};
	var dataObj = {"data":[]};
	$("#containerDrop > .plant").each(function () { 
		var obj = { "type":$(this).data('plant'),"height":$(this).css("height"), "width": $(this).css("width"), "top": $(this).css("top"), 
					"bottom": $(this).css("bottom"), "left": $(this).css("left"), "right": $(this).css("right"), "garden_id": garden_id};
		dataObj["data"].push(obj);
		//var obj = { "height":this.height, "width": this.width, "top": $(this).css("top")};
		//console.log(dataObj["data"][0]);
	});

	console.log(JSON.stringify(dataObj));

	var request = $.ajax({
	  url: "mygarden.php",
	  method: "POST",
	  data: dataObj,
	  dataType: "JSON",
	  complete: function(data){console.log(data);}
	});
		//.done(function( data ) {
    	//if ( console && console.log ) {
      	//	console.log( "Coco " + data );
    	//}
  	//});
});

//print out the page
$("#printIcon").click(function(){
	$("#containerDrop").show();
	window.print();
});

// saving the form to JSON and to database
// $("#saveIcon").submit(function(ev){
// 	var formData = JSON.stringify($("#php-form").serializeArray());
// 	console.log($(this).serializeArray());
// 	ev.preventDefault();
// 	var fData = {"id":$(this).data('id'), "name":$(this).data('name'), "width":$(this).data('width'), "length":$(this).data("length"), 
// 				"garden_type":$(this).data("garden_type")}
// 	var request = $.ajax({
// 	  url: "php-form.php",
// 	  method: "POST",
// 	  data: formData,
// 	  dataType: "JSON"
// 	 }); 
// });


// $('#containerDrop').droppable({
//   accept:'.dragObject',
//   drop: function(ev, ui) { 
//   	var $clone = ui.helper.clone()
//   	// clone.css('position', 'absolute'); <-----it fixed the dragged item on the canvas but cant clone 	
//   	 if (!$clone.is('#containerDrop')){
//   	  	$(this).append($clone.addClass('#containerDrop').draggable({
//  	  	containment:'#containerDrop',
//     		tolerance:'fit',
//     		position:'absolute'
//     	}));
//   	 }
  	 // if (ui.draggable[0].id) {
    //  $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", position:'absolute', tolerance:'fit', scroll: false}));
  
//  } 
 //}
//});


// var x = null;
// $(function(){
// var x = null;
// 	$(".dragObject").draggable({
//   	helper:'clone',
//   	cursor:'move',
//   	revert:"invalid",
//   	tolerant:'fit',

// });
// 	$('#containerDrop').droppable({
// 	  accept:'.dragObject',
// 	  activeClass: "#containerDrop",
// 	  drop: function(ev, ui) { 
// 	  	if (ui.draggable[0].id != "") {

// 	  		x =ui.helper.clone();
// 	  		ui.helper.remove();
// 	  		x.draggable({
// 	  			helper:'original',
// 	  			cursor:'move',
// 	  			containment:'#containerDrop',
// 	  			tolerance:'fit',
// 	  			drop: function( ev, ui){
// 	  				$(ui.draggable).remove();
// 	  			}
// 	  		});

// 	  		x.resizable({
// 	  			maxHeight: $('#containerDrop').height(),
// 	  			maxWidth: $('#containerDrop').width()
// 	  		});

// 	  		x.addClass('remove');
// 	  		var deleteElement = $("<span><a href='Javascript:void(0)' class=\"closeIcon delete\" title=\"Remove\">X</a></span>");
// 	  		$(deleteElement).insertAfter($(x.find('.dragObject')));
// 	  		x.appendTo('#containerDrop');
// 	  		$('.close').on('click', function(){
// 	  			$(this).parent().parent('span').remove();
// 	  		});
// 	  		$('.close').parent().parent('span').dbclick(function(){
// 	  			$(this).remove();
// 	  		});
// 	  		}
// 		}
// 	});
// });














