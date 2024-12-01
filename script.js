const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
  constructor() {
    this.posX = canvas.width * 0.75 + Math.random() * canvas.width * 0.25;
    this.posY = Math.random() * canvas.height;
    this.radius = Math.random() * 60 + 40;
    this.velocity = Math.random() * 0.4 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  render() {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    context.fill();
    context.closePath();
  }

  move() {
    this.posY -= this.velocity;
    if (this.posY + this.radius < 0) {
      this.posY = canvas.height + this.radius;
      this.posX = canvas.width * 0.75 + Math.random() * canvas.width * 0.25;
    }
  }
}

const circles = Array.from({ length: 8 }, () => new Circle());

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circles.forEach((circle) => {
    circle.posX = canvas.width * 0.75 + Math.random() * canvas.width * 0.25;
    circle.posY = Math.random() * canvas.height;
  });
}

function animationLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.move();
    circle.render();
  });
  requestAnimationFrame(animationLoop);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animationLoop();
