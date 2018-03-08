//Tamaño canvas fijo 500x500

//falla aquí tengoq que ver que le pasa
//const canvas = document.getElementById('canvas');
//const ctx = canvas.getContext("2d");

var slideIndex = 1;

function casilla(x,y,posX,posY){
    this.x = x;
    this.y = y;
    this.myPositionX = posX;
    this.myPositionY = posY;
}

function pieza(image,draw,sx,sy,dx,dy,swidht,sheight,pox,poy){
    this.image = image;
    this.sX = sx;
    this.sY = sy;
    this.dY = dy;
    this.dX = dx;
    this.sWidht = swidht;
    this.sHeight = sheight;
    this.dWidht = swidht;
    this.dHeight = sheight;
    this.draw = draw;
    //En esta parte defino mi propio tablero y organizo según mis coordeanadas
    //de tablero.
    this.positionOriginalX = pox;
    this.positionOriginalY = poy;
    this.myPositionX = pox;
    this.myPositionY = poy;

    this.drawFicha = function(){
        console.log("pintando",this);
        if (this.draw == true) {
            ctx.drawImage(this.image,this.sX,this.sY,this.sWidht,this.sHeight,this.dX,this.dY,this.sWidht,this.sHeight);
        }
    }
    this.changePosition = function(pieza){
        console.log(pieza);
        this.draw = true;
        this.dX = pieza.dX;
        this.dY = pieza.dY;
        this.myPositionX = pieza.myPositionX;
        this.myPositionY = pieza.myPositionY;
    }
}

function drawPuzzle(puzz){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = 0;
    console.log("Estoy pintando el puzzle");
    for (i in puzz){
        puzz[i].drawFicha();
    }
}

function resize(img){
//con esta función redimensiono la imagen para no tener problemas de dónde me
//las descargo
    //imgResize = image;
    img.width = 100 ;
    img.height = 100 ;
    return img;
}

function prinTime(){
    var d = new Date();
    document.getElementById('time').innerHTML = "Time:" + d.toLocaleTimeString();
}

function recortarImagen(src){
    var myVar = setInterval(prinTime,1000);

    var myVar = setInterval(prinTime,1000);
    var image = new Image();
    image.src = src;
    ctx.drawImage(image,0,0,200,200);
    ctx.clearRect(0,0,50,50);
    //ctx.drawImage(image,0,0,canvas.width,canvas.height);
    //Duda si borro la imagen también borro la recortada
    var recorteImagen = ctx.getImageData(0,0,133.3,133.3);
    ctx.putImageData(recorteImagen,100,100);
}
function showSlides(){
    var i;
    var slides = document.getElementsByClassName("myImages");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }

    switch(slideIndex) {

        case 0 :
            //document.getElementById("img1").src = "Images/tesla.jpg";
        //    document.getElementById("img2").src = "Images/cohete.jpg";
        //    document.getElementById("img3").src = "Images/praga.jpg";
        //    break;
        case 1:
            document.getElementById("img1").src = "Images/cohete.jpg";
            document.getElementById("img2").src = "Images/tesla.jpg";
            document.getElementById("img3").src = "Images/praga.jpg";
            break;
        case 2:
            document.getElementById("img1").src = "Images/praga.jpg";
            document.getElementById("img2").src = "Images/impresora3d.jpg";
            document.getElementById("img3").src = "Images/dodecaedro.jpg";
            break;
        case 3:
            document.getElementById("img1").src = "Images/tesla.jpg";
            document.getElementById("img2").src = "Images/cohete.jpg";
            document.getElementById("img3").src = "Images/praga.jpg";

            break;

        }
    slideIndex++;

    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
}

function makePuzzle(image){

    var puzzle = new Array();
    //Posición de la pieza en la imagen original
    var sx = 0;
    var sy = 0;
    //Posición final de la pieza en el canvas
    var dx = 0;
    var dy = 0;
    //Tamaño que ocupa la pieza en la foto original
    //Estas dos variables creo que podría declararlas como constantes.
    var swidht = 200;
    var sheight = 200;
    //Tamaño de la pieza final en este caso lo mismo que antes
    //Mi posicion, estás dos variables las creo para crear mis propias coordenadas y
    //ordenar mejor las piezas
    var pox = 1;
    var poy = 1;
    var draw = true;

    //me quedaría hacer otro bucle para pasar las posiciones
    //el bluce pasará por 0,200 y 400 que son las posiciones del canvas
    for (dx; dx < 600; dx += 200){
        for (dy; dy < 600; dy += 200){
            puzzle.push(new pieza(image,draw,dx,dy,dx,dy,swidht,sheight,pox,poy));
            sy = dy;
            poy += 1;
        }
        poy = 1;
        dy = 0;
        sx = dx;
        pox += 1;
    }
    //elimina el elemento 8. El último
    //puzzle.pop(8);
    return puzzle;

}
function checkPiezaToMove(puzz,pieza){
    var moduloX;
    var moduloY;
    for (i in puzz){
        moduloX = Math.abs(puzz[i].myPositionX - pieza.myPositionX);
        moduloY = Math.abs(puzz[i].myPositionY - pieza.myPositionY);
        if (((moduloX || moduloY) == 1) && ((moduloX != moduloY)) && puzz[i].draw == false ){
            console.log(moduloX + "," + moduloY);
            console.log("Pieza a mover: ")
            console.log(puzz[i].myPositionX,puzz[i].myPositionY);

            puzz[i].changePosition(pieza);
            console.log(puzz[i]);

        }

    }

}

function onPuzzleClick(event,puzz){
    var ratonPosX = event.pageX - 375 - 270;// Creo que esto cambia dependiendo de la pantalla
    var ratonPosY = event.pageY - 595;
    var left = ratonPosX;
    var right = ratonPosX;
    var top = ratonPosY;
    var bottom = ratonPosY;

    alert(ratonPosX + "," + ratonPosY);
    //TEngo que termianr esta parte
    for (var i = 0; i < puzz.length; i++){
        var r_left = puzz[i].dX;
        var r_right = puzz[i].dX + puzz[i].dWidht;
        var r_top = puzz[i].dY + puzz[i].dHeight;
        var r_bottom = puzz[i].dY;
        if (right >= r_left && left <= r_right && top >= r_bottom && bottom <= r_top){
            alert(puzz[i].myPositionX + "," + puzz[i].myPositionY);
            return puzz[i];
        }
    }
}
function rndPuzzle(puzzle,tablero){

    var rndTablero = tablero.slice();

    var randomPos = 0;
    for (var i = 0; i < tablero.length; i++){
        randomPos = Math.floor(Math.random() * rndTablero.length);
        puzzle[i].dX = rndTablero[randomPos].x;
        puzzle[i].dY = rndTablero[randomPos].y;
        puzzle[i].myPositionX = rndTablero[randomPos].myPositionX;
        puzzle[i].myPositionY = rndTablero[randomPos].myPositionY;
        rndTablero.splice(randomPos,1);
    }
    puzzle[8].draw = false;

    return puzzle;
}

function makeTablero(){
    var x = 0;
    var y = 0;
    var posX = 1;
    var posY = 1;
    var tablero = new Array();

    for (x; x < 600; x += 200){
        for (y; y < 600; y += 200){
            tablero.push(new casilla(x,y,posX,posY));
            posY += 1
        }
        y = 0;
        posY = 1;
        posX += 1;
    }
    return tablero;
}

function main(){

var canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
var imagere = new Image();

imagere.src = "Images/reloj.jpg";

var imagersz = resize(imagere);
var puzzle = makePuzzle(imagersz);
var tablero = makeTablero();
var randomPuzzle = rndPuzzle(puzzle,tablero);
drawPuzzle(randomPuzzle);
document.addEventListener('click',function(event){
    piezaToMove = onPuzzleClick(event,randomPuzzle);
    checkPiezaToMove(randomPuzzle,piezaToMove);
    drawPuzzle(randomPuzzle);

},false);
showSlides();
//var myVar = setInterval(prinTime,1000);

//var image = new Image();
//image.src = "Images/cohete.jpg";
//recortarImagen(image);
}
