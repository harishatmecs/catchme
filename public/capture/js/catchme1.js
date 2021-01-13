$('body').on('click', function(e) {  
    if ( e.ctrlKey && e.altKey) { 
         html2canvas(document.body).then(function (canvas) { 
            //canvas.id = "catchMeCanvasImage";
            //canvas.className = "canvasToggleCircle";
            // canvas width
            var canvasWidth = canvas.width;
            // canvas height
            var canvasHeight = canvas.height; 
            //$(".catchMeScreenContainer").html(canvas);  
            toggleCatchMeContainer('show','catchMeScreenContainer');
            // Generate Image
            var imgCanvas2 = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height,'png');

            // var imgCanvas2 = Canvas2Image.convertToImage(
            //   canvas,
            //   canvasWidth,
            //   canvasHeight
            // );
            imgCanvas2.className = "catchMeCanvasImage"; 
            
            


            // Create Canvas Element 
            this.elementCanvas = document.createElement('canvas');
            $(this.elementCanvas)
            .attr('id', 'catchMeCanvas') 
            .width(canvasWidth)
            .height(canvasHeight)
            .appendTo('.catchMeCapturedScreen');
            //this.context = this.elementCanvas.getContext("2d");
            var canvas1  = document.getElementById("catchMeCanvas");
            var context1 = canvas1.getContext('2d');
            // Load image on canvas
            var img = new Image(); 
            img.onload = function (e)
            {
                context1.drawImage(img, 0,0,img.width,img.height );
            }
            img.src = 'https://www.tutorialspoint.com/images/seaborn-4.jpg?v=2'; // working src
            //var dataURL = canvas1.toDataURL({ pixelRatio: 3 })
            //var dataURL = canvas1.toDataURL("image/jpeg", 1.0);
            //var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
            //img.src = imgCanvas2.src;
             
    



            //var dataURL = canvas.toDataURL("image/jpeg", 1.0);
            //var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
             
              //var img1 = new Image();
             // img1.src = dataURL;
            //  var timestamp = new Date().getTime();
            // img1.setAttribute('crossOrigin', 'anonymous');
            // img.src = dataURL + '?' + timestamp; 
 
            //  var canvas1 = document.createElement("canvas");
            //  canvas1.width = canvasWidth;
            //  canvas1.height = canvasHeight;
            //  canvas1.getContext("2d").drawImage(img, 0, 0);
             
            //  var canvas5 = document.getElementsByClassName("catchMeCanvas");
            //  var ctx = canvas5.getContext("2d");
            //  ctx.fillStyle = "rgba(125, 46, 138, 0.5)";
            //  ctx.fillRect(25,25,100,100); 
            //  ctx.fillStyle = "rgba( 0, 146, 38, 0.5)";
            //  ctx.fillRect(58, 74, 125, 100);

            
            //     document.getElementsByClassName("catchMeCapturedImage").src = canvas5.toDataURL();
            //     Canvas2Image.saveAsPNG(canvas5);
            

            //  $('body').append(canvas1);
            //$(".catchMeCapturedScreen").html(img);
          });
        
        
        
        
        
        
        


//         var canvas = document.getElementsByClassName("catchMeCanvas");
// var context = canvas.getContext("2d");

// var myImg = new Image();
// myImg.src = 'https://www.tutorialspoint.com/images/seaborn-4.jpg?v=2';
// myImg.onload = function() {
//    this.context.drawImage(myImg, 1000,1000);
// };

 
        // img1.src = 'ringo-ftw.jpg';
       

        
        // html2canvas(document.body).then(function (canvas) {
        //     //canvas.id = "catchMeCanvasImage";
        //     //canvas.className = "canvasToggleCircle";
        //     // canvas width
        //     var canvasWidth = canvas.width;
        //     // canvas height
        //     var canvasHeight = canvas.height; 
        //     //$(".catchMeScreenContainer").html(canvas);  
        //     toggleCatchMeContainer('show','catchMeScreenContainer');
        //     // Generate Image
        //     var img = Canvas2Image.convertToImage(
        //       canvas,
        //       canvasWidth,
        //       canvasHeight
        //     );
        //     img.className = "catchMeCanvasImage";  
        //     //var dataURL = canvas.toDataURL("image/jpeg", 1.0);
        //     //var dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
             
        //       //var img1 = new Image();
        //      // img1.src = dataURL;
        //     //  var timestamp = new Date().getTime();
        //     // img1.setAttribute('crossOrigin', 'anonymous');
        //     // img.src = dataURL + '?' + timestamp; 
 
        //     //  var canvas1 = document.createElement("canvas");
        //     //  canvas1.width = canvasWidth;
        //     //  canvas1.height = canvasHeight;
        //     //  canvas1.getContext("2d").drawImage(img, 0, 0);
             
        //      var canvas5 = document.getElementsByClassName("catchMeCanvas");
        //      var ctx = canvas5.getContext("2d");
        //      ctx.fillStyle = "rgba(125, 46, 138, 0.5)";
        //      ctx.fillRect(25,25,100,100); 
        //      ctx.fillStyle = "rgba( 0, 146, 38, 0.5)";
        //      ctx.fillRect(58, 74, 125, 100);

            
        //         document.getElementsByClassName("catchMeCapturedImage").src = canvas5.toDataURL();
        //         Canvas2Image.saveAsPNG(canvas5);
            

        //      $('body').append(canvas1);
        //     //$(".catchMeCapturedScreen").html(img);
        //   });
    } 
  });
// Converts image to canvas; returns new canvas element
 
$(document).ready(function () { 
    addStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');  
    addStyleSheet('catchme.css');
    loadScript("html2canvas.min.js", function(){});
    loadScript("canvas2image.js", function(){});
    loadHTML(); 

});
//=================
// Common functions
function loadScript(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
function addStyleSheet(fileName) { 
    var head = document.head;
    var link = document.createElement("link"); 
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName; 
    head.appendChild(link);
} 
function loadHTML(){
    var modalHTML="<div class='catchMeScreenContainer hide'>";
    modalHTML+="<div class='catchMeCloseMainContainer'></div>";    
    modalHTML+="<div class='catchMeToolbar'>"; 

    modalHTML+="<ul class='catchMeToolbarItems'>";
    modalHTML+="<li class='catchToolbarItem' id='Arrow' title='Arrow'><i class='fa fa-long-arrow-right'></i></li>";
    modalHTML+="<li class='catchToolbarItem active' id='Text' title='Text'><i class='fa fa-font'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Square' title='Square'><i class='fa fa-square-o'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Circle' title='Circle'><i class='fa fa-circle-o'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Pen' title='Pen'><i class='fa fa-pencil'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Pointer' title='Pointer'><i class='fa fa-circle'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Line' title='Line'><i class='fa fa-ellipsis-h'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Color' title='Color'><input type='color' class='catchMePointerColor' value='#ff0000' /></li>";
    modalHTML+="<li class='catchToolbarItem' id='Undo' class='undoCatchMePoints' title='Undo'><i class='fa fa-undo'></i></li>"; 
    modalHTML+="<li class='catchToolbarItem' id='Submit' title='Submit the Ticket' style='padding:1px 0.8em;background: #337ab7;'><i><a class='catchMeRequestForm'>Submit</a></i></li>";
    modalHTML+="</ul>"; 


      modalHTML+="<div class='inputGroup'>";
      modalHTML += '<label>Marker Type:</label><select class="catchMeSelect catchMePointerType">'; 
      modalHTML += '<option name="Pointer" value="Pointer">Pointer</option>'; 
      // modalHTML += '<option name="Line" value="Line">Line</option>';
      // modalHTML += '<option name="Draw" value="Draw">Draw</option>'; 
      modalHTML += '</select>'; 
      modalHTML += '<label>Color:</label><select class="catchMeSelect catchMePointerColor">'; 
      modalHTML += '<option name="red" value="red">Red</option>'; 
      modalHTML += '<option name="black" value="black">Black</option>'; 
      modalHTML += '<option name="blue" value="blue">Blue</option>'; 
      modalHTML += '<option name="green" value="green">Green</option>';
      modalHTML += '<option name="yellow" value="yellow">Yellow</option>'; 
      modalHTML += '<option name="gray" value="gray">Gray</option>'; 
      modalHTML += '</select>'; 
      modalHTML += '<label>Width:</label><select class="catchMeSelect catchMePointerWidth">';  
      modalHTML += '<option name="3" value="3">3</option>';
      modalHTML += '<option name="5" value="5">5</option>'; 
      modalHTML += '<option name="7" value="7">7</option>';
      modalHTML += '<option name="9" value="9">9</option>'; 
      modalHTML += '<option name="11" value="11">11</option>'; 
      modalHTML += '</select>'; 
      modalHTML += '<button class="undoCatchMePoints" style="margin-left: 5px;">Undo</button>';
      modalHTML += '<button class="catchMeRequestForm" style="margin-left: 5px;">Raise Ticket</button>'; 
      modalHTML+="</div>";  
    modalHTML+="</div>";
    modalHTML+="<div class='catchMeRaiseTicketContainer hide'></div>"; 
    modalHTML+='<div class="catchMeCapturedScreen"></div>'; 
    modalHTML+="<img class='catchMeCapturedImage'  style='display:none'></img>"; 
    
    modalHTML+="</div>"; 
    $("body").append(modalHTML); 
} 
function toggleCatchMeContainer(toggleType, containerName){ 
    if (toggleType === "show") {
        $("."+containerName).removeClass("hide").addClass("show"); 
    } else {
        $("."+containerName).removeClass("show").addClass("hide");  
    }
}
 