// global gui params
var numShapes = 6;
var strokeColor = '#000000';
var fillColor = [0, 0, 0];
var drawStroke = false;
var	drawFill = true;
var radius = 20;
var shape = ['circle', 'square'];
var label = 'label';

// gui
var visible = true;
var gui, gui2;

// dynamic parameters
var bigRadius;

//init a new ring object
var ring0;


//------------------------------------------------
function setup() {

   createCanvas(windowWidth, windowHeight);

  // Calculate big radius
  bigRadius = height / 3.0;

  // Create Layout GUI
  gui = createGui('P5 GUI');
  gui.addGlobals('numShapes', 'bigRadius', 'shape', 'label', 'radius',
  'drawFill', 'fillColor', 'drawStroke', 'strokeColor');


}


//------------------------------------------------
function draw() {
  //clear all
  clear();

  // init the ring object
  var ring0 = new Ring();

  //create the play line
  line(width/2, height/2, width, height/2);
 
 //rotation
  push();
  translate(width/2, height/2);
  rotate(frameCount*0.01);
  ring0.drawNodes();
  pop();

}

//------------------------------------------------
function Ring() {

  this.bigRadius = bigRadius;

  this.numShapes = numShapes;
  this.strokeColor = strokeColor;
  this.fillColor = fillColor;
  this.drawStroke = drawStroke;
  this.drawFill = drawFill;
  this.radius = radius;
  this.shape = shape;
  this.label = label;

  var centX = windowWidth * 0.5;
  var centY = windowHeight * 0.5;
  

  //-----------------
  this.drawNodes = function() {

    //draw big radius circle
      noFill();
      stroke(0);
      ellipse(0, 0, bigRadius * 2, bigRadius * 2)
    //draw nodes ina circle with a radius of big radius 



      //draw nodes on the ring
      for(var i = 0; i < numShapes; i++) {
        
        var angle = TWO_PI / this.numShapes * i;
        var r = 0;
        var x = 0 + cos(angle) * this.bigRadius;
        var y = 0 + sin(angle) * this.bigRadius;
        var d = 2 * this.radius;

      // set fill style to gui setting
        if(drawFill) {
          fill(fillColor);
        } else if (dist(mouseX, MouseY, x, y) < radius) {
          fill(225, 0, 0);

         } else {
          noFill();
        }

        // set stroke style to gui setting
        if(drawStroke) {
          stroke(strokeColor);
        } else {
          noStroke();
        }

        //pick shapes
        switch(shape) {

        case 'circle':
          ellipse(x, y, d, d);
          break;

        case 'square':
          rectMode(CENTER);
          rect(x, y, d, d);
          break;
      }
    }
  }
}
