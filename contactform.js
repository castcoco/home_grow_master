$(document).ready(function () {

    var form = $('#contactform');
    var firstname = $('#firstname');
    var lastname = $('#lastname');
    var email = $('#email');
    var subject = $('#subject');
    var message = $('#message');
    var info = $('#info');
    var submit = $('#submitButton');

    function formValidation() {
        
        var valid = true;
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


        if ($.trim(firstname.val()) === "") {
            firstname.css('border-color', 'red');
            valid = false;
        }
        if ($.trim(lastname.val()) === "") {
            lastname.css('border-color', 'red');
            valid = false;
        }
        if (!regex.test(email.val())) {
            email.css('border-color', 'red');
            valid = false;
        }
        if ($.trim(subject.val()) === "") {
            subject.css('border-color', 'red');
            valid = false;
        }
        if ($.trim(message.val()) === "") {
            message.css('border-color', 'red');
            valid = false;
        }

        return valid;
    }

    submit.on('click', function (ev) {

        ev.preventDefault();

        if (formValidation()) {
            $.ajax({
                type: "POST",
                url: "contactmail.php",
                data: form.serialize(),
                dataType: "json"
            }).done(function (data) {
                if (data.success) {
                    firstname.val('');
                    lastname.val('');
                    email.val('');
                    subject.val('');
                    message.val('');
                    info.html('Your message was sent successfully!').css('color', 'green').slideDown();
                    //alert("Your message was sent successfully!");
                } else {
                    info.html('Could not send mail! Sorry!').css('color', 'red').slideDown();
                    //alert("Sorry,your message could not be delivered! Please try again!");
                }
            });
        }
    });
});