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

// ADDMISSION FORM SWEET ALERT SECTION
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;

    // REQUIRED FIELD CHECK
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subjects = document.querySelectorAll(".subject-checkbox:checked");

    // VALIDATION
    if (name === "" || phone === "" || subjects.length === 0) {

        Swal.fire({
            icon: "error",
            title: "Missing Information",
            text: "Please fill all required fields and select at least one subject.",
            confirmButtonColor: "#c72a53"
        });

        return; // STOP FORM SUBMISSION
    }

    // If everything is filled correctly → Submit to Formspree
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thank you for contacting us. We'll get back to you soon.",
                confirmButtonColor: "#c72a53"
            });

            form.reset(); // clear form

        } else {
            throw new Error("Something went wrong. Please try again.");
        }

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: error.message,
            confirmButtonColor: "#c72a53"
        });
    }
});
