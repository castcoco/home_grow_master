$(document).ready(function(){
  checkLoggedin();
  register();
  signin();
  //validation();
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
      $('div#singuperror').html("Please fill in all the fields").css('color','red');
    }else{
        //serialise the data
        $.post( $('.modalSignUp').attr('action'),
        $('.modalSignUp :input').serializeArray(),
        function(info){
        //call back 
        $('div#singuperror').empty();
        $('div#signuperror').html('Fail!');
        clear();
        }); 
      }
      $('.modalSignUp').submit(function(){
        return false;
      });
  })
};		

function clear(){
	$('.modalSignUp :input').val('');
  $('div#signuperror').empty();
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
        $('.modal-content #loginerror').html('Login fail!');
      }); 

    $('.modalLogin').submit(function(){
      return false;
    });
   }
  });
}


function checkLoggedin(){
  var loggedin = getCookie('loggedin');
  // hide login button
  console.log(loggedin);
  if(loggedin == 'true'){
    $('html').addClass('loggedin');
    console.log($('html').addClass('loggedin'));
    $('.loginHide').hide();
    //enable the link for registered users
    $("li .photohide").removeClass("disabled").find("a").removeAttr("onclick");
    //enable save button and myrecord button in harvestdiary 
    document.getElementById('saveBtn').disabled=false;
    document.getElementById('myRecord').disabled=false;
  }else{
    //hide logout button
    $('html').removeClass('loggedin');
    $('.logoutHide').hide();

    //disable the link for un-registered users
    $("li .photohide").addClass("disabled").find("a").attr("onclick", "return false;");
    //disable save button and myrecord button if the user isn't logged in
     document.getElementById('saveBtn').disabled=true;
     document.getElementById('myRecord').disabled=true;
  }
};



function logout(){
  alert("You've successfully logged out!");
  }

//to save the cookies
// cookies function extracted from stawflow :https://stackoverflow.com/a/22852843/8338548
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
