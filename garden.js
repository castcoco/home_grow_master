
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
 // console.log(show, target);
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


function changeWidth(){
	$("select.widthMenu").bind("change", function(evt){
	var selwidth = $("option:selected", this).attr("value");
	//console.log("selected width");
	$("#containerDrop").width(selwidth);
	});
}


function changeLength(){
	$("select.heightMenu").bind("change", function(evt){
	var selLength = $("option:selected", this).attr("value");
	//console.log("selected length");
	$("#containerDrop").height(selLength);
	});
}

function saveform(){
	$('saveBtn').submit(function(){
		$('formsavedmsg').html('Your form is saved successfully').css('color','red');
		return false;
	})
}



function saveToImg(){
	$("#saveIcon").click(function(){
		html2canvas($('#containerDrop'), {
			onrendered: function(canvas) {
				if (canvas.msToBlob)
				{
					//for IE
					var blob = canvas.msToBlob();
					window.navigator.msSaveBlob(blob,"garden.png");
				}
				else{
					//for other browsers
					var img = canvas.toDataURL();
					
					downloadURI(img, "garden.png");
					
				}
  			}
		});
	})	
};

//source is extracted from https://stackoverflow.com/questions/33668608/generate-an-image-of-a-div-and-save-as
function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click(); 
}


