//globals
var radius;
var nodes = [];
var numNodes = 100;
var bigRadius;
var bigCenterX;
var bigCenterY;
var fillColor;

var speed;

//gui
var visible = true;
var gui;


//-------------------------------------------------------------------------
function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  //ring settings
  bigRadius = width/5;
  bigCenterX = width/2;
  bigCenterY = height/2;
  speed = 5;
  radius = 50;

  //Create Layout GUI
  gui = createGui('P5 GUI');
  gui.addGlobals('numNodes', 'bigRadius', 'speed');
  
  // draw circles on ring  ---- > move this to the ring object
    for(var i = 0; i < numNodes; i++) {

      var angle = TWO_PI / numNodes * i;
      var x = bigCenterX + cos(angle) * bigRadius;
      var y = bigCenterY + sin(angle) * bigRadius;
      var d = 2 * radius;


      nodes.push(new Node(x, y, radius));

    }   
} 

//-------------------------------------------------------------------------
function draw() { 
  
  background(220);
  line(width/2, height/2, width, height/2);
  
  for(var j = 0; j < nodes.length; j++) {
    
			//SET FILL AND DISPLAY EACH NODE
      nodes[j].isOver();
      nodes[j].display();
    	
    
    	//ROTATES NODES
     	var angle = TWO_PI / numNodes * j;
    	nodes[j].x = bigCenterX + bigRadius * cos(angle + frameCount*(0.001 * speed));
    	nodes[j].y = bigCenterY + bigRadius * sin(angle + frameCount* (0.001 * speed));
  }
  
}


//-------------------------------------------------------------------------
function Node (x, y, radius) {
	//constructor
  this.x = x;
  this.y = y;
  this.radius = radius;
  

  
	this.display = function () {
  	ellipse(this.x, this.y, radius, radius);
  }
  
  //changes color on condition
  this.isOver = function() { 
      if (this.y > (height/2 - this.radius/2) && this.y < (height/2 + this.radius/2) && this.x > width/2) {
      
      fill(225,0,0);
    } else {
    	fill(0);
    }
  }
}



//to do 

//add speed control

//make 'ring' classs with nested nodes 

//add sound