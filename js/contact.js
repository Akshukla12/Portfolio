// Contact Form Logic using EmailJS
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusMessage = document.getElementById('status-message');

    // Initialize EmailJS (Replace with your own Public Key)
    // emailjs.init("YOUR_PUBLIC_KEY");

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic Validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ti ti-loader animate-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate sending (Replace with emailjs.sendForm)
            // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)

            // For Demo Purpose: Simulate network request
            setTimeout(() => {
                // Assume success
                showStatus('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();

                submitBtn.innerHTML = '<i class="ti ti-check"></i> Sent';

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);

            }, 1500);

            /* 
            // REAL IMPLEMENTATION:
            emailjs.sendForm('service_id', 'template_id', contactForm)
              .then(() => {
                showStatus('Message sent successfully!', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
              }, (error) => {
                showStatus('Failed to send message. Please try again.', 'error');
                console.error('FAILED...', error);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
              });
            */
        });
    }

    function showStatus(text, type) {
        statusMessage.textContent = text;
        statusMessage.className = `form-status ${type}`;

        // Auto hide after 5 seconds
        setTimeout(() => {
            statusMessage.className = 'form-status';
            statusMessage.textContent = '';
            statusMessage.style.display = 'none';
        }, 5000);
    }
});
