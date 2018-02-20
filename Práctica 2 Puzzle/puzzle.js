//Tamaño canvas fijo 500x500

//falla aquí tengoq que ver que le pasa
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

var slideIndex = 1;

function pieza(image,sx,sy,dy,dx,swidht,sheight,pox,poy,px,py){
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
    this.myPositionX = px;
    this.myPositionY = py;

    this.drawFicha = function(){
        ctx.drawImage(image,this.sX,this.sY,this.sWidht,this.sHeight,this.dX,this.dY,this.sWidht,this.sHeight);

    }
    this.changePosition = function(){
        this.positionX += 1;
        this.positionY += 1;
    }

}

function resize(image){
//con esta función redimensiono la imagen para no tener problemas de dónde me
//las descargo
    imgResize = image;
    imgResize.width = 500;
    imgResize.height = 500;
    return imgResize;
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

function makePuzzle(puzzle){

    for (var i = 0; i < 8; i++){
        //me quedaría hacer otro bucle para pasar las posiciones
        puzzle.push(new pieza())
    }

}

function main(){
//var canvas = document.getElementById('canvas');
//ctx = canvas.getContext("2d");
var puzzle = new Array();

showSlides();
//var myVar = setInterval(prinTime,1000);

//var image = new Image();
//image.src = "Images/cohete.jpg";
//recortarImagen(image);
}
