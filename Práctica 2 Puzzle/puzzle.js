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
function recortarImagen(image){
    ctx.drawImage(image,0,0,200,200);
    ctx.clearRect(0,0,50,50);
    //ctx.drawImage(image,0,0,canvas.width,canvas.height);
    //Duda si borro la imagen también borro la recortada
    var recorteImagen = ctx.getImageData(0,0,133.3,133.3);
    ctx.putImageData(recorteImagen,100,100);
}

function main(){
var canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");

var arrayImages = ["tesla","cohete","praga"];
var myVar = setInterval(prinTime,1000);

var image = new Image();
image.src = "Images/cohete.jpg";
recortarImagen(image);

}
