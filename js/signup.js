document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const passwordToggles = document.querySelectorAll('.toggle-password');
    
    // Form validation messages
    const messages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        password: {
            length: 'Password must be at least 8 characters long',
            uppercase: 'Password must contain at least one uppercase letter',
            lowercase: 'Password must contain at least one lowercase letter',
            number: 'Password must contain at least one number',
            special: 'Password must contain at least one special character'
        },
        passwordMatch: 'Passwords do not match',
        terms: 'You must accept the Terms of Service and Privacy Policy'
    };

    // Toggle password visibility
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Validate phone number format
    function isValidPhone(phone) {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    }

    // Validate password strength
    function validatePassword(password) {
        const errors = [];
        if (password.length < 8) errors.push(messages.password.length);
        if (!/[A-Z]/.test(password)) errors.push(messages.password.uppercase);
        if (!/[a-z]/.test(password)) errors.push(messages.password.lowercase);
        if (!/[0-9]/.test(password)) errors.push(messages.password.number);
        if (!/[!@#$%^&*]/.test(password)) errors.push(messages.password.special);
        return errors;
    }

    // Show error message
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + 'Error');
        errorElement.textContent = message;
        document.getElementById(inputId).classList.add('error');
    }

    // Clear error message
    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + 'Error');
        errorElement.textContent = '';
        document.getElementById(inputId).classList.remove('error');
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Clear all previous errors
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

        // Validate full name
        const fullName = document.getElementById('fullName').value.trim();
        if (!fullName) {
            showError('name', messages.required);
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email').value.trim();
        if (!email) {
            showError('email', messages.required);
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', messages.email);
            isValid = false;
        }

        // Validate phone
        const phone = document.getElementById('phone').value.trim();
        if (!phone) {
            showError('phone', messages.required);
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', messages.phone);
            isValid = false;
        }

        // Validate user type
        const userType = document.getElementById('userType').value;
        if (!userType) {
            showError('type', messages.required);
            isValid = false;
        }

        // Validate password
        const password = document.getElementById('password').value;
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            showError('password', passwordErrors[0]);
            isValid = false;
        }

        // Validate confirm password
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            showError('confirmPassword', messages.passwordMatch);
            isValid = false;
        }

        // Validate terms acceptance
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showError('terms', messages.terms);
            isValid = false;
        }

        if (isValid) {
            // Create user object
            const user = {
                fullName,
                email,
                phone,
                userType,
                password
            };

            // For demo purposes, store in sessionStorage
            sessionStorage.setItem('newUser', JSON.stringify(user));

            // Show success message and redirect
            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'login.html';
        }
    });

    // Clear errors on input
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id);
        });
    });
});
