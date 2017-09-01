  $.get('header.html', function(data){
    $('#mymodal').html(data).show();
  })


  //for sign in 
  var modal = document.getElementById('mymodal');
  var btn= document.getElementById('mybtn');
  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];
  btn.onclick = function(){
    modal.style.display ="block";
  }
  // span.onclick = function(){
  //   modal.style.display = "none";
  // }
  window.onclick = function(event){
    if(event.target == modal){
      modal.style.display ="none";
    }
  }

  //for sign up
  var signupmodal = document.getElementById('mymodalsignup');
  var mysignupbtn = document.getElementById('signupbtn');
  // var span = document.getElementsByClassName("close")[0];
  mysignupbtn.onclick = function(){
    signupmodal.style.display = "block";
  }
  // span.onclick = function(){
  //   signupmodal.style.display = "none";
  // }
  window.onclinck = function(event){
    if(event.target == signupmodal){
      signupmodal.style.display = "none";
    }
  }

//login form connect to php
  $(document).ready(function(){
    $('#loginBtn').submit(function(){
      var username = $('#username').val();
      var password = $('#password').val();
      if(username !='' && password !=''){
        $.ajax({
          url:"action.php",
          type:"POST",
          datatype:'json'
          data:{username:username,password:password},
          success:function(data){
            if(data =='No')
            {
              alert("wrong data");
            }
            else{
              $('#mymodal').hide();
              location.reload();
            }
          }
        });
      }
      else{
        alert("Please enter username and password!");
      }
      return false;
    });
  });

//   function passValidation(){
//     var reg = ("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
//     var pass = $('#password').val();
//     $('#signup_passowrd').on(function(){
//       if(pass!=reg){
//         $(this).css(border-color:red);
//       }
      
//     });
// }
