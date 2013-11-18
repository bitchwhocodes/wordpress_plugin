jQuery(document).ready(function($){
 


    $('.win8admin .download').click(processZip);
 
    var custom_uploader;
    var that = this;
    var startingWidth=150;
    var startingHeight=150;
    var index = 0;
    var images=[];
    var sizes =[];

  // Store Logo ---------------------------------------------
    sizes.push({width:50,height:50, name:'storelogo'});
    sizes.push({width:70,height:70,name:'Store70x70Logo'});
    sizes.push({width:90,height:90,name:'Store90x90Logo'});
   
    //Square logo ------------------------------------------------
    // Square Logo ---------------------------------------------
    sizes.push({width:24,height:24, name:'Square24x24Logo'});
    sizes.push({width:30,height:30,name:'smalllogo'});
    sizes.push({width:42,height:42,name:'Square42x42Logo'});
    sizes.push({width:54,height:54,name:'Square54x54Logo'});
    //Square logo ------------------------------------------------
    sizes.push({width:120,height:120,name:'Square120x120Logo'});
    sizes.push({width:150,height:150,name:'logo'});
    sizes.push({width:210,height:210,name:'Square210x210Logo'});
    sizes.push({width:270,height:270,name:'Square270x270Logo'});
    // Wide Logo-----------------------------------------------------
    sizes.push({width:248,height:120,name:'Wide248x120Logo'});
    sizes.push({width:310,height:150,name:'Wide310x150Logo'});
    sizes.push({width:434,height:210,name:'Wide434x210Logo'});
    sizes.push({width:558,height:270,name:'Wide558x270Logo'});
    // Default Tile -------------------------------------------------
    sizes.push({width:56,height:56,name:'Square56x56Logo'});
    sizes.push({width:70,height:70,name:'Square70x70Logo'});
    sizes.push({width:98,height:98,name:'Square98x98Logo'});
    sizes.push({width:126,height:126,name:'Square126x126Logo'});
    // Splash Screen ------------------------------------------------
    sizes.push({width:620,height:300,name:'splashscreen'});
    sizes.push({width:868,height:420,name:'SplashScreen868x420'});
    sizes.push({width:1116,height:540,name:'SplashScreen1116x540'});
  
    
//---------------------------------------------------------------

    function handleImage(url){

        $('.win8admin .canvas-list').empty();
        var cimage = $('.win8admin .chosen-image');

       cimage.attr({'src':url})

       startingWidth =  cimage.width();
       startingHeight =  cimage.height();
       var len = sizes.length;
       for (var i =0;i<len;i++)
       {
          var item = sizes[i];
          resizeImage(item,url,cimage[0]);
       }

       exportImages();

    }


    function resizeImage(size,url,img)
    {
        $('.win8admin .canvas-list').append("<li><h4>"+size.name+"</h4><canvas></canvas></li>");
        var li =$('.win8admin .canvas-list li').last();

        var canvas = li.find('canvas');
       
        canvas[0].width = size.width;
        canvas[0].height = size.height;
        var ctx=canvas[0].getContext("2d");
        var bgColor = $('#upload_color').val();
        ctx.fillStyle = (bgColor.length)?bgColor:"#000000";
      
        ctx.rect(0,0,size.width,size.height);
        ctx.fill();
        var resize={};
      if(size.width > startingWidth && size.height > startingHeight)
      {
           resize.width = startingWidth;
           resize.height = startingHeight;
           resize.left = (size.width - startingWidth)/2;
           resize.top = (size.height - startingHeight)/2;
    }

    if(size.height<= startingHeight)
    {
        resize.width = startingHeight;
       resize.height = startingHeight;
       resize.left = (size.width - startingHeight)/2
       resize.top = (size.height - startingHeight)/2
    }
    if(size.width<= startingWidth && size.height <= startingHeight)
    {
        resize.width = size.width;
       resize.height = size.height;
       resize.left = 0;
       resize.top = 0;

       console.log("small squre")
       console.log(size.name)
    }

      ctx.drawImage(img,0,0,startingWidth,startingHeight,resize.left,resize.top,resize.width,resize.height);

      var dataURL = canvas[0].toDataURL();
      var basePath = php_data.plugin_url;
      images.push({'item':canvas[0],'path':basePath+"/winimages/images/"+size.name+".png"})
    
    

    }

    function exportImages(){

        if(index >=images.length)
        {
            processZip();
            return;
        }else
        {
            var item = images[index];
            saveDataURL(item.item,item.path);
        }

    }

    function processZip()
    {

        
  
        var request = new XMLHttpRequest();
        var that = this;
        request.onreadystatechange = function () {
           
            if (request.readyState === 4 && request.status === 200) {
                $('.win8admin a').css('display','block');
                $('.win8admin a').attr('href',php_data.save_path+'images/win8images.zip');
            }
        };
      
        var path = php_data['save_path'];
        var basePath=php_data.plugin_url+"/winimages/images/";



        var params = "imagePath=" + encodeURIComponent(basePath);
        params+="&fileName="+encodeURIComponent(basePath+"win8images.zip");
        request.open("POST", path+"zip.php", true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(params);

    }

    function saveDataURL(canvas,fileName) {
       
        var request = new XMLHttpRequest();
        var that = this;
        request.onreadystatechange = function () {
       
            if (request.readyState === 4 && request.status === 200) {
                index++;
                exportImages();
               // window.location.href = request.responseText;
            }
        };
      
        var path = php_data['save_path'];
        console.log("PHP DATA",php_data)
        var dataURL = canvas.toDataURL();
        var params = "dataURL=" + encodeURIComponent(dataURL);
        params+="&fileName="+encodeURIComponent(fileName);
        request.open("POST", path+"save.php", true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(params);
    }
    

    $('#upload_image_button').click(function(e) {
 
        e.preventDefault();
      
 
        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }
 
        //Extend the wp.media object
      
    
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });
 
        custom_uploader.scope = that;
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
            attachment = custom_uploader.state().get('selection').first().toJSON();
            $('#upload_image').val(attachment.url);
            handleImage(attachment.url);
            
        });
 
        //Open the uploader dialog
        custom_uploader.open();
 
    });
   
 
});