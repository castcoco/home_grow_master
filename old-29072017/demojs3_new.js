var garden_id = 1;

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
  	revert:"invalid",
  	tolerant:'fit',

});

//dropping to container

// $('#containerDrop').droppable({
//   accept:'.dragObject',
//   drop: function(ev, ui) { 
//   	if (ui.draggable[0].id) {
//     $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", scroll: false}));
//   } 
// }
// });


$('#containerDrop').droppable({
  accept:'.dragObject',
  drop: function(ev, ui) { 
  	var $clone = ui.helper.clone()
  	// clone.css('position', 'absolute'); <-----it fixed the dragged item on the canvas but cant clone
	clone.css('position', 'absolute');  	
  	// if (!$clone.is('#containerDrop')){
  	//  	$(this).append($clone.addClass('#containerDrop').draggable({
 	 // 	containment:'#containerDrop',
   // 		tolerance:'fit',
   // 		position:'absolute'
   // 	}));
  	// }
  	 // if (ui.draggable[0].id) {
    //  $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", position:'absolute', tolerance:'fit', scroll: false}));
  
  	$clone.resizable({
		ghost:'true',
  		animate:'true',
  		handles: 'se',
  	});
  } 
 //}
});


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


  		//http://jsfiddle.net/ErL5H/

//image slider 
// $(window).load(function(){
// 	var totalWidth = 0;
// 		//otal width is calculated by adding all the images
// 	$('.hide').each(function(){
// 		totalWidth = totalWidth + $(this).outerWidth(true);
// 	});

// 	var maxPosition = totalWidth - $('.toolbar').outerWidth();
// 	alert("hi")
// 	//animate to the target item

// 	function allItems($targetItem){
// 		//make sure target item exists,otherwise no action
// 		if($targetItem.length){
// 			// set new position to the left of the targetItem
// 			var newPosition = $targetItem.position().left;
// 			// if the new position is not greater than the max width
// 			if(newPosition <= maxPosition){
// 				//add active class to the target item
// 				$targetItem.addClass(".dragObject--active");
// 				//remove active class from all others
// 				$targetItem.removeClass(".dragObject--active");
// 				//animate images to correct left position
// 				$(".content-info").animate({
// 					left : - newPosition
// 				});
// 			}else{
// 				//animate itemlists element to left position
// 				$(".content-info").animate({
// 					left: -maxPosition
// 				});
// 			};
// 		};
// 	};

// 	$(this).find(".content-info").width(totalWidth);
// 	$(this).find(".content-info").addClass(".dragObject--active");

// 	//when the prev button is clicked
// 	$(this).find(".controls_prev").click(function(){
// 		var $targetItem = $(this).find(".dragObject--active").prev();
// 		allItems($targetItem);
// 	});

// 	//when the next button is clicked
// 	$(this).find(".controls_next").click(function(){
// 		var $targetItem = $(this).find(".dragObject--active").next();
// 		allItems($targetItem);
// 	});

// });








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

