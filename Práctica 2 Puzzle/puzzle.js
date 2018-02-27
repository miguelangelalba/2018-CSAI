//Tamaño canvas fijo 500x500

//falla aquí tengoq que ver que le pasa
//const canvas = document.getElementById('canvas');
//const ctx = canvas.getContext("2d");

var slideIndex = 1;

function casilla(x,y){
    this.x = x;
    this.y = y;
}

function pieza(image,sx,sy,dx,dy,swidht,sheight,pox,poy){
    this.image = image;
    this.sX = sx;
    this.sY = sy;
    this.dY = dy;
    this.dX = dx;
    this.sWidht = swidht;
    this.sHeight = sheight;
    this.dWidht = swidht;
    this.dHeight = sheight;
    //En esta parte defino mi propio tablero y organizo según mis coordeanadas
    //de tablero.
    this.positionOriginalX = pox;
    this.positionOriginalY = poy;
    this.myPositionX = pox;
    this.myPositionY = poy;

    this.drawFicha = function(){
        ctx.drawImage(this.image,this.sX,this.sY,this.sWidht,this.sHeight,this.dX,this.dY,this.sWidht,this.sHeight);

    }
    this.changePosition = function(){
        this.positionX += 1;
        this.positionY += 1;
    }

}

function drawPuzzle(puzzle){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = 0;
    for (i in puzzle){
        puzzle[i].drawFicha();
        console.log(i);
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
        //case n:
        //    code block
        //    break;

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

    //me quedaría hacer otro bucle para pasar las posiciones
    //el bluce pasará por 0,200 y 400 que son las posiciones del canvas
    for (dx; dx < 600; dx += 200){
        for (dy; dy < 600; dy += 200){
            puzzle.push(new pieza(image,dx,dy,dx,dy,swidht,sheight,pox,poy));
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
function rndPuzzle(puzzle,tablero){

    var rndIndex = tablero.length;

    var randomPos = 0;
    for (var i = 0; i < tablero.length; i++){
        randomPos = Math.floor(Math.random() * tablero.length);
        puzzle[randomPos].dX = tablero[i].x;
        puzzle[randomPos].dY = tablero[i].y;
    }
    return puzzle;
}

function makeTablero(){
    var x = 0;
    var y = 0;
    var tablero = new Array();

    for (x; x < 600; x += 200){
        for (y; y < 600; y += 200){
            tablero.push(new casilla(x,y));
        }
        y = 0;
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
console.log(puzzle);

var tablero = makeTablero();
console.log(tablero);
randomPuzzle = rndPuzzle(puzzle,tablero);
drawPuzzle(randomPuzzle);
console.log(randomPuzzle);

showSlides();
//var myVar = setInterval(prinTime,1000);

//var image = new Image();
//image.src = "Images/cohete.jpg";
//recortarImagen(image);
}
