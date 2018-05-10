
//var pacmanLives = 6;

var walls = [];
var pac = [];
var bolas = [];
var fantasmas = [];

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
	//buildWall2(context_walls,80,40,8,8);
	//buildWall2(context_walls,210,40,8,8);

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

function makebolas(ctx){

    bolas.push(new bola("bgrande",20,21,4,"yellow",ctx));
    bolas.push(new bola("bgrande",280,21,4,"yellow",ctx));
    bolas.push(new bola("bgrande",20,130,4,"yellow",ctx));
    bolas.push(new bola("bgrande",280,130,4,"yellow",ctx));

	//Bolas pequeñas
	for (i = 80; i < 230; i+=10){

		bolas.push(new bola("bpequeña",i,86,2,"yellow",ctx));
	}
	bolas.push(new bola("fruta",150,100,4,"orange",ctx));
}

function makeFantasmas(){
	fantasmas.push(new fantasma("f1",74,73,0,2,ctx,"images/rojo_right.png"));
	fantasmas.push(new fantasma("f2",260,73,0,2,ctx,"images/naranja_left.png"));
}

function bola(id,x,y,radious,color,context){
    this.id = id;
    this.radious = radious;
    this.posX = x;
    this.posY = y;
    this.contextBalls = context;
    this.color = color;
	//this.move = function(){return};
    this.draw = function (){
        this.contextBalls.fillStyle = this.color;
		this.contextBalls.strokeStyle = this.color;
        this.contextBalls.beginPath();
        this.contextBalls.arc(this.posX, this.posY,this.radious, 0, (Math.PI/180)*360);
        this.contextBalls.closePath();
		this.contextBalls.fill();
    }
}
function fantasma(id,posX,posY,speedX,speedY,context,img){
    var d = new Date();
    this.image = new Image();

	this.id = id;
	this.posX = posX;
	this.posY = posY;
    this.width = 12;
    this.height = 12;
	this.radious = 6;
	this.speedX = speedX; //(s/t)
	this.speedY = speedY;//(s/t)
	this.ctxFant = context;
	this.score = 0;
	this.time = d.getTime();
    this.image.src= img;
    this.draw = function(){
        this.ctxFant.drawImage(this.image,this.posX,this.posY, this.width, this.height);
		console.log("Estoy pintando fantama");
    }
	this.move = function(){
		var tmNow = d.getTime();
		var dt = tmNow - this.time;
		this.time = d.getTime();
		if (checkCollisionColor(this.id,this.speedX,this.speedY) == true){
			this.speedY = this.speedY * (-1);
		}

		//this.speedX = this.speedX+1*(dt/1000);
		this.speedY = this.speedY+1*(dt/1000);
		//this.posX += this.speedX;
		this.posY += this.speedY;
	}

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
	this.score = 0;
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

		if (checkCollisionColor(this.id,this.speedX,this.speedY) == false){
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
function fruta(){
	bolas.push(new bola("naranja",280,130,4,"naranja",ctx));

}
function playVideo(source){
	//playSound.pause();
	mySong.pause();
	canvas.setAttribute("style", "display:none");
   	video = document.createElement("video");
   	video.src = source;
	video.setAttribute("preload", "auto");
	document.body.appendChild(video);
	video.play();

}
function getPac(id) {
  for(x in pac) {
   	if(pac[x].id === id)
      return pac[x];
  }
}
function getFantasma(id){
	for(x in fantasmas) {
	   if(fantasmas[x].id === id)
		return fantasmas[x];
	}
}
function drawAll(){
	if (bolas.length == 0){
		clearInterval(myCountdown);
		clearInterval(intervall);
		playVideo("video/clap.mp4")
	}

    makeGameArea2(ctx);
    for(x in pac) {
	    ctx.save();
        pac[x].draw();
    }
    checkCollisionBolas();
    for (x in bolas){
        ctx.save();
        bolas[x].draw();
    }
	checkCollisionFantasmas();
    for (x in fantasmas){
        ctx.save();
		fantasmas[x].move();
        fantasmas[x].draw();
    }

}
function checkCollisionFantasmas(){
	objPacman=getPac("p1");

    for (i in fantasmas){
        var Numx=Math.pow(objPacman.posX-fantasmas[i].posX,2);
		var Numy=Math.pow(objPacman.posY-fantasmas[i].posY,2);
		var Distancia=Math.sqrt(Numx +Numy);
        var DRadios= objPacman.radious+fantasmas[i].radious;
        if (Distancia < DRadios){
			objPacman.speedX = 0;
			objPacman.speedY = 0;
			objPacman.posX = 25;
			objPacman.posY = 73;
			objPacman.lives -= 1;
			document.getElementById("lives").innerHTML = "Vidas: "+objPacman.lives;
			if (objPacman.lives == 0 ){
				playVideo("video/GameOver.mp4")
			}
        }
    }
}


function checkCollisionBolas(){
    objPacman=getPac("p1");

    for (i in bolas){
        var Numx=Math.pow(objPacman.posX-bolas[i].posX,2);
		var Numy=Math.pow(objPacman.posY-bolas[i].posY,2);
		var Distancia=Math.sqrt(Numx +Numy);
        var DRadios= objPacman.radious+bolas[i].radious;
        if (Distancia < DRadios){
			if (bolas[i].id == "bgrande"){
            objPacman.score = objPacman.score + 3;
		}else if (bolas[i].id == "fruta") {
			document.getElementById("fruitSong").play();
			objPacman.score = objPacman.score + 5;

		}else {

			objPacman.score = objPacman.score + 1;

		}
            document.getElementById("score").innerHTML = "Puntuación: "+objPacman.score+" pts";
            bolas.splice(i,1);
        }
    }
}
function checkCollisionColor (id,spX,spY){
	if (id == "p1" ){
		obj=getPac(id);
	}else {
		obj=getFantasma(id);
	}

	var futuraposX;
	var futuraposY
	var diametro = obj.radious * 2;

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

		if (components[2] == 255){
			if(obj.id == "p1"){
				obj.speedX = 0;
				obj.speedY = 0;
			}
			return true;
		}
	}
	return false;

}
function comenzandoArrastrar(e){
	var elemento = e.target;//con esta propiedad se puede identificar el objeto
	e.dataTransfer.setData("Text",elemento.getAttribute("id"));  //comparte el id con la zona de destino

}
function soltado(e){
	//reseteamos comportamiento del navegador
	obj = getPac("p1");

	e.preventDefault();
	var id = e.dataTransfer.getData("Text");
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

	var images=document.querySelectorAll("#coloresPacman img");
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
            if (checkCollisionColor("p1",speedX,speedY) == false){
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
            if (checkCollisionColor("p1",speedX,speedY) == false){
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
			if (checkCollisionColor("p1",speedX,speedY) == false){
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
            if (checkCollisionColor("p1",speedX,speedY) == false){
				p1.speedX = 0;
	            p1.speedY = 3;
            	p1.move();
			}
            drawAll();

	default:
	}
}
function countdown(){
	var obj = getPac("p1");
	if (obj.timeCd > 0){
		obj.timeCd -= 1;
		document.getElementById('time').innerHTML = "Tiempo:" + obj.timeCd;
	}else{
		clearInterval(myCountdown);
        changeMaxScore();
		clearInterval(myCountdown);
		clearInterval(intervall);
		playVideo("video/GameOver.mp4");
		//alert("Su tiempo ha terminado");
	}
}

function inicioCountdown(){
	myCountdown = setInterval(countdown,1000);
	intervall = setInterval(render,80);

}
function pararContinuar(){
	if (document.getElementById("pararContinuar").value == "parar"){
		clearInterval(myCountdown);
		clearInterval(intervall);
		document.getElementById("pararContinuar").value = "continuar";
	}else if (document.getElementById("pararContinuar").value == "continuar"){
		inicioCountdown();
		document.getElementById("pararContinuar").value = "parar";
	}
}
function changeMaxScore(){
    var obj = getPac("p1");
    if (obj.score > localStorage.maxScoreSotarage){
        localStorage.maxScoreSotarage = obj.score;
    }
    document.getElementById("maxScore").innerHTML = "Puntuación Máxima: " + localStorage.maxScoreSotarage;
}
function showMaxScore(){
    document.getElementById("maxScore").innerHTML = "Puntuación Máxima: " + localStorage.maxScoreSotarage;
}


function startGame(){
	mysong = document.getElementById("mySong");
	mySong.loop = true;
	mySong.play();

	// playVideo("video/GameOver.mp4")

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	makeGameArea2(ctx);
    makebolas(ctx);
    if (localStorage.maxScoreSotarage === undefined){
        localStorage.setItem("maxScoreSotarage", 0);
    }
    showMaxScore();
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pac.push(new pacman("p1",25,73,"yellow",ctx));
	makeFantasmas();
    drawAll();

    document.addEventListener('keydown', keyHandler, false);

	//intervall = setInterval(render,80);
}
//
window.addEventListener("load",cambiarColorPacman,false);
