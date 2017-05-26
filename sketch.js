//globals
var numNodes;
var bigRadius;
var bigCenterX;
var bigCenterY;
var ring0;
var ring1;
var radius = 20;
var speed;

var playmode = 'sustain'
var sound;

//gui 
var visible = true;
var gui, gui2;
var bPlay;


//-----------------------------------------------------------------------
function preload() {
    sound = loadSound('assets/kick.wav');
}


//-----------------------------------------------------------------------
function setup() { 
  createCanvas(1000, 800);
  fill(0);
  
  //ring settings
  
   bigRadius = width/3;
   bigCenterX = width/2;
	 bigCenterY = height/2;
   speed = 5;
   numNodes = 100;
   bPlay = false;

  //Create Layout GUI 1
  gui = createGui('Controls'); //name of the gui
  gui.addGlobals('numNodes', 'bigRadius', 'speed');

  
  ring0 = new Ring();
  //ring1 = new Ring((numNodes/2), (bigRadius/2));
  ring0.createNodes() // pushes node * numNodes to ring.nodes
  //ring1.createNodes();
  
} 


//-----------------------------------------------------------------------
function draw() { 
  background(220);
  
  stroke(0);
  line(width/2, height/2, width, height/2);

  ring0.drawNodes(); // calls node.display, node.isOver for all nodes in ring.nodes AND MOVES NODES
  //ring1.drawNodes();

}




//-----------------------------------------------------------------------
function Ring() {

  //constructor
	//this.numNodes = numNodes;
  //this.bigRadius = bigRadius;
  this.nodes = [];
  
  // push nodes to this.nodes array
  this.createNodes = function() {
  
    for (var i = 0; i < numNodes; i++) {
      
      // set node position on ring
      var angle = TWO_PI / numNodes * i;
      var x = width/2 + cos(angle) * this.bigRadius;
      var y = height/2 + sin(angle) * this.bigRadius;
      
      //push node to ring.nodes array at the ring position
      this.nodes.push(new Node(x, y, radius));
     	

    }
  
  }
  
  // calls the node.display method for each node in nodes array
  this.drawNodes = function() {
  	
    for (var j = 0; j < this.nodes.length; j++) {
  
			
      this.nodes[j].isOver();
  		this.nodes[j].display();
      
      
      //ROTATE THE NODES
      var angle = TWO_PI / numNodes * j;
    	this.nodes[j].x =  width/2 + bigRadius * cos(angle + frameCount*(0.001 * speed));
    	this.nodes[j].y =  height/2 + bigRadius * sin(angle + frameCount* (0.001 * speed));
      
      
  	} 	
  
  }


}



//-----------------------------------------------------------------------
function Node (x, y, radius) {
	//constructor
  this.x = x;
  this.y = y;
  this.radius = radius;
  

  //draw ellipse at this x,y pos
	this.display = function () {
  	ellipse(this.x, this.y, radius, radius);
  }
  
  //changes color on condition
  this.isOver = function() { 
      if (this.y > (height/2 - this.radius/2) && this.y < (height/2 + this.radius/2) && this.x > width/2) {
       
        fill(225,0,0);
       sound.stop();
        if (sound.isPlaying() === false) {
          
          sound.play();
        }

    } else {
      
    	fill(0);
      
    }
  }

  this.play = function() {
      

  }
}

