$(document).ready(function(){
	var form = $('#contactform');	
	var firstname = $('#firstname');
	var lastname = $('#lastname');
	var email = $('#email');
	var subject = $('#subject');
	var message = $('#message');
	var info = $('#info');
	var submit = $('#submitButton');


	submit.on('click', function(ev){
		//console.log('response.blablabla')
		ev.preventDefault();
		if(formValidation()){
			$.ajax({
				type:"POST",
				url:"contactmail.php",
				data:form.serialize(),
				dataType:"json"				
			}).done(function(data){
				if(data.success){
					firstname.val('');
					lastname.val('');
					email.val('');
					subject.val('');
					info.html
					alert("Your message is sent successfully!");
				}else{
					info.html('Could not send mail! Sorry!').css('color', 'red').slideDown();
					alert("Sorry,your message could not be delivered!Please try again!");
				}
			});
		}
	});


	function formValidation(){
		var valid = true;
		var regex =  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


		if($.trim(firstname.val())===""){
			firstname.css('border-color','red');
			valid = false;
		}
		if($.trim(lastname.val())===""){
			lastname.css('border-color','red');
			valid = false;
		}
		if(!regex.test(email.val())){
			email.css('border-color','red');
			valid = false;
		}
		if($.trim(subject.val())===""){
			subject.css('border-color','red');
			valid = false;
		}
		if($.trim(message.val())===""){
			message.css('border-color','red');
			valid = false;
		}

		return valid;
	}
});