/**
 * Contact Form Validation
 * Client-side form validation with accessibility features
 */

(function () {
    'use strict';

    // Validation rules
    const validators = {
        name: (value) => {
            if (!value.trim()) {
                return 'Please enter your name';
            }
            if (value.trim().length < 2) {
                return 'Name must be at least 2 characters';
            }
            return null;
        },

        email: (value) => {
            if (!value.trim()) {
                return 'Please enter your email address';
            }

            // Email regex pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                return 'Please enter a valid email address';
            }
            return null;
        },

        message: (value) => {
            if (!value.trim()) {
                return 'Please enter a message';
            }
            if (value.trim().length < 10) {
                return 'Message must be at least 10 characters';
            }
            return null;
        }
    };

    // Show error message
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        formGroup.classList.add('error');
        errorElement.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    };

    // Clear error message
    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        formGroup.classList.remove('error');
        errorElement.textContent = '';
        input.removeAttribute('aria-invalid');
    };

    // Validate single field
    const validateField = (input) => {
        const fieldName = input.name;
        const value = input.value;

        if (validators[fieldName]) {
            const error = validators[fieldName](value);

            if (error) {
                showError(input, error);
                return false;
            } else {
                clearError(input);
                return true;
            }
        }

        return true;
    };

    // Validate all fields
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        let firstInvalidField = null;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
            }
        });

        // Focus first invalid field
        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return isValid;
    };

    // Show form message
    const showFormMessage = (form, type, message) => {
        const messageElement = form.querySelector('#form-message');

        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.removeAttribute('hidden');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageElement.setAttribute('hidden', '');
        }, 5000);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.btn__text');
        const buttonLoader = submitButton.querySelector('.btn__loader');

        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending…';
        buttonLoader.removeAttribute('hidden');

        try {
            // Simulate API call (replace with your actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // TODO: Replace this with your actual form submission logic
            // Example using Formspree:
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //   method: 'POST',
            //   body: formData,
            //   headers: {
            //     'Accept': 'application/json'
            //   }
            // });

            // if (!response.ok) {
            //   throw new Error('Form submission failed');
            // }

            // Success
            showFormMessage(form, 'success', 'Thank you! Your message has been sent successfully.');
            form.reset();

            // Clear any remaining errors
            form.querySelectorAll('input, textarea').forEach(input => {
                clearError(input);
            });

        } catch (error) {
            // Error
            showFormMessage(form, 'error', 'Oops! Something went wrong. Please try again.');
            console.error('Form submission error:', error);

        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = 'Send Message';
            buttonLoader.setAttribute('hidden', '');
        }
    };

    // Setup form validation
    const setupForm = () => {
        const form = document.querySelector('#contact-form');

        if (!form) return;

        // Validate on submit
        form.addEventListener('submit', handleSubmit);

        // Validate on blur (when user leaves field)
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value) {
                    validateField(input);
                }
            });

            // Clear error on input
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    clearError(input);
                }
            });
        });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupForm);
    } else {
        setupForm();
    }
})();
