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

};


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

    videoOriginal.addEventListener("play",function(){
        canvas.width = videoOriginal.clientWidth;
        canvas.height = videoOriginal.clientHeight;
        filtroColor(videoOriginal, videoOriginal.clientWidth,videoOriginal.clientHeight,100,255,100);
        //draw(videoOriginal, videoOriginal.clientWidth,videoOriginal.clientHeight)
    },false);
},false);
