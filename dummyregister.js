
$('#registerbtn').click(function(){
	if ($('#username').val() == "" || $('#password').val()== "" || $('#email').val() == "" ){
		$('div#ack').html("Please fill in all the fields");
	}
	else{
		//serialise the data
	$.post( $('#registerForm').attr('action'),
		$('#registerForm :input').serializeArray(),
		function(info){
			//call back 
			$('#ack').empty();
			$('#ack').html(info);
			clear();
		}); 
	}

	$('#registerForm').submit( function(){
		return false;
	});

});

function clear(){
	$('#registerForm :input').each(function(){
		$(this).val('');
	});
}

//signin
$('#loginsubmit').click(function(){
  if ($('#username').val() =='' || ($('#password').val() == '')){
  	$('div#ack').html("Please fill in all the fields");
  }
    
  else{
    $.post( $('#signinform').attr('action'),
    $('#signinform :input').serializeArray(),      
    function(info){
      //call back 
      $('div#ack').html(info);
    }); 

  $('#loginform').submit(function(){
    return false;
  });
}
});