function _(id){
   return document.getElementById(id);	
}
var droppedIn = false;
function drag_start(event){
	_('app_status').innerHTML ="Dragging the" + event.target.getAttribute('id');
	event.dataTransfer.dropEffect = "move";
	event.dataTransfer.setData("text", event.target.getAttribute('id'));
}
function drag_enter(event){
	_('app_status').innerHTML = "You are draggin over the" + event.target.getAttribute('id');
}
function drag_leave(event){
	_('app_status').innerHTML = "you left the" + event.target.getAttribute('id');
}
function drag_drop(event){
	event.preventDefault();
	var elem_id = event.dataTransfer.getData("text")
	event.target.appendChild((_ele_id));
	_('app_status').innerHTML = "Dropped" + _elem_id + "into the " + event.target.getAttribute('id');
	_(elem_id).removeAttribute("draggable");
	_(elem_id).style.cursor = "Default";
	droppedIn = true;
}
function drag_end(event){
	if(droppedIn == false){
		_('app_status').innerHTML = "you let the " + event.target.getAttribute('id') + "go.";
	}
	droppedIn = false;
}

function readDropZone(){
    for(var i=0; i < _("drop_zone").children.length; i++){
        alert(_("drop_zone").children[i].id+" is in the drop zone");
    }
    /* Run Ajax request to pass any data to your server */
}