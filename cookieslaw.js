
var dropcookies = false;
var cookieperiod = 14;
var cookiesname = 'bigcookies';
var cookiesVal = 'on';

function cookiesnotice(){
	var footertag = document.getElementsByTagName('footer')[0];
	var div = document.createElement('div');
	div.setAttribute('id', 'ukcookies');
	div.innderHTML = '<p>We use cookies on our website. Please read our private term policy.<a href="homegrowmaster.com/privacyterm.html"></a></p>';

	footertag.insertBefore(div, footertag.firstChild);

	document.getElementsByTagName('footer')[0].className+='cookiesline';

	devCookie(window.cookiesname, window.cookiesVal, window.cookieperiod); //create cookies

}

function devCookie(n,val,d){
	if (d){
		var date = new Date();
		date.setTime(date.getTime()+(d*24*60*60*1000));
		var expires = ";expires="+date.toGMTString();
	}
	else var expires="";
	if(window.dropcookies){
		document.cookie=name+"="+value+expires+";path=/";

	}
}
function checkCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
	}
function eraseCookie(name) {
	devCookie(name,"",-1);
}

window.onload = function(){
	if(checkCookie(window.cookiename) != window.cookiesVal){
	cookiesnotice();
}
}
function removeMe(){
	var element = document.getElementById('ukcookies');
	element.parentNode.removeChild(element);
}