let canvas = document.getElementById('main');
let c = canvas.getContext('2d');
let interval;
let enemyx = Math.floor(Math.random() * 800);
let enemyy = Math.floor(Math.random() * 1000);
let enemyradius = 20;
let enemieskilled = -1;
let red = Math.floor(Math.random() * 256);
let green = Math.floor(Math.random() * 256);
let blue = Math.floor(Math.random() * 256);
let alpha = 1;

function init() {
    enemyinit();
    animate();
    score();
}

function score() {
    requestAnimationFrame(score);
    c.font = "30px Arial";
    c.fillStyle = "white";
    c.fillText("You've killed " + enemieskilled + " enemies!", 10, 50);
    // canvas.innerWidth - 50, canvas.innerHeight - 20
    if (enemieskilled >= 10){
        enemyx = 9999999
        c.fillText("You've Won!!!!", 700, 500);
    }
    if (enemyradius >= 200) {
        enemyx = 9999999
        c.fillText("You've Lost!!!!", 700, 500);
    }
}

function drawenemy() {
    var alpha = 1;
    c.strokeStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    c.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    c.beginPath();
    c.arc(enemyx, enemyy, enemyradius, 0, Math.PI * 2, false);
    c.stroke();
    c.fill();
}

function enemyinit() {
    enemieskilled += 1;
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    enemyx = Math.floor(Math.random() * 1000);
    enemyy = Math.floor(Math.random() * 1000);
    enemyradius = 20;
    drawenemy();
}

function enemyupdate() {
    enemyradius += .4
    if(enemyradius < 5) {
        enemyinit();
    }
    drawenemy();
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
    shoot();
    }

    enemyupdate();


    circle.update()
  }

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function shoot() {
    if (getDistance(circle.x, circle.y, enemyx, enemyy) <
        circle.radius + enemyradius) {
            enemyradius -= 5;
        }
}
