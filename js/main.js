document.addEventListener('DOMContentLoaded', function() {
    // Form validation and handling
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();

            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                // If it's the contact form, show success message
                if (form.id === 'contactForm') {
                    const successAlert = document.getElementById('successAlert');
                    successAlert.classList.remove('d-none');
                    successAlert.classList.add('show');
                    form.reset();

                    // Hide the alert after 5 seconds
                    setTimeout(() => {
                        successAlert.classList.remove('show');
                        successAlert.classList.add('d-none');
                    }, 5000);
                }
            }
            form.classList.add('was-validated');
        });
    });

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom >= 0) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check for elements in view
    fadeInOnScroll();

    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
});