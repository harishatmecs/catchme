var ramdomArrayIds=[];
var ramdomDrawPenArrayIds=[];
var mousePressed = false;
var lastX = null, lastY= null;
var countCanvasClicks = 1;
var previousTabItemId="Text";
var activeRandomId="";
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
    modalHTML+="<li class='catchToolbarItem' id='Undo' title='Undo'><i class='fa fa-undo'></i></li>"; 
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
    modalHTML+="<div class='catchMeCapturedScreen'></div>"; 
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
function generateUniqId() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < 5; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function dragCatchMeElement(elmnt) {
  //console.log('dragCatchMeElement')
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); 
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); 
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() { 
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;  
    return false;
  }
} 
function generateTextareaWithButton(randomId, userSelectMarkertype){ 
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  var randomCatchMeMarker = document.getElementById(randomId);
  // 1. remove button
  var buttonClose = document.createElement("a"); 
  buttonClose.className = "catchMeRemovePointer";
  buttonClose.setAttribute('data-id' , randomId);

  // 2. textarea 
  var inputPointerArea = document.createElement("div"); 
  inputPointerArea.setAttribute('data-id' , randomId);
  inputPointerArea.setAttribute('contenteditable', 'true');  
  
  //======================================= 
  //Pointer creation
  if(userSelectMarkertype=="Pointer"){ 
    inputPointerArea.setAttribute("style", "border-color:"+userSelectMarkerColor+"");
    inputPointerArea.className = "catchMeInputContainer";  // textarea class change based on the marker
  } else if(userSelectMarkertype=="Line" || userSelectMarkertype=="Pen"){  
    //console.log('dddddddd')
    // drawCatchMePenShape($this,randomId,x,y,false); 
  } else if(userSelectMarkertype=="Text"){ 
    inputPointerArea.className = "catchMeTextContainer highlightText";  // textarea class change based on the marker
    inputPointerArea.innerHTML="Type something"; 
  } 
  //======================================= 
 
  
  if(userSelectMarkertype=="Text"){ 
    randomCatchMeMarker.appendChild(inputPointerArea); 
  } else if(userSelectMarkertype=="Arrow" || userSelectMarkertype=="Line"){  
  } else{
    //randomCatchMeMarker.appendChild(buttonClose);
    //randomCatchMeMarker.appendChild(inputPointerArea); 
  } 
}
function createCatchMePointer(e,randomId,r,o,y,x){
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  //var userSelectMarkerWidth=$('.catchMePointerWidth').val();
  $("<div />", {
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
        appendTo: e // append to #image_preview!
      }); 
}
function createCatchMeArrow(x1,y1, x2,y2,randomId){
  var userSelectMarkerColor=$('.catchMePointerColor').val(); 
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';  
  var arrowSymbol = $('<div>')
    .appendTo('.catchMeCapturedScreen')
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
  return arrowSymbol;
}
function createCatchMeStraightLine(x1,y1, x2,y2,randomId){
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  var userSelectMarkerWidth=$('.catchMePointerWidth').val();
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';  
  var straightLine = $('<div>')
    .appendTo('.catchMeCapturedScreen')
    .addClass('catchMeStraightLine')  
    .css({
      'position': 'absolute',
      '-webkit-transform':  transform,
      '-moz-transform':     transform,
      'transform':          transform,
      'background':userSelectMarkerColor,
      'height':userSelectMarkerWidth,
    })
    .width(length)
    .offset({left: x1, top: y1});  
    straightLine.attr('id', randomId);
  return straightLine;
} 
function drawCatchMePenShape(e,randomId,parentId,x, y, isDown) {
  var randomId=generateUniqId();
  var userSelectMarkerColor=$('.catchMePointerColor').val();
  var userSelectMarkerWidth=$('.catchMePointerWidth').val(); 
  var r = parseInt(16, 10);  
  $("<div />", {
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
    appendTo: e // append to #image_preview!
  }); 
  lastX = x; lastY = y; 
}
function createCatchMeText(e,randomId,r,o,y,x){
  var userSelectMarkerColor=$('.catchMePointerColor').val(); 
  $("<div />", {
        "class": "cathMeTextHolder",
        "id":randomId,
        css: {
          top: y,
          left: x,
          // width: r * 2,
          // height: r * 2, 
          color:userSelectMarkerColor 
        },
        appendTo: e // append to #image_preview!
      }); 
}


//==================================================
// Generate radius pointers and display round symbol
var AppRoundRadiusValues = AppRoundRadiusValues || {};
AppRoundRadiusValues.points = [];  
$(document).ready(function () {    
  addStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');  
  addStyleSheet('catchme.css');
  //loadScript("jquery.min.js", function(){});
  loadScript("html2canvas.min.js", function(){});
  loadScript("canvas2image.js", function(){});
  loadHTML(); 
  toggleCatchMeContainer('hide','catchMeScreenContainer');
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
        ramdomArrayIds = ramdomArrayIds.filter(e => e !== getRecentId); 
        $("#"+getRecentId).remove();  
        $("."+getRecentId).remove(); 
      }
    }
  });
  // Delete Text component 
  $(document).on('keyup','.catchMeArrow, .catchMeTextContainer,cathMeCircle',function(e){ 
    console.log(e.keyCode)
    if(e.keyCode == 46) {
      var textinputId =  $(this).attr("data-id"); 
      if (typeof textinputId === typeof undefined && textinputId === false) {
        textinputId =  $(this).attr("id");
      }  
      $("#"+textinputId).remove(); 
    }
  });
  // Clear all points
  $(document).on('click','.clearAllPointers',function(e){ 
    e.preventdefault();  
    AppRoundRadiusValues.points.push({});
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
    $(".catchMeCloseMainContainer").remove();
    $(".catchMeToolbar").remove();
    $(".catchMeRemovePointer").remove();
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
    var clickableAreaClassName = $(ev.target).attr('class');  
    var userSelectedRandomId = $(ev.target).attr("data-id");
    var userSelectMarkertype=$(".catchToolbarItem.active").attr('id'); 
    console.log('Canvas Area onclick',clickableAreaClassName) 

    // 1. Text
    if(clickableAreaClassName.indexOf("catchMeTextContainer")!=-1){ 
      $('.catchMeTextContainer').removeClass("selectText").removeClass("highlightText");
      $('#'+userSelectedRandomId + ' .catchMeTextContainer').addClass("selectText"); 
     // dragCatchMeElement(document.getElementById(userSelectedRandomId)); 
      return;
    }
    
    
    // avoid to mark inside the textarea
    if(clickableAreaClassName.indexOf("catchMeCanvasImage")!=-1){       
      // Remove all Text highlights
      $('.catchMeTextContainer').removeClass("selectText").removeClass("highlightText");

      // After click outside of the screen, don't generate any marker. countCanvasClicks helps
      if(userSelectMarkertype=="Text" && activeRandomId!=userSelectedRandomId){
        countCanvasClicks++; 
      } else {
        // Other than Text
        countCanvasClicks=2;
      }
      if(countCanvasClicks>1){ 
        countCanvasClicks=0;
        // Generate random id
        var randomId=generateUniqId();
        ramdomArrayIds.push(randomId); 
        // Page current position
        var pageX=ev.pageX;
        var pageY = ev.pageY;
        const $this = $(this),
          r = parseInt(16, 10), 
          o = $this.offset(),
          y = pageY - o.top,
          x = pageX - o.left; 
        //======================================= 
        //1. Pointer creation
        if(userSelectMarkertype=="Pointer"){ 
          createCatchMePointer($this,randomId,r,o,y,x);
        } else if(userSelectMarkertype=="Arrow"){ 
          // 2. Straight line creation 
          if (lastX == null){
            lastX = pageX; lastY = pageY;
          } else {
            createCatchMeArrow(lastX,lastY,pageX,pageY, randomId);
            lastX = lastY = null;
          } 
        } else if(userSelectMarkertype=="Line"){ 
          // Straight line creation 
          if (lastX == null){
            lastX = pageX; lastY = pageY;
          } else {
            createCatchMeStraightLine(lastX,lastY,pageX,pageY, randomId);
            lastX = lastY = null;
          } 
        } else if(userSelectMarkertype=="Pen"){  
        // drawCatchMePenShape($this,randomId,x,y,false); 
        } else if(userSelectMarkertype=="Text"){ 
          //isTextFocused=true;
          createCatchMeText($this,randomId,r,o,y,x);
        } 
        generateTextareaWithButton(randomId, userSelectMarkertype); 
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
    } else if(clickableAreaClassName.indexOf("catchMeArrow")!=-1){  
      //return;
    } else if(clickableAreaClassName!='catchMeCanvasImage'){
      // avoid pointer to generate textarea and another pointer
     // return;
    }
    activeRandomId==userSelectedRandomId
  }); 
  $(document).on('mousedown','.catchMeCapturedScreen',function(e){
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
  $(document).on('mousemove','.catchMeCapturedScreen',function(e){
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
    } 
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