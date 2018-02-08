function prinTime(){
    var d = new Date();
    document.getElementById('time').innerHTML = "Time:" + d.toLocaleTimeString();
}

function main(){
var arrayImages = [tesla,cohete,praga];
var myVar = setInterval(prinTime,1000);
}
