
var pacman = 6;

var walls = [];


function buildWall2(context,x,y,width,height){
	context.fillRect(x,y,width,height);
}

function makeGameArea2(){
	//var canvas_walls = document.getElementById('canvas');

	//canvas_walls.width = canvas.width;
	//canvas_walls.height = canvas.height;
	//var context_walls = canvas_walls.getContext("2d");

	//context_walls.fillStyle = 'Blue';
	//context_walls.strokeStyle = 'Blue';
	var context_walls = ctx;
	context_walls.fillStyle = 'Blue';
	context_walls.strokeStyle = 'Blue';
	//Paredes Horizontales
	//
	buildWall2(context_walls,0,6,296,6);
	buildWall2(context_walls,0,140,298,6);

	//Paredes Verticales
	buildWall2(context_walls,0,6,8,60);
	buildWall2(context_walls,0,80,8,60);
	buildWall2(context_walls,290,6,8,60);
	buildWall2(context_walls,290,80,8,60);

	//Salientes de la paredes
	//Verticales
	buildWall2(context_walls,60,6,8,20);
	buildWall2(context_walls,230,6,8,16);
	buildWall2(context_walls,60,130,24,16);
	buildWall2(context_walls,216,130,24,16);

	//Horizontales
	buildWall2(context_walls,0,60,23,6);
	buildWall2(context_walls,274,60,23,6);
	buildWall2(context_walls,274,80,23,18);
	buildWall2(context_walls,0,80,23,18);

	//Interior del mapa
	//Verticales
	buildWall2(context_walls,30,26,8,16);
	buildWall2(context_walls,45,40,8,26);
	buildWall2(context_walls,60,96,24,18);
	//centro
	buildWall2(context_walls,200,60,8,16);
	buildWall2(context_walls,90,60,8,16);


	//derecha
	buildWall2(context_walls,245,44,8,16);
	buildWall2(context_walls,260,26,8,16);

	//punto

	buildWall2(context_walls,30,119,8,6);
	buildWall2(context_walls,260,119,8,6);
	buildWall2(context_walls,80,40,8,8);
	buildWall2(context_walls,210,40,8,8);

	//Punto centro
	buildWall2(context_walls,110,50,8,8);
	buildWall2(context_walls,180,50,8,8);



	//Horizontales
	buildWall2(context_walls,90,30,43,6);
	buildWall2(context_walls,163,30,43,6);
	buildWall2(context_walls,60,96,72,6);
	buildWall2(context_walls,230,60,23,6);


	buildWall2(context_walls,165,96,72,6);
	buildWall2(context_walls,215,96,24,18);

	buildWall2(context_walls,30,40,23,6);
	buildWall2(context_walls,230,80,23,18);
	buildWall2(context_walls,92,70,115,6);

	//Derecha
	buildWall2(context_walls,245,40,23,6);
	buildWall2(context_walls,105,119,85,6);
	buildWall2(context_walls,45,60,23,6);
	buildWall2(context_walls,45,80,23,18);

	context_walls.fillStyle = 'yellow';
	context_walls.strokeStyle = 'yellow';

	context_walls.beginPath();
	context_walls.arc(25, 73, 5, 0.2 * Math.PI, 1.8 * Math.PI);

	// The line leading back to the center and then closing the path to finish the
	// open mouth
	context_walls.lineTo(25, 73);
	context_walls.closePath();

	// Fill pacman's head yellow
	//context.fillStyle = "#FF0";
	context_walls.fill();
}
function comecocos(){
	var canvas_pac = document.getElementById('canvas');

	canvas_pac.width = canvas.width;
	canvas_pac.height = canvas.height;
	var context_pac = canvas_pac.getContext("2d");

	//context_pac.fillStyle = 'yellow';
	//context_pac.strokeStyle = 'yellow';

	context_pac.beginPath();
	context_pac.arc(25, 25, 10, 0.2 * Math.PI, 1.8 * Math.PI);

	// The line leading back to the center and then closing the path to finish the
	// open mouth
	context_pac.lineTo(25, 25);
	context_pac.closePath();

	// Fill pacman's head yellow
	//context.fillStyle = "#FF0";
	context_pac.fill();
}

function pacman(id,posX,posY,color){
	this.id = id;
	this.posX = posX;
	this.posY = posY;
	this.color	= color;
	this.radious = 10;
	this.speedX = 0;
	this.speedY = 0;
	this.lives = 3;
	this.draw = function(){
		context_pac.fillStyle = this.color;
		context_pac.strokeStyle = this.color;
		context_pac.beginPath();
		context_pac.arc(this.posX, this.posY,this.radious, 0.2 * Math.PI, 1.8 * Math.PI);
		// open mouth
		context_pac.lineTo(this.posX, this.posY);
		context_pac.closePath();
		context_pac.fill();

	}
	this.move = function(){
		this.posX += this.speedX;
		this.posY += this.speedY;

		if(this.posX > (canvas.width + 20)){
			this.posX = -5;
		}else if(this.posX < (-26)){
			this.posX = canvas.width + 5;
		}
	}
}
function startGame(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	makeGameArea2();
	//comecocos();
    //pinta(canvas,ctx);
}
