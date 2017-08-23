

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


//change the content of toolbar --bind with dropdown
$(document).on('change', '.categoriesSelect', function() {
  var target = $(this).data('target');
  var show = $("option:selected", this).data('show');
  $(target).children().addClass('hide');
  $(show).removeClass('hide');
});
$(document).ready(function(){
	$('.categoriesSelect').trigger('change');
});


//drag and drop

$(".dragObject").draggable({
  	helper:'clone',
  	cursor:'move',
  	tolerant:'fit',

});


//dropping to container
$('#containerDrop').droppable({
  accept:'.dragObject',
  drop: function(ev, ui) { 
  	if (ui.draggable[0].id) {
    $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", scroll: false}));
  } 
}
});


//remove dropped item in container
$(".eraseAllIcon").click(function(){
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
	  dataType: "JSON"
}); 
});

//print out the page
$(".printIcon").click(function(){
	$("#containerDrop").show();
	window.print();
});

// saving the form to JSON and to database
$("form").submit(function(ev){
	var formData = JSON.stringify($("#php-form").serializeArray());
	console.log($(this).serializeArray());
	ev.preventDefault();
	var fData = {"id":$(this).data('id'), "name":$(this).data('name'), "width":$(this).data('width'), "length":$(this).data("length"), 
				"garden_type":$(this).data("garden_type")}
	var request = $.ajax({
	  url: "php-form.php",
	  method: "POST",
	  data: formData,
	  dataType: "JSON"
	 }); 
});

