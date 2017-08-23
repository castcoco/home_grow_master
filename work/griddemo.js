function_id(id)
	return document.getElementById(id)
}

function dragstart_handler(ev){
	var image = new Image();
	img.src = '01_veggie.png';
	// add the target element's id to the data transfer object
	ev.dataTransfer.setData("01_veggie.png", 20,20);
}
