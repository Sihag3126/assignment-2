document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('data-path') === currentPath) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    function closeNav() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }

    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = header.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            closeNav();
        }
    });

    // Prevent clicks inside the nav from closing it
    navLinks.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const errorMessages = document.getElementById('errorMessages');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (errorMessages) {
                errorMessages.innerHTML = '';
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let errors = [];

            // Email validation
            if (!email) {
                errors.push('Email is required');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                errors.push('Email is invalid');
            }

            // Password validation
            if (!password) {
                errors.push('Password is required');
            } else if (password.length < 8) {
                errors.push('Password must be at least 8 characters long');
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                errors.push('Password must contain at least one lowercase letter, one uppercase letter, and one number');
            }

            if (errors.length > 0) {
                if (errorMessages) {
                    errors.forEach(error => {
                        const errorElement = document.createElement('p');
                        errorElement.textContent = error;
                        errorMessages.appendChild(errorElement);
                    });
                } else {
                    console.error('Error messages container not found');
                    alert(errors.join('\n'));
                }
            } else {
                form.submit();
            }
        });
    } else {
        console.error('Register form not found');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const errorMessages = document.getElementById('errorMessages');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (errorMessages) {
                errorMessages.innerHTML = '';
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let errors = [];

            // Email validation
            if (!email) {
                errors.push('Email is required');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                errors.push('Email is invalid');
            }

            // Password validation
            if (!password) {
                errors.push('Password is required');
            }

            if (errors.length > 0) {
                if (errorMessages) {
                    errors.forEach(error => {
                        const errorElement = document.createElement('p');
                        errorElement.textContent = error;
                        errorMessages.appendChild(errorElement);
                    });
                } else {
                    console.error('Error messages container not found');
                    alert(errors.join('\n'));
                }
            } else {
                // If validation passes, submit the form using AJAX
                fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            window.location.href = data.redirectUrl;
                        } else {
                            if (errorMessages) {
                                const errorElement = document.createElement('p');
                                errorElement.textContent = data.error;
                                errorMessages.appendChild(errorElement);
                            } else {
                                alert(data.error);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        if (errorMessages) {
                            const errorElement = document.createElement('p');
                            errorElement.textContent = 'An error occurred. Please try again.';
                            errorMessages.appendChild(errorElement);
                        } else {
                            alert('An error occurred. Please try again.');
                        }
                    });
            }
        });
    } else {
        console.error('Login form not found');
    }
});