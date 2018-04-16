
//var pacmanLives = 6;

var walls = [];
var pac = [];

var elemDestino;



function buildWall2(context,x,y,width,height){
	context.fillRect(x,y,width,height);
}

function makeGameArea2(context){
	var context_walls = context;
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

}


function pacman(id,posX,posY,color,context){
	var d = new Date();
	this.id = id;
	this.posX = posX;
	this.posY = posY;
	this.color	= color;
	this.radious = 4;
	this.speedX = 0; //(s/t)
	this.speedY = 0;//(s/t)
	this.lives = 3;
    this.context_pac = context;
	this.puntos = 0;
	this.time=d.getTime();
	this.timeCd = 60;
	this.draw = function(){
		this.context_pac.fillStyle = this.color;
		this.context_pac.strokeStyle = this.color;
		this.context_pac.beginPath();
		this.context_pac.arc(this.posX, this.posY,this.radious, 0.2 * Math.PI, 1.8 * Math.PI);
		// open mouth
		this.context_pac.lineTo(this.posX, this.posY);
		this.context_pac.closePath();
		this.context_pac.fill();
	}
	this.move = function(){
		var tmNow = d.getTime();
		var dt = tmNow - this.time;
		this.time = d.getTime();
		console.log("Velocidad"+this.speedX,this.speedY);
		console.log("Posición"+ this.posX+ this.posY);
		if (checkCollision(this.id,this.speedX,this.speedY) == false){
			this.speedX = this.speedX+1*(dt/1000);
			//this.speedY = this.speedY+1*(dt/1000);
			this.posX += this.speedX;
			this.posY += this.speedY;
		}

		if(this.posX > (canvas.width + 20)){
			this.posX = -5;
		}else if(this.posX < (-26)){
			this.posX = canvas.width + 5;
		}
	}
}

function getPac(id) {
  for(x in pac) {
   	if(pac[x].id === id)
      return pac[x];
  }
}
function drawAll(){
    makeGameArea2(ctx);
    for(x in pac) {
	    ctx.save();
        pac[x].draw();
    }

}
function checkCollision (id,spX,spY){
	obj=getPac(id)
	var futuraposX;
	var futuraposY
	var diametro = obj.radious * 2;
	console.log("Esto es lo que llega:" + obj,spX,spY);
	console.log(obj);

	if ( spX > 0){
		futuraposX = obj.posX + spX + obj.radious;
		//para poder teenr en cuenta la altura completa del pacman
    	futuraposY = obj.posY - obj.radious;
	}else if (spX < 0) {
		futuraposX = obj.posX + spX - obj.radious;
		futuraposY = obj.posY - obj.radious;
	} else if (spY > 0){
		futuraposX = obj.posX - obj.radious;
		futuraposY = obj.posY + spY + obj.radious;
	}else if (spY < 0) {
		futuraposX = obj.posX - obj.radious;
		futuraposY = obj.posY + spY - obj.radious;
	}else{
		return false;
	}
	//Con esta función extraigo el color del pixel que quiero del canvas
	//Detecta el color del pixel pasandole las coordenadas
	console.log("posixiones x ey :"+ obj.posX,obj.posY);
    console.log("Futuro" + futuraposX,futuraposY);
	var data = imageData.data;
	for (i = 0; i < diametro; i++){
		var components = [
        	data[ ( futuraposY * imageData.width + futuraposX ) * 4 + 0],
        	data[ ( futuraposY * imageData.width + futuraposX ) * 4 + 1],
        	data[ ( futuraposY * imageData.width + futuraposX ) * 4 + 2],
        	data[ ( futuraposY * imageData.width + futuraposX ) * 4 + 3]
    	];
		if (spY != 0){
			futuraposX++;
		}
		if (spX != 0){
			futuraposY++;
		}
		console.log("imprimo esto " + components[2]);

		if (components[2] == 255){
			obj.speedX = 0;
			obj.speedY = 0;
			return true;
		}
    	console.log(components,futuraposY);
	}
	return false;

}
function comenzandoArrastrar(e){
	var elemento = e.target;//con esta propiedad se puede identificar el objeto
	e.dataTransfer.setData("Text",elemento.getAttribute("id"));  //comparte el id con la zona de destino
	console.log("Estoy arrastrando");

}
function soltado(e){
	//reseteamos comportamiento del navegador
	console.log("Estoy soltando");
	obj = getPac("p1");

	e.preventDefault();
	var id = e.dataTransfer.getData("Text");
	console.log(id);
	//con esto meto código html
	var src = document.getElementById(id).src;
	if (id == "comeAmarillo"){
		obj.color = "yellow";
		drawAll();
	}else if(id == "comeAzul") {
		obj.color = "Blue";
		drawAll();
	}else if (id == "comeVerde") {
		obj.color = "green";
		drawAll();
	}
	//ESta parte no consigo que funcione
	elemDestino.innerHtml="<img src='" + src +"'>";
}
function cambiarColorPacman(event){
	console.log("he entardo en cambiar color");

	var images=document.querySelectorAll("#coloresPacman img");
	console.log(images);
	for(x=0; x < images.length; x++){
		images[x].addEventListener("dragstart",comenzandoArrastrar,false)
	}
	elemDestino = document.getElementById("zonaDestino");
	elemDestino.addEventListener("dragenter",function(e){
		e.preventDefault();},false);
	elemDestino.addEventListener("dragover",function(e){
		e.preventDefault();},false);
	elemDestino.addEventListener("drop",soltado,false);
}
function render(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	obj = getPac("p1");
	obj.move();

	drawAll();
	console.log("Estoy renderizando");
}
function keyHandler(event){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var speedX;
	var speedY;
   	p1=getPac("p1");

	switch(event.keyCode) {
        case 65:
			//console.log("izquierda");
			speedX = -3;
            speedY = 0;
            if (checkCollision("p1",speedX,speedY) == false){
				p1.speedX = -3;
	            p1.speedY = 0;
            	p1.move();
			}
            drawAll();

		break;
		case 68:
         //console.log("derecha");
            speedX = 3;
            speedY = 0;
            if (checkCollision("p1",speedX,speedY) == false){
				p1.speedX = 3;
	            p1.speedY = 0;
            	p1.move();
			}
            drawAll();

        break;
        case 87:
        //abajo
            speedX = 0;
            speedY = -3;
			if (checkCollision("p1",speedX,speedY) == false){
				p1.speedX = 0;
	            p1.speedY = -3;
            	p1.move();
			}
            drawAll();

        break;
        case 83:
            //arriba
            speedX = 0;
            speedY = 3;
            if (checkCollision("p1",speedX,speedY) == false){
				p1.speedX = 0;
	            p1.speedY = 3;
            	p1.move();
			}
            drawAll();

	default:
	console.log("Key not handled");
	}
}
function countdown(){
	obj = getPac("p1");
	if (obj.timeCd > 0){
		obj.timeCd -= 1;
		document.getElementById('time').innerHTML = "Tiempo:" + obj.timeCd;
	}else{
		clearInterval(myCountdown);
		alert("Su tiempo ha terminado");
	}
}

function inicioCountdown(){
	myCountdown = setInterval(countdown,1000);
}
function pararContinuar(){
	if (document.getElementById("pararContinuar").value == "parar"){
		clearInterval(myCountdown);
		document.getElementById("pararContinuar").value = "continuar";
	}else if (document.getElementById("pararContinuar").value == "continuar"){
		inicioCountdown();
		document.getElementById("pararContinuar").value = "parar";
	}
}

function startGame(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	makeGameArea2(ctx);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pac.push(new pacman("p1",25,73,"yellow",ctx));
    pac[0].draw();
	//myCountdown = setInterval(countdown,1000);
    document.addEventListener('keydown', keyHandler, false);

	intervall = setInterval(render,80);
}
//
window.addEventListener("load",cambiarColorPacman,false);
