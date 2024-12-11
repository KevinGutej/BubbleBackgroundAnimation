const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Bubble {
  constructor() {
    this.x = canvas.width * 0.75 + Math.random() * canvas.width * 0.25;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 50 + 30;
    this.speed = Math.random() * 0.3 + 0.2;
    this.color = `rgba(255, 99, 71, ${Math.random() * 0.5 + 0.3})`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
      this.x = canvas.width * 0.75 + Math.random() * canvas.width * 0.25;
    }
  }
}

const bubbles = Array.from({ length: 8 }, () => new Bubble());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((bubble) => {
    bubble.update();
    bubble.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();

window.addEventListener("scroll", () => {
  const navbar = document.querySelector("header");
  navbar.classList.toggle("sticky", window.scrollY > 50);
});

const testimonials = document.querySelectorAll(".testimonial-item");
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transform = `translateX(${(i - index) * 100}%)`;
    testimonial.style.transition = "transform 0.5s ease-in-out";
  });
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 5000);

const animatedSections = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedSections.forEach((section) => observer.observe(section));
