$(document).ready(function () {
    checkLoggedin();
    register();
    signin();
    $('.logoutbtn').click(logout);
});


function validation() {
    var username = $('#signUser');
    var email = $('#signEmail');
    var password = $('#signPwd');
    var valid = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ($.trim(username.val()) === "") {
        username.css('border-color', 'red');
        valid = false;
    }

    if (!regex.test(email.val())) {

        email.css('border-color', 'red');
        valid = false;
    }
    if ($.trim(password.val()) === "") {
        password.css('border-color', 'red');
        valid = false;
    }
    return valid;
}

function register() {
    $('#registerbtn').on('click', function (e) {
        e.preventDefault();
        var username = $('#signUser');
        var email = $('#signEmail');
        var password = $('#signPwd');
        password.css('border-color', '#ccc');
        email.css('border-color', '#ccc');
        username.css('border-color', '#ccc');
        $('#singuperror').empty();
       // console.log('register');
        if (validation()) {
           // console.log("validation if");
            //serialise the data
            $.post($('.modalSignUp').attr('action'),
                    $('.modalSignUp :input').serializeArray(),
                    function (info) {
                        //call back 
                       // console.log("callback");
                        $('#singuperror').empty();
                        $('.modalSignUp :input').val('');
                        $('#signuperror').html('success, please go to login!');
                    }
            );
        } else {
            //console.log("validation else");
            //serialise the data
            $('#singuperror').empty();
            $('#signuperror').html('Fail!').css('color','red');
        }
        $('.modalSignUp').submit(function () {
            return false;
        });
    })
}
;

function clear() {
    $('.modalSignUp :input').val('');
    $('div#signuperror').empty();
}

//signin
function signin() {
    $('#loginbtn').click(function (e) {
        e.preventDefault();
        var user = $('#username').val();
        var pass = $('#password').val();
        if (user === '' || (pass === '')) {
            //console.log(user, pass);
            $('#loginerror').html("Please fill in all the fields").css('color','red');
        } else {
            $.post($('.modalLogin').attr('action'),
                    $('.modalLogin :input').serializeArray(),
                    function (info) {                        
                        //console.log('Login: ' + info);                        
                        if (info === 'success') {                            
                            location.reload();
                            return;
                        }
                        
                        if (info === 'fail') {                            
                             $('.modal-content #loginerror').html('Incorrect username or password. Please try again!');                             
                        } else {                            
                            $('.modal-content #loginerror').html('An unknown error occurred. Please try later.');
                        }                      
                    }
            );
        }
    });
}


function checkLoggedin() {
    var loggedin = getCookie('loggedin');
    // hide login button
   // console.log("Logged in: " + loggedin);
    if (loggedin === 'true') {
        $('html').addClass('loggedin');
        //console.log($('html').addClass('loggedin'));
        $('.loginHide').hide();
        //enable the link for registered users
        $("li .photohide").removeClass("disabled").find("a").removeAttr("onclick");
        //enable save button and myrecord button in harvestdiary 
        $('#saveBtn').prop("disabled", false);
        $('#myRecord').prop("disabled", false);
    } else {
        //hide logout button
        $('html').removeClass('loggedin');
        $('.logoutHide').hide();

        //disable the link for un-registered users
        $("li .photohide").addClass("disabled").find("a").attr("onclick", "return false;");
        //disable save button and myrecord button if the user isn't logged in
        $('#saveBtn').prop("disabled", true);
        $('#myRecord').prop("disabled", true);
    }
};

function logout() {
    alert("You've successfully logged out!");
}

//to save the cookies
// cookies function extracted from stawflow :https://stackoverflow.com/a/22852843/8338548
function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}
