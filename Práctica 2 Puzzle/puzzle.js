//Tamaño canvas fijo 500x500

//falla aquí tengoq que ver que le pasa
//const canvas = document.getElementById('canvas');
//const ctx = canvas.getContext("2d");

var slideIndex = 1;

function pieza(image,sx,sy,dy,dx,swidht,sheight,pox,poy){
    this.image = image;
    this.sX = sx;
    this.sY = sy;
    this.dY = dy;
    this.dX = dx;
    this.sWidht = swidht;
    this.sHeight = sheight;
    //En este caso dWith y dHeight valen lo mismo
    //En esta parte defino mi propio tablero y organizo según mis coordeanadas
    //de tablero.
    this.positionOriginalX = pox;
    this.positionOriginalY = poy;
    this.myPositionX = pox;
    this.myPositionY = poy;

    this.drawFicha = function(){
        ctx.drawImage(image,this.sX,this.sY,this.sWidht,this.sHeight,this.dX,this.dY,this.sWidht,this.sHeight);

    }
    this.changePosition = function(){
        this.positionX += 1;
        this.positionY += 1;
    }

}

function drawPuzzle(puzzle){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i in puzzle){
        puzzle[i].drawFicha();
    }

}

function resize(image){
//con esta función redimensiono la imagen para no tener problemas de dónde me
//las descargo
    //imgResize = image;
    image.width = 200 ;
    image.height = 200 ;
    return image;
}

function prinTime(){
    var d = new Date();
    document.getElementById('time').innerHTML = "Time:" + d.toLocaleTimeString();
}

function matrizImagen(){
    var matrix = new array();
    matrix.id = "im";
    matrix.x = 0.0;
    matirx.y = 0.0;
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
            if (poy != 3 && pox != 3){
                puzzle.push(new pieza(image,sx,sy,dy,dx,swidht,sheight,pox,poy));
            }
            sy = dy;
            poy += 1;
        }
        sx = dx;
        pox += 1;
    }
    return puzzle;

}

function main(){

var canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
var image = new Image();

image.src = "Images/cohete.jpg";

var imagersz = resize(image);
ctx.drawImage(imagersz,0,0,imagersz.width,imagersz.height);
console.log(imagersz.width);
console.log(imagersz.height);

//var puzzle = makePuzzle(imagersz);
//drawPuzzle(puzzle)
showSlides();
//var myVar = setInterval(prinTime,1000);

//var image = new Image();
//image.src = "Images/cohete.jpg";
//recortarImagen(image);
}
