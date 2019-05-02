let canvas = document.getElementById('main');
let c = canvas.getContext('2d');

function init() {

    update();
}

function update() {

    requestAnimationFrame(update);
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = 'yellow';

    this.draw = function() {
      var alpha = 1;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = "black";
      c.stroke();
      c.fillStyle = this.color;
      c.fill();
    };

    this.update = function() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      //interactivity

      this.draw();
    };
  }




  var circle = new Circle(canvas.width/2, canvas.height/2, 0, 0, 5, "#00ffff")


window.addEventListener('load', () => {
    canvas.width = window.innerWidth-10;
    canvas.height = window.innerHeight-10;
    init();
});

var keyPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
}
window.addEventListener('keydown', function(event) {
  if(event.key ==='ArrowUp') {
    keyPressed.ArrowUp = true;
  }
  if(event.key ==='ArrowDown') {
    keyPressed.ArrowDown = true;
  }
  if(event.key ==='ArrowLeft') {
    keyPressed.ArrowLeft = true;
  }
  if(event.key ==='ArrowRight') {
    keyPressed.ArrowRight = true;
  }
  if(event.key ===' ') {
    keyPressed.Space = true;
  }
});
window.addEventListener('keyup', function(event) {
  if(event.key ==='ArrowUp') {
    keyPressed.ArrowUp = false;
  }
  if(event.key ==='ArrowDown') {
    keyPressed.ArrowDown = false;
  }
  if(event.key ==='ArrowLeft') {
    keyPressed.ArrowLeft = false;
  }
  if(event.key ==='ArrowRight') {
    keyPressed.ArrowRight = false;
  }
  if(event.key ===' ') {
    keyPressed.Space = false;
  }
});

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0,innerWidth,innerHeight);

  if(keyPressed.ArrowUp) {
    circle.dy -= .1;
  }
  if(keyPressed.ArrowLeft) {
    circle.dx -= .1;
  }
  if(keyPressed.ArrowDown) {
    circle.dy += .1;
  }
  if(keyPressed.ArrowRight) {
    circle.dx += .1;
  }
  if(keyPressed.Space) {
    console.log("pew");
  }


  circle.update()
  }

animate();
