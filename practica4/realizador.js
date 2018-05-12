var cameras = [];

function playVideo(source,id,timeStart,timeStop){
    live.loop = true;
    live.src = source;
    live.currentTime = timeStart;
    live.play();

    camara = document.getElementById(id);

    for(x in cameras){
        if (cameras[x].id == id){
            document.getElementById(id).style.borderColor = "red";
        }else{
            document.getElementById(cameras[x].id).style.borderColor = "black";
        }
    }
    live.ontimeupdate = function() {loopVideo(timeStart,timeStop)};
}

function loopVideo(timeStart,timeStop){
    document.getElementById('time').innerHTML = "Tiempo de reproducción: " + live.currentTime +"s";
    if (live.currentTime > timeStop){
        live.currentTime = timeStart
    }
}

function quitarSonido(id){
    for(x in cameras){
        if (cameras[x].id == id){
            cameras[x].muted = true;
        }
    }
}

function ponerSonido(id){
    for(x in cameras){
        if (cameras[x].id == id){
            cameras[x].muted = false;
        }
    }
}

function videoBucle(){
    timeStart = document.getElementById("timeStart").value;
    timeStop = document.getElementById("timeStop").value;
    playVideo(live.src,camara.id,timeStart,timeStop);
}

function startCameras(){

    for(x in cameras){
        cameras[x].muted = true;
        cameras[x].loop = true;
        cameras[x].play();
    }
}
function startRealizador(){

    live = document.getElementById("directo");
    cameras.push(camera1 = document.getElementById("camara1"));
    cameras.push(camera2 = document.getElementById("camara2"));
    cameras.push(camera3 = document.getElementById("camara3"));
    cameras.push(camera4 = document.getElementById("camara4"));

    startCameras();
}
