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

// GRAPHS SECTION
const counters = document.querySelectorAll('.stat-count');
let animated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector('.statistics-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateCounters();
            animated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Chart.js - Enrollment Growth Chart
const ctx = document.getElementById('enrollmentChart');
if (ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Students Enrolled',
                data: [50, 120, 200, 320, 450, 500],
                borderColor: '#c72a53',
                backgroundColor: 'rgba(199, 42, 83, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#c72a53',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#9d0c67',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#666'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}


// ADDMISSION FORM SWEET ALERT SECTION
if (window.location.href.includes("form.html")) {

    // Get the form element
    const form = document.getElementById("contactForm");

    // Get submit button
    const submitBtn = document.getElementById("submitBtn");

    // Formspree endpoint
    const FORM_URL = "https://formspree.io/f/mnnerdab";

    // Safety check: run only if form exists
    if (form && submitBtn) {

        // Listen for form submission
        form.addEventListener("submit", async function (e) {

            // Stop browser default submission
            e.preventDefault();

            // GET USER INPUT VALUES
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subjects = document.querySelectorAll(".subject-checkbox:checked");

            // CLIENT SIDE VALIDATION
            if (name === "" || phone === "" || subjects.length === 0) {

                Swal.fire({
                    title: "⚠️ Almost There!",
                    html: `
                        <p>Please complete all required fields.</p>
                    `,
                    icon: "warning",
                    confirmButtonColor: "#c72a53",
                    showClass: {
                        popup: "animate__animated animate__shakeX"
                    }
                });

                return; // Stop submission
            }

            // BUTTON UX (NO SPINNER)
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending your request...";
            submitBtn.style.opacity = "0.7";

            // SUBMIT FORM TO FORMSPREE
            try {

                const response = await fetch(FORM_URL, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                // SUCCESS RESPONSE
                if (response.ok) {

                    await Swal.fire({
                        title: "🎓 Admission Request Received!",
                        html: `
                            <p style="font-size:15px;">
                                Thank you for contacting <b>Aimers Academy</b>.
                            </p>
                            <p style="font-size:14px; color:#555;">
                                Our academic team will contact you shortly.
                            </p>
                            <hr>
                            <small style="color:#777;">
                                We look forward to guiding you towards success ✨
                            </small>
                        `,
                        icon: "success",
                        confirmButtonText: "Got it 👍",
                        confirmButtonColor: "#c72a53",
                        timer: 10000,
                        timerProgressBar: true,
                        showClass: {
                            popup: "animate__animated animate__fadeInUp"
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutDown"
                        }
                    });

                    // Clear form after success
                    form.reset();

                } else {
                    throw new Error("Form submission failed. Please try again.");
                }

            } catch (error) {


                // ERROR HANDLING
                Swal.fire({
                    title: "❌ Something Went Wrong",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#c72a53"
                });

            } finally {

                // RESET BUTTON STATE
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
                submitBtn.style.opacity = "1";
            }
        });
    }
}