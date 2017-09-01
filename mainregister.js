$(document).ready(function(){
  checkLoggedin();
  register();
  $('.logoutbtn').click(logout);
});

function register(){
$('#registerbtn').click(function(e){
e.preventDefault();
  console.log('register');
    var username = $('#signUser').val();
    var email = $('#signEmail').val();
    var password = $('#signPwd').val();
    if (username == "" || password == "" || email == "" ){
      $('div#singuperror').text("Please fill in all the fields");
    }else{
      //serialise the data
      $.post( $('.modalSignUp').attr('action'),
      $('.modalSignUp :input').serializeArray(),
      function(info){
      //call back 
      $('div#singuperror').empty();
      $('div#signuperror').html(info);
      clear();
      }); 
    }

    $('.modalSignUp').submit( function(){
      return false;
    });
});
}		

function clear(){
	$('.modalSignUp :input').each(function(){
		$(this).val('');
	});
}


//signin
function signin(){
$('#loginbtn').submit(function(){
	var user = $('#username').val();
	var pass = $('#password').val();
  if ( user =='' || ( pass == '')){
  	console.log(user, pass);
  	$('#loginerror').html("Please fill in all the fields");
  }
  else{
    $.post( $('.modalLogin').attr('action'),
    $('.modalLogin :input').serializeArray(),      
    function(info){
      //call back 
      $('div#loginerror').html('error!');
    }); 

  $('.modalLogin').submit(function(){
    return false;
  });
 }
});
}

function remember(){
  var rememberme = $.cookie('remember');
  if (remember = 'true')
  {
    var username = $.cookie('username');
    $('#username') = val(username);
  }

  if($('#remember').is(':checked')){
    $.cookie('username', username,{expires:14});
  }
  else{
    $.cookie('username', null);
  }
};


function checkLoggedin(){
  var loggedin = getCookie('loggedin');

  console.log(loggedin);
  if(loggedin == 'true'){
    $('html').addClass('loggedin');
    console.log($('html').addClass('loggedin'));
    $('.loginHide').hide();
  }else{
    $('html').removeClass('loggedin');
    $('.logoutHide').hide();
    $('nav .gallery').hide();
  }
};


function logout(){
  alert("You've successfully logged out!");
  }

// cookies from stawflow :https://stackoverflow.com/a/22852843/8338548
function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

