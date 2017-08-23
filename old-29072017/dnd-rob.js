var garden_id = 1;


// var x = null;

// 	// object dragable
// 	$(".dragObject").draggable({
// 		helper:'clone',
// 		cursor:'move',
// 		tolerant:'fit',
// 		revert:true
// 	});


// 	$('#containerDrop').droppable({
// 		accept:'.dragObject',
// 		drop:function (e, ui){
// 			if($(ui.draggable)[0].id !=""){
// 				x = ui.helper.clone();
// 				ui.helper.remove();
// 				x.draggable({
// 					helper:'original',
// 					cursor:'move',
// 					tolerant:'fit',
// 					drop:function(event,ui){
// 						$(ui.draggable).remove();
// 						$(this).find("p").html("Yes, dropped")

// 					}
// 				});
// 				x.resizable({
//                     maxHeight: $('#containerDrop').height(),
//                     maxWidth: $('#containerDrop').width()
//                 });
// 			}
// 		}
// 	});
	

// $(".dragObject").draggable({
//   helper:'clone',
//   cursor:'move',
//   tolerant:'fit',
// });


// $('#containerDrop').droppable({
//   accept:'.dragObject',
//   tolerance: 'pointer',
//   greedy: true,
//   hoverClass: 'highlight',
//   drop: function(ev, ui) {
//     $(ui.draggable).clone(true).detach().css({
//       position: 'relative',
//       top: 'auto',
//       left: 'auto'
//     }).appendTo(this);
//   } 
// }); 

//add sound effect
// function sound(){
// 	var sound = new mysound(ev);
// 	audio.setAttribute("src", "click.mp3")
// 	sound.load()
// }

$(".dragObject").draggable({
  	helper:'clone',
  	cursor:'move',
  	tolerant:'fit',
stack: '.dragObject'
  	
});

//workable code
$('#containerDrop').droppable({
  accept:'.dragObject',
  drop: function(ev, ui) { 
  	if (ui.draggable[0].id) {
    $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", scroll: false}));
  } 
  $(ui.helper).clone().resizable()
}
});



//remove all dropped item via button in container
$("#eraseAllIcon").click(function(){
	$("#containerDrop .plant").remove();
})


//not working
//copy selected dropped item
$("#copyIcon").on("click", function(){
	//var srcImage = $(ui.draggable).find('img').attr('src').clone();
	var $img = $("#containerDrop").children("img").clone();
	$("#containerDrop").appendTo($img);
})
;
;

//copy dropped item via button in container
// $("#copyIcon").click(function(){
// 	$("#")
// })

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
$("#printIcon").click(function(){
	$("#containerDrop").css('visibility','visible');
	window.print();
});


// //for tool to put zIndex
// $(".rectangleTool").draggable({
//   	helper:'clone',
//   	cursor:'move',
//   	tolerant:'fit',
// });

// $('#containerDrop').droppable({
//   accept:'.rectangleTool',
//   drop: function(ev, ui) { 
//   	if (ui.draggable[0].id) {
//     $(this).append($(ui.helper).clone(true).draggable({containment:"#containerDrop", scroll: false}));
    
//   } 
// }
// });



//resize the dragged item in container
// $(function(){
// maxHeight:$("#containerDrop").height(),
// maxWidth: $('#containerDrop').width();
// });




//resize
// $(document).ready(function(){
// 	$(".dragObject").resizable({
// 		containment:"#containerDrop"

// 	});
// });


//copy command



//user id
var userID = "1"
var gardenID = "1"



