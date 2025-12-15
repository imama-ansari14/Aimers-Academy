// cursor-following ripple
const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // Smooth movement for large circle
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    // Move small circle with cursor
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

    // Move large one smoothly
    trail.style.transform = `translate(${trailX}px, ${trailY}px)`;

    requestAnimationFrame(animate);
}
animate();
