var ANIMATIONS = { Bike: BIKE, Exercise: EXERCISE, Dive: DIVE, Juggler: JUGGLER, 'Custom': CUSTOM };

var mytextarea = document.getElementById('mytextarea');
var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop');


startBtn.onclick = function () { start() };
stopBtn.onclick = function () { stop() };

var lists_animation;
var current = 0;
var end;
var speed = 250;


document.getElementById('speed').onchange = function () {
    if (this.checked) speed = 50;
    else speed = 250;
    stop();
    start();
}
document.getElementById('size').onchange = function () {
    mytextarea.style.fontSize = this.value + "pt";
    document.getElementsByClassName('mybox')[0].style.width = '100%';
}


var custom = false;
document.getElementById('animations').onchange = function () {
    stop();
    mytextarea.value = "";
    if (this.value === 'Custom') {
        custom = true;
    } else {
        console.log(this.value);
        lists_animation = ANIMATIONS[this.value].split('=====');
        custom = false;
    }
    if (!custom) config();
}


function config() {
    current = 0;
    end = lists_animation.length;
    if (end > 0)
        set();
    else stop();
}

function set() {
    mytextarea.value = lists_animation[current];
    if (current + 1 > end - 1) current = 0;
    else current++;
}

timer = null;
function start() {
    if (custom) {
        lists_animation = mytextarea.value.split('=====');
        config();
        custom = false;

    }
    timer = setInterval(set, speed);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stop() {
    if (timer != null) {

        clearInterval(timer);
        timer = null;
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
}