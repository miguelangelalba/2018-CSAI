var slideIndex = 1;

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
    console.log("cosa");
    var i;
    var slides = document.getElementsByClassName("myImages");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }



    console.log(slideIndex);
    console.log(slides.length);
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

function main(){
var canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");
showSlides();
//var myVar = setInterval(prinTime,1000);

//var image = new Image();
//image.src = "Images/cohete.jpg";
//recortarImagen(image);
}
