// ADDMISSION FORM SWEET ALERT SECTION
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for contacting us. We’ll get back to you soon.',
                    confirmButtonColor: '#c72a53'
                });
                form.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || "Something went wrong.");
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error.message || 'Something went wrong while sending the message.',
                confirmButtonColor: '#c72a53'
            });
        });
});

