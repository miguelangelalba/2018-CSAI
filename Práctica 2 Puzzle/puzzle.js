function prinTime(){
    var d = new Date();
    document.getElementById('time').innerHTML = "Time:" + d.toLocaleTimeString();
}
function recortarImagen(image){
    ctx.drawImage(image,0,0,200,200);
    //ctx.drawImage(image,0,0,canvas.width,canvas.height);
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
