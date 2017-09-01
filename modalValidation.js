function registerValidation(){
		var valid = true;
		var regex =  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
		var passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ ;

		if($.trim(username.val())===""){
			username.css('border-color','red');
			valid = false;
		}
		if(!regex.test(email.val())){
			email.css('border-color','red');
			valid = false;
		}
		if($.trim(password.val()==="" | $.trim(!passregex.test(password.val())))){
			password.css('border-color','red')
			alert("password needs at least 8 letters with 1 capital letter, small letter and special letter");
			valid = false;
		}