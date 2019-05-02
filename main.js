let canvas = document.getElementById('main');
let c = canvas.getContext('2d');

function init() {

    update();
}

function update() {

    requestAnimationFrame(update);
}

window.addEventListener('load', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
