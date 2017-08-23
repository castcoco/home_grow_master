function doFirst(){
	mypic=document.getElementById('01_veggie');
	mypic.addEventListener("dragstart", startDrag, false);
	leftbox = document.getElementById('leftbox');
	leftbox.addEventListener("dragenter", function(e) {e.preventDefault();},false);
	leftbox.addEventListener("dragover", function(e) {e.preventDefault();} ,false);
	leftbox.addEventListener("drop", dropped ,false);

}
function startDrag(e){
	var code = '<img src="images/01_veggie.jpg">';
	e.dataTransfer.setData('Text', code);
}
function dropped(e){
	e.preventDefault();
	leftbox.innerHTML = e.dataTransfer.getData('Text');
}
window.addEventListener("load", doFirst, false);

