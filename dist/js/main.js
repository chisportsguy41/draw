var draw = (function() {

  //Get the height and width of the main we will use this set canvas to the full
  //size of the main element.
  var mWidth = document.querySelector('main').offsetWidth,
  mHeight = document.querySelector('main').offsetHeight,

  //Create the canvas
  canvas = document.createElement("canvas"),

  //Create the context
  ctx = canvas.getContext("2d"),

  //Create the initial bounding rectangle
  rect = canvas.getBoundingClientRect(),

  //current x,y position
  x=0,
  y=0;

  //starting x,y
  var x1=0;
  var y1=0;

  //ending x,y
  var x2=0;
  var y2=0;

  //What shape are we drawing?
  var shape='';

  //Tracks the last x,y state
  var lx = false;
  var ly = false;

  //Tracks whether the user is drawing
  var isDrawing = false;

  return {
    //Set the x,y coords based on current event data
    setXY: function(evt) {
      //track the last x,y position before setting the current position
      lx=x;
      ly=y;

      //Set the current x,y position
      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top) - canvas.offsetTop;
    },

    //Write the x,y coods to the target div
    writeXY: function() {
      document.getElementById('trackX').innerHTML = 'X: ' + x;
      document.getElementById('trackY').innerHTML = 'Y: ' + y;
    },

    //set where the rectangle starts
    setStart: function() {
      x1=x;
      y1=y;
    },

    //set where rectangle ends
    setEnd: function() {
      x2=x;
      y2=y;
    },

    setShape: function(shp) {
      shape=shp;
    },

    setIsDrawing: function(bool) {
      isDrawing = bool;
    },

    draw: function() {
      ctx.restore();
      if(shape==='rectangle'){
        this.drawRect();
      } else if(shape==='line') {
        this.drawLine();
      } else if(shape==='circle') {
        this.drawCircle();
      } else if(shape==='path') {
        this.drawPath();
      } else {
        alert('Please choose a shape');
      }
      ctx.save();
    },

    //Draw a line
    drawLine: function() {
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    },

    //Draw a rectangle
    drawRect: function() {
      //Draw some sample rectangles
      ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
      ctx.fillRect (x1, y1, (x2-x1), (y2-y1));
    },

    //"draw" a circle
    drawCircle: function() {
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

      let a = (x1-x2)
      let b = (y1-y2)
      let radius = Math.sqrt( a*a + b*b );

      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    },

    drawPath: function() {
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x, y);
      ctx.stroke();
    },

    getCanvas: function(){
      return canvas;
    },

    getShape: function() {
      return shape;
    },

    getIsDrawing: function() {
      return isDrawing;
    },

    //Initialize the object, this must be called before anything else
    init: function() {
      canvas.width = mWidth;
      canvas.height = mHeight;
      document.querySelector('main').appendChild(canvas);
    }
  };
})();

//Initialize draw
draw.init();

//Add a mousemove listener to the canvas
//When the mouse reports a change of position use the event data to
//set and report the x,y position on the mouse.
draw.getCanvas().addEventListener('mousemove', function(evt) {
  draw.setXY(evt);
  draw.writeXY();
  if(draw.getShape()=='path' && draw.getIsDrawing()===true) {
    draw.draw();
  }
}, false);

document.getElementById('btnLine').addEventListener('click',function(){
  draw.setShape('line');
}, false);

document.getElementById('btnRect').addEventListener('click',function(){
  draw.setShape('rectangle');
}, false);

document.getElementById('btnCirc').addEventListener('click',function(){
  draw.setShape('circle');
}, false);

document.getElementById('btnPath').addEventListener('click',function(){
  draw.setShape('path');
}, false);

//Set the starting position
draw.getCanvas().addEventListener('mousedown', function() {
  draw.setStart();
  draw.setIsDrawing(true);
}, false);

draw.getCanvas().addEventListener('mouseup', function() {
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
}, false);
