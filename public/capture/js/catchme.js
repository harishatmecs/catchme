var ramdomArrayIds=[];
var ramdomDrawPenArrayIds=[];
var mousePressed = false;
var lastX = null, lastY= null;
var countCanvasClicks = 1;
var previousTabItemId="Text";
var activeRandomId="";
var elementOfRectangleDiv = null;
var mousePositionObj = { x: 0,y: 0,startX: 0,startY: 0};
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
    modalHTML+="<div class='catchMeToolbar'>"; 
    modalHTML+="<ul class='catchMeToolbarItems'>";
    modalHTML+="<li class='catchToolbarItem active' id='Text' title='Text'><i class='fa fa-font'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Rectangle' title='Rectangle'><i class='fa fa-square-o'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Circle' title='Circle'><i class='fa fa-circle-o'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Pointer' title='Pointer'><i class='fa fa-circle'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Line' title='Line'><i class='fa fa-ellipsis-h'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Arrow' title='Arrow'><i class='fa fa-long-arrow-right'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Pen' title='Pen'><i class='fa fa-pencil'></i></li>";
    modalHTML+="<li class='catchToolbarItem' id='Color' title='Color'><input type='color' class='catchMePointerColor' value='#ff0000' /></li>";
    modalHTML+="<li class='catchToolbarItem' id='Undo' title='Undo'><i class='fa fa-undo'></i></li>"; 
    modalHTML+="<li class='catchToolbarItem' id='Submit' title='Submit the Ticket' style='padding:1px 0.8em;background: #337ab7;'><i><a class='catchMeRequestForm'>Submit</a></i></li>";
    modalHTML+="</ul>"; 
    modalHTML+="<div class='catchMeCloseMainContainer' title='Close Window'><i class='fa fa-close'></i></div>"; 
    modalHTML+="</div>";
    modalHTML+="<div class='catchMeRaiseTicketContainer hide'></div>";
    modalHTML+="<div class='catchMeCapturedScreen'></div>"; 
    modalHTML+="</div>"; 
    $("body").append(modalHTML); 
} 
function generateUniqId() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < 5; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function setMousePosition(e) {
  var ev = e || window.event; //Moz || IE 
  if (ev.pageX) { //Moz
    mousePositionObj.x = ev.pageX + window.pageXOffset;
    mousePositionObj.y = ev.pageY + window.pageYOffset;
  } else if (ev.clientX) { //IE
    mousePositionObj.x = ev.clientX + document.body.scrollLeft;
    mousePositionObj.y = ev.clientY + document.body.scrollTop;
  } 
};
function toggleCatchMeContainer(toggleType, containerName){ 
    if (toggleType === "show") {
        $("."+containerName).removeClass("hide").addClass("show"); 
    } else {
        $("."+containerName).removeClass("show").addClass("hide");  
    }
}
function removeCatchMeElement(getRecentId){  
  console.log(getRecentId)
  ramdomArrayIds = ramdomArrayIds.filter(e => e !== getRecentId);
  var attrClass = $("#"+getRecentId).attr('class');
  if(attrClass.indexOf("cathMeDot")!=-1){ 
    attrClass=attrClass.replace("cathMeDot ", "");
    $(".catchMeCapturedScreen ."+attrClass).remove(); 
  }
  $(".catchMeCapturedScreen #"+getRecentId).remove();  
  $(".catchMeCapturedScreen ."+getRecentId).remove();
}  
// Creating Marker Pointers
function createCatchMeText(e,randomId,r,o,y,x){
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  console.log('userSelectMarkerColor=',userSelectMarkerColor) 
  var newTextDiv=$("<div />", {
        "class": "cathMeTextHolder",
        "id":randomId,
        css: {
          top: y,
          left: x, 
          color:userSelectMarkerColor 
        },
       // appendTo: e 
      }); 
    $(".catchMeCapturedScreen").append(newTextDiv); 
}
//Arrow,Rectangle,Circle, Line
function createCatchMeShapes($this,randomId,userSelectMarkertype,x,y){
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  var markerClass = "catMeRectangle";
  if(userSelectMarkertype=="Circle"){
    markerClass = "catchMeCircle";
  } else if(userSelectMarkertype=="Line"){
    markerClass = "catchMeStraightLine";
  } else if(userSelectMarkertype=="Arrow"){
    markerClass = "catchMeArrow";
  }

  mousePositionObj.startX = x;
  mousePositionObj.startY = y;           
  // Create div temp element for rectangle
  elementOfRectangleDiv = document.createElement('div');
  elementOfRectangleDiv.className = markerClass;
  elementOfRectangleDiv.setAttribute('id' , randomId);
  elementOfRectangleDiv.style.left = x + 'px';
  elementOfRectangleDiv.style.top = y + 'px';
  elementOfRectangleDiv.style.cursoe = "crosshair"; 
  elementOfRectangleDiv.style.borderColor = userSelectMarkerColor;
  elementOfRectangleDiv.style.borderWidth = 3; 
  // Same attributes append to captured screen
   var newRectangleDivObj= $("<div />", {
      "class": markerClass,
      "id":randomId,
      css: { 
        top:y + 'px',
        left: x + 'px',
        cursor: "crosshair",
        borderColor:userSelectMarkerColor,
        borderWidth:3,
        '--catchMe-color':userSelectMarkerColor,
      },
      //appendTo: $this 
    });
    $(".catchMeCapturedScreen").append(newRectangleDivObj); 
}
function createCatchMePointer(e,randomId,r,o,y,x){
  var userSelectMarkerColor=$('.catchMePointerColor').val(); 
  var newPointerDivObj=$("<div />", {
        "class": "cathMeCircle",
        "id":randomId,
        css: {
          top: y,
          left: x,
          width: r * 2,
          height: r * 2, 
          borderColor:userSelectMarkerColor,
          borderWidth:3
        },
        //appendTo: e 
  }); 
  $(".catchMeCapturedScreen").append(newPointerDivObj); 
} 
// Duplicate: Another way to create the arrow start point to end point
function createCatchMeArrow(x1,y1, x2,y2,randomId){
  var userSelectMarkerColor=$('.catchMePointerColor').val(); 
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';  
  var arrowSymbol = $('<div>')
   // .appendTo('.catchMeCapturedScreen')
    .addClass('catchMeArrow')  
    .css({
      'position': 'absolute',
      '-webkit-transform':  transform,
      '-moz-transform':     transform,
      'transform':          transform,
      'background':userSelectMarkerColor,
      'height':5,
    })
    .width(length)
    .offset({left: x1, top: y1});  
    arrowSymbol.attr('id', randomId);
    $(".catchMeCapturedScreen").append(arrowSymbol); 
  return arrowSymbol;
}
 
function drawCatchMePenShape(e,randomId,parentId,x, y, isDown) {
  var randomId=generateUniqId();
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  var userSelectMarkerWidth=$('.catchMePointerWidth').val(); 
  var r = parseInt(16, 10);  
  var newPenDivObj = $("<div />", {
    "class": "cathMeDot "+parentId,
    "id":randomId,
    css: {
      top: y,
      left: x,
    // width: r * 2,
      //height: r * 2, 
      borderColor:userSelectMarkerColor,
      borderWidth:userSelectMarkerWidth
    },
    //appendTo: e // append to #image_preview!
  });
  $(".catchMeCapturedScreen").append(newPenDivObj);  
  lastX = x; lastY = y; 
}



 

//==================================================
// Generate radius pointers and display round symbol
var AppRoundRadiusValues = AppRoundRadiusValues || {};
AppRoundRadiusValues.points = [];  
$(document).ready(function () {    
  addStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');  
  addStyleSheet('capture/css/catchme.css');
 // loadScript("capture/js/jquery.min.js", function(){});
  loadScript("capture/js/html2canvas.min.js", function(){});
  loadScript("capture/js/canvas2image.js", function(){});
  loadHTML(); 
  toggleCatchMeContainer('hide','catchMeScreenContainer');
  // Delete Text component 
  $(document.body).on('keyup', function(e) {  
    if (e.key === "Delete" || e.keyCode == 46) { 
      console.log(activeRandomId)
      removeCatchMeElement(activeRandomId)
    } 
  });
  // Toolbar active
  $(document).on('click','.catchToolbarItem',function(e){ 
    var activeToolId = $(this).attr('id');
    if(activeToolId!="Color" && activeToolId!="Undo" && activeToolId!="Submit") { 
      $( this ).parent().find( 'li.active' ).removeClass( 'active' );
      $( this ).addClass( 'active' );      
      if(activeToolId=="Text") { 
        $('.catchMeCapturedScreen').css('cursor', 'text');
      } else {
        $('.catchMeCapturedScreen').css('cursor', 'crosshair');
      }
      if(previousTabItemId!=activeToolId){
        countCanvasClicks=2;
      }
      previousTabItemId=activeToolId;
    } else if(activeToolId=="Undo"){ 
      if(ramdomArrayIds.length>0){
        var getRecentId=ramdomArrayIds[ramdomArrayIds.length-1];
        removeCatchMeElement(getRecentId); 
      }
    }
  });   
  $(document).on('click','.catchMeCloseMainContainer',function(e){   
    toggleCatchMeContainer('hide','catchMeScreenContainer');
  });  
  // create raise ticket form
  $(document).on('click','.catchMeRequestForm',function(e){  
    toggleCatchMeContainer('show','catchMeRaiseTicketContainer');
    // Create a raise request form
    var generateFormHtml = '<h2 class="title">Create Ticket</h2>';
    generateFormHtml += '<div class="inputGroup">'; 
    generateFormHtml += '<input class="input catchTicketTitle" type="text" name="first_name" placeholder="Title">';
    generateFormHtml += '</div>';
    generateFormHtml += '<div class="inputGroup">'; 
    generateFormHtml += '<textarea class="input catchTicketDesc" rows="3" placeholder="Description"></textarea>';
    generateFormHtml += '</div>';
    generateFormHtml += '<div class="inputGroup">';  
    generateFormHtml += '<select class="catchMeSelect catchMeRequestPriority">'; 
    generateFormHtml += '<option name="Priority" value="Priority">Priority</option>'; 
    generateFormHtml += '<option name="High" value="High">High</option>'; 
    generateFormHtml += '<option name="Medium" value="Medium">Medium</option>'; 
    generateFormHtml += '<option name="Low" value="Low">Low</option>'; 
    generateFormHtml += '</select>'; 
    generateFormHtml += '<select class="catchMeSelect catchMeRequestSeverity">'; 
    generateFormHtml += '<option name="Severity" value="Severity">Severity</option>'; 
    generateFormHtml += '<option name="High" value="High">High</option>'; 
    generateFormHtml += '<option name="Medium" value="Medium">Medium</option>'; 
    generateFormHtml += '<option name="Low" value="Low">Low</option>'; 
    generateFormHtml += '</select>';  
    generateFormHtml += '</div>';
    generateFormHtml += '<div class="inputGroup">'; 
    generateFormHtml += '<button class="catchMeRequestSubmit">Submit</button>';
    generateFormHtml += '<button class="catchMeRequestCancel">Cancel</button>';
    generateFormHtml += '</div>';
    $(".catchMeRaiseTicketContainer").html(generateFormHtml);
  });
  // remove the raise request form in the cornor of the screen
  $(document).on('click','.catchMeRequestCancel',function(){ 
    $(".catchMeRaiseTicketContainer").html("");
    toggleCatchMeContainer('hide','catchMeRaiseTicketContainer');
  });
  // Generate jira ticket using image and form details
  $(document).on('click','.catchMeRequestSubmit',function(e){ 
    // get form values
    var ticketTitle = $(".catchTicketTitle").val();
    var ticketDesc = $(".catchTicketDesc").val();
    var ticketPriority = $(".catchMeRequestPriority").val();
    var ticketSeverity = $(".catchMeRequestSeverity").val();
    //console.log('fgh=', ticketTitle+'='+ticketDesc+'='+ticketPriority+'='+ticketSeverity);
    // remove developer options
    $(".catchMeCloseMainContainer").hide();
    $(".catchMeToolbar").hide();
    $(".catchMeRemovePointer").hide();
    $('.catchMeInputContainer').addClass('removeTextArea');
    toggleCatchMeContainer('hide','catchMeRaiseTicketContainer');
    // remove all empty pointers 
    $(".catchMeInputContainer").each(function() {
      var inputValue = $(this).text();
      if(inputValue.length==0){
        var textinputId =  $(this).attr("data-id");
        $("#"+textinputId).remove();
      }
    }); 
    var screenCaptureObj = $(".catchMeCapturedScreen").get(0);
    html2canvas(screenCaptureObj).then(function (canvas) {  
      var canvasWidth = canvas.width; 
      var canvasHeight = canvas.height;  
      var dataURL = canvas.toDataURL("image/png", 1.0);
      // here ajax call required
      var imageRandomName= generateUniqId()+".png";
      let formData = new FormData();
      formData.append('image', dataURL);
      formData.append('imageName',imageRandomName); 
      formData.append('title', ticketTitle);
      formData.append('description',ticketDesc);
      formData.append('priority',ticketPriority);             
      fetch('http://localhost:8081/api/tickets/localStorage', {
        method: 'post',
        body: formData,
        headers: new Headers({
          'x-api-key': '123456789',
        }),
      }) 
        .then(data => { 
          if (data.status==200){
            toggleCatchMeContainer('hide','catchMeScreenContainer');
            alert("JIRA ticket created successfully!");
          } else {
            alert("Try again!");
          }           
        })
        .catch(error => {
          console.log(error);
        }); 
       //$(".catchMeCapturedScreen").html(img);
    });
  }); 
  // Creating the round shape pointer
  $(document).on('click','.catchMeCapturedScreen',function(ev){ 
    var clickableAreaClassName = $(ev.target).attr('class');  // Selected Area Class name
    var userSelectedRandomId =$(ev.target).attr("id");
    if (typeof userSelectedRandomId==='undefined'){
      userSelectedRandomId =$(ev.target).attr("data-id"); 
    }  
    var userSelectMarkertype=$(".catchToolbarItem.active").attr('id'); // Current Marker Type  
    console.log('Canvas Area onclick',clickableAreaClassName) 

    // Change Text tool classes based on Selection and Highlight
    if(clickableAreaClassName.indexOf("catchMeTextContainer")!=-1){ 
      $('.catchMeTextContainer').removeClass("selectText").removeClass("highlightText");
      $('#'+userSelectedRandomId + ' .catchMeTextContainer').addClass("selectText");
      activeRandomId=userSelectedRandomId; 
      return;
    } 
    
    // Avoid to other marker
    // Only marker should generate, when user select captured image
    if(clickableAreaClassName.indexOf("catchMeCanvasImage")!=-1){       
      // Remove all marker highlights
      $('.catchMeTextContainer').removeClass("selectText").removeClass("highlightText");
      console.log('count clicks', countCanvasClicks)
      // After click outside of the screen, don't generate any marker. countCanvasClicks helps
      if(userSelectMarkertype=="Text" && activeRandomId!=userSelectedRandomId){
        countCanvasClicks++; 
      } else {        
        countCanvasClicks=2; // Other than Text Marker
      }

      if(countCanvasClicks>1){ 
        countCanvasClicks=0;        
        var randomId=generateUniqId();// Generate and Push random id
        ramdomArrayIds.push(randomId);// Save ramdom id for Undo
        // Set current mouse position 
        mousePositionObj.startX = ev.pageX;
        mousePositionObj.startY = ev.pageY;
        // Current clicked element position
        const $this = $(this),
          r = parseInt(16, 10), 
          o = $this.offset(),
          y = mousePositionObj.startY  - o.top,
          x = mousePositionObj.startX - o.left; 
        
        // Displaing Marker Pointers on the Screen
        // 1. Text tool
        if(userSelectMarkertype=="Text"){  
          createCatchMeText($this,randomId,r,o,y,x);
          var randomCatchMeTextMarker = document.getElementById(randomId);
          var inputPointerArea = document.createElement("div"); 
          inputPointerArea.setAttribute('data-id' , randomId);
          inputPointerArea.setAttribute('contenteditable', 'true'); 
          inputPointerArea.className = "catchMeTextContainer highlightText";  // textarea class change based on the marker
          inputPointerArea.innerHTML="Type something";  
          randomCatchMeTextMarker.appendChild(inputPointerArea); 
        } 
        // Arrow,Rectangle,Circle, Line
        else if(userSelectMarkertype=="Arrow" || userSelectMarkertype=="Rectangle" || userSelectMarkertype=="Circle" || userSelectMarkertype=="Line"){   
          if (elementOfRectangleDiv !== null) {
              elementOfRectangleDiv = null; 
          } else { 
            createCatchMeShapes($this, randomId, userSelectMarkertype, mousePositionObj.startX,mousePositionObj.startY );              
          } 
        } else if(userSelectMarkertype=="Pointer"){ 
          createCatchMePointer($this,randomId,r,o,y,x);
        } else if(userSelectMarkertype=="Pen"){ }  
        //AppRoundRadiusValues.points.push({x,y,r}); 
      }
    }
    else if(clickableAreaClassName=='catchMeRemovePointer'){
      // remove individual pointers
      var pointerId =$(ev.target).attr('data-id');
      if(ramdomArrayIds.length>0){ 
        ramdomArrayIds = ramdomArrayIds.filter(e => e !== pointerId); 
        $("#"+pointerId).remove();  
      } 
    } else if(clickableAreaClassName.indexOf("catMeRectangle")!=-1){ 
       // close draw rec shapr
      if (elementOfRectangleDiv !== null) {
          elementOfRectangleDiv = null; 
      }     
    } else if(clickableAreaClassName!='catchMeCanvasImage'){
      // avoid pointer to generate textarea and another pointer
     // return;
    }
    activeRandomId=userSelectedRandomId;
  });   
  $(document).on('mousemove','.catchMeCapturedScreen',function(e){
    //console.log('mousemove')
    var userSelectMarkertype=$(".catchToolbarItem.active").attr('id');
    //var userSelectMarkertype=$('.catchMePointerType').val();
    if(userSelectMarkertype=="Pen"){ 
      var randomId=generateUniqId();
      var clsUniqeId = ramdomDrawPenArrayIds.length>0 ? ramdomDrawPenArrayIds[ramdomDrawPenArrayIds.length-1] : randomId;
      if (mousePressed) {  
        var $this = $(this),
        r = parseInt(16, 10), 
        o = $this.offset(),
        y = e.pageY - o.top,
        x = e.pageX - o.left;
        drawCatchMePenShape($this,randomId,clsUniqeId, x, y, true);
      }
    } else if(userSelectMarkertype=="Arrow" || userSelectMarkertype=="Rectangle" || userSelectMarkertype=="Circle" || userSelectMarkertype=="Line"){ 
      setMousePosition(e); 
      var userSelectMarkerColor=$('.catchMePointerColor').val();
      if (elementOfRectangleDiv !== null) { 
        var currentRectangleEleId= elementOfRectangleDiv.id;  
        var elementWidth=Math.abs(mousePositionObj.x - mousePositionObj.startX) + 'px';
        var elementHeight=Math.abs(mousePositionObj.y - mousePositionObj.startY) + 'px';
        var elementLeft = (mousePositionObj.x - mousePositionObj.startX < 0) ? mousePositionObj.x + 'px' : mousePositionObj.startX + 'px';
        var elementTop=(mousePositionObj.y - mousePositionObj.startY < 0) ? mousePositionObj.y + 'px' : mousePositionObj.startY + 'px';
  
        if(userSelectMarkertype=="Line"){ 
          elementHeight='0px'; 
          var length = Math.sqrt((mousePositionObj.startX-mousePositionObj.x)*(mousePositionObj.startX-mousePositionObj.x) + (mousePositionObj.startY-mousePositionObj.y)*(mousePositionObj.startY-mousePositionObj.y));
          var angle  = Math.atan2(mousePositionObj.y - mousePositionObj.startY, mousePositionObj.x -  mousePositionObj.startX) * 180 / Math.PI;
          var transform = 'rotate('+angle+'deg)'; 
          $('#'+currentRectangleEleId).css({
            //'-webkit-transform':  transform,
           // '-moz-transform':     transform,
            //'transform':          transform,
            'background':userSelectMarkerColor, 
            //'width': elementWidth,
            'height': elementHeight,
            'left': (mousePositionObj.x - mousePositionObj.startX < 0) ? mousePositionObj.x + 'px' : mousePositionObj.startX + 'px',
            //'top': (mousePositionObj.y - mousePositionObj.startY < 0) ? mousePositionObj.y + 'px' : mousePositionObj.startY + 'px', 
          }) 
          .width(length)
          .offset({left: elementLeft, top: elementTop}); 
        } 
        else if(userSelectMarkertype=="Arrow"){ 
          elementHeight='0px'; 
          var length = Math.sqrt((mousePositionObj.startX-mousePositionObj.x)*(mousePositionObj.startX-mousePositionObj.x) + (mousePositionObj.startY-mousePositionObj.y)*(mousePositionObj.startY-mousePositionObj.y));
          var angle  = Math.atan2(mousePositionObj.y - mousePositionObj.startY, mousePositionObj.x -  mousePositionObj.startX) * 180 / Math.PI;
          var transform = 'rotate('+angle+'deg)';  
          //$("#catchMeRemoveStyle").remove(); 
         // $('<style id="catchMeRemoveStyle">.catchMeArrow::after{border-left-color: ' + userSelectMarkerColor + ' !important;}</style>').appendTo("head");
          $('#'+currentRectangleEleId).css({
            //'-webkit-transform':  transform,
           // '-moz-transform':     transform,
            //'transform':          transform,
            'background':userSelectMarkerColor, 
            '--catchMe-color':userSelectMarkerColor,
            //'::after': 'border-left-color :  red',
            //'width': elementWidth,
            'height': elementHeight,
            'left': (mousePositionObj.x - mousePositionObj.startX < 0) ? mousePositionObj.x + 'px' : mousePositionObj.startX + 'px',
            //'top': (mousePositionObj.y - mousePositionObj.startY < 0) ? mousePositionObj.y + 'px' : mousePositionObj.startY + 'px', 
          }) 
          .width(length)
          .offset({left: elementLeft, top: elementTop}); 
        }  else {
          $('#'+currentRectangleEleId).css({
            'width': elementWidth,
            'height': elementHeight,
            'left': elementLeft,
            'top': elementTop, 
          }) 
        } 
      } 
    }
  });
  $(document).on('mousedown','.catchMeCapturedScreen',function(e){
    //console.log('mousedwon')
    var userSelectMarkertype=$(".catchToolbarItem.active").attr('id');
    //var userSelectMarkertype=$('.catchMePointerType').val();
    if(userSelectMarkertype=="Pen"){
      ramdomDrawPenArrayIds=[];
      var randomId=generateUniqId(); 
      ramdomArrayIds.push(randomId);  
      ramdomDrawPenArrayIds.push(randomId);
      mousePressed = true; 
      var $this = $(this),
          r = parseInt(16, 10), 
          o = $this.offset(),
          y = e.pageY - o.top,
          x = e.pageX - o.left;
          drawCatchMePenShape($this,randomId,randomId, x, y, false);
    }  
  });
  $(document).on('mouseup','.catchMeCapturedScreen',function(e){ 
      mousePressed = false; 
  });
  $(document).on('mouseleave','.catchMeCapturedScreen',function(e){  
      mousePressed = false; 
  });

}); 

//==================================================
// Capture the image using canvas 
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
      // Add developer options
      $(".catchMeCloseMainContainer").show();
      $(".catchMeToolbar").show();
      $(".catchMeRemovePointer").show();
      $('.catchMeInputContainer').removeClass('removeTextArea');
      // Generate Image
      var img = Canvas2Image.convertToImage(
        canvas,
        canvasWidth,
        canvasHeight
      );
      img.className = "catchMeCanvasImage";
      $(".catchMeCapturedScreen").html(img);
    });
  } 
}); 