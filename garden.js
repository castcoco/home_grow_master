
$(document).ready(function(){
	changeWidth();
	changeLength();
	saveform();
	saveToImg();
	$('.categoriesSelect').trigger('change');
});

$(document).on('change', '.categoriesSelect', function() {
	//alert('koko');
  var target = $(this).data('target');
  var show = $("option:selected", this).data('show');
 $(target).children().addClass('hide');
  $(show).removeClass('hide');
  console.log(show, target);
});


//drag and drop
$(".dragObject").draggable({
  	helper:'clone',
  	cursor:'move',
  	revert:"invalid",
  	tolerant:'fit',
  	drag:function(event){
  		o = $(this).offset();
  		p = $(this).position();
  		
  	}

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
$("#eraseAllIcon").click(function(){
	$("#containerDrop .plant").remove();
})


//save dropped item via button in container

// $("#saveIcon").click(function(){
// 	//var jsonData = {"data":[]};
// 	var dataObj = {"data":[]};
// 	$("#containerDrop > .plant").each(function () { 
// 		var obj = { "type":$(this).data('plant'),"height":$(this).css("height"), "width": $(this).css("width"), "top": $(this).css("top"), 
// 					"bottom": $(this).css("bottom"), "left": $(this).css("left"), "right": $(this).css("right"), "garden_id": garden_id};
// 		dataObj["data"].push(obj);
// 		//var obj = { "height":this.height, "width": this.width, "top": $(this).css("top")};
// 		//console.log(dataObj["data"][0]);
// 	});

// 	console.log(JSON.stringify(dataObj));

// 	var request = $.ajax({
// 	  url: "mygarden.php",
// 	  method: "POST",
// 	  data: dataObj,
// 	  dataType: "JSON",
// 	  complete: function(data){console.log(data);}
// 	});
		//.done(function( data ) {
    	//if ( console && console.log ) {
      	//	console.log( "Coco " + data );
    	//}
  	//});
//});

function changeWidth(){
	$("select.widthMenu").bind("change", function(evt){
	var selwidth = $("option:selected", this).attr("value");
	console.log("selected width");
	$("#containerDrop").width(selwidth);
	});
}


function changeLength(){
	$("select.heightMenu").bind("change", function(evt){
	var selLength = $("option:selected", this).attr("value");
	console.log("selected length");
	$("#containerDrop").height(selLength);
	});
}

function saveform(){
	$('saveBtn').submit(function(){
		$('formsavedmsg').html('Your form is saved successfully').css('color','red');
		return false;
	})
}


//source is extracted from https://stackoverflow.com/questions/33668608/generate-an-image-of-a-div-and-save-as
function saveToImg(){
	$("#saveIcon").click(function(){
		html2canvas($('#containerDrop'), {
			onrendered: function(canvas) {
				var img = canvas.toDataURL();
				downloadURI(img, "garden.png");
				//window.open(img, "01.png");
  			},
		});
	})	
};

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click(); 
}


