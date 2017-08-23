// for photo upload
(function(){
var files = $('#files');

$('#fileupload').fileupload({
  url:'imagetestdb.php',
  dropZone:'#droparea',
  dataType:'json',
  autoUpload:false
}).on('fileuploadadd', function(e,data){
  //verify file
  var fileTypeAllowed = /.\.(gif|jpg|png|jpeg)$/i;
  var fileName =data.originalFiles[0]['name'];
  var fileSize =data.originalFiles[0]['size'];
  
  if (!fileTypeAllowed.test(fileName))
    $('#error').html('Only images are allowed!');
  else if(fileSize > 1000000)
    $('#error').html("your file size is too large!");
  else {
    $('#error').html('');
    data.submit();
  }
}).on('fileuploaddone', function(e, data){
  console.log(data);
  var status = data.jqXHR.responseJSON.status;
  var msg = data.jqXHR.responseJSON.msg;

  if (status == 1){
    var path = data.jqXHR.responseJSON.path;
    $('#files').fadeIn().append('<p class="fileAppend"><img style="width:200px;height:200px;" src ="'+ path +'"/><input type="submit" class="remove" value="Delete Image" name="submit"></p>');
    $(".remove").click(function(){
      var status =confirm("Are you sure to remove the image?") 
     //$(this).parent(".fileAppend").remove();
      if(status==true){
        
        var fileDelete = $(".fileAppend").data(path);
        console.log(path);
        $(".fileAppend").remove();
        $.ajax({
          type:'POST',
          url:'deleteimage.php',
          data:{fileDelete:fileDelete},
          success:function(data){
           alert('image is deleted!');
           if(data!='')
           {
            $('#fileAppend').html(''); 
           }
          }
        });
      };
      });
  }else
    $('#error').html(msg);
}).on('fileuploadprogressall', function(e, data){
  // console.log(data);
  var progress = parseInt(data.loaded / data.total * 100, 10);
  $('#progress').html('Completed:' + progress + '%');
});
  
});


