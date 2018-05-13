function chroma(video,w,h){
    var image = new Image();
    image.src = "images/fondo.jpg";
    ctx.drawImage(image,0,0,w,h);
    var imagedata = ctx.getImageData(0,0,w,h);
    var idata = imagedata.data;

    ctx.drawImage(video,0,0,w,h);
    var videodata = ctx.getImageData(0,0,w,h);
    var vdata = videodata.data;

    for(var i = 0; i < vdata.length; i+=4) {

        var r = vdata[i];
        var g = vdata[i+1];
        var b = vdata[i+2];

         if (g > 100 && r < 80 && b < 80){
             vdata[i] = idata[i];
             vdata[i+1] = idata[i+1];
             vdata[i+2] = idata[i+2];
         }
        ctx.putImageData(videodata,0,0);
        setTimeout(function(){ chroma(video,w,h); }, 0);

    }
}

function filtroColor (video,w,h,r,g,b) {
    ctx.drawImage(video,0,0,w,h);
    var idata = ctx.getImageData(0,0,w,h);

     factorr = ( 259 * ( r + 255 ) ) / ( 255 * ( 259 - r ) );
     factorg = ( 259 * ( g + 255 ) ) / ( 255 * ( 259 - g ) );
     factorb = ( 259 * (b + 255 ) ) / ( 255 * ( 259 - b ) );

    var data = idata.data;
    for(var i = 0; i < data.length; i+=4) {
        var ro = data[i];
        var go = data[i+1];
        var bo = data[i+2];
        var brightness = (3*ro+4*go+bo)>>>3;

        data[i] = factorr * ( ro - 128 ) + 128;
        data[i+1] = factorg * ( go - 128 ) + 128;;
        data[i+2] = factorb * ( bo - 128 ) + 128;;
    }

    ctx.putImageData(idata,0,0);
    setTimeout(function(){ filtroColor(video,w,h,r,g,b); }, 0);

}


function draw(video,w,h){
    ctx.drawImage(video,0,0,w,h);
    var idata = ctx.getImageData(0,0,w,h);

    var data = idata.data;
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        //pondera los niveles de gris
        var brightness = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
        //cambia cada valor de pixel
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
    }
    ctx.putImageData(idata,0,0);
    setTimeout(function(){ draw(video,w,h); }, 0);

}

document.addEventListener('DOMContentLoaded', function(){

    canvas = document.getElementById("canvasProcesado");
	ctx = canvas.getContext('2d');

    videoOriginal = document.getElementById("videoOriginal");

    ////imagen///
    var image = new Image();
    image.src = "images/fondo.jpg";
    //canvas.width = videoOriginal.clientWidth;
    //canvas.height = videoOriginal.clientHeight;

    videoOriginal.addEventListener("play",function(){

        //filtroColor(videoOriginal, videoOriginal.clientWidth,videoOriginal.clientHeight,100,255,100);
        chroma(videoOriginal, canvas.width,canvas.height)
        //draw(videoOriginal, videoOriginal.clientWidth,videoOriginal.clientHeight)
    },false);
},false);
