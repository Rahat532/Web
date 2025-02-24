document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('biodataForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error');
        errorDisplay.innerText = message;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error');
        errorDisplay.innerText = '';
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
    }

    function isValidEmail(emailValue) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(emailValue).toLowerCase());
    }

    function validateInputs() {
        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const passwordValue = password.value.trim();

        // First Name Validation
        if (firstNameValue === '') {
            setError(firstName, 'First name is required');
        } else if (!isNaN(firstNameValue)) {
            setError(firstName, 'Numbers are not allowed');
        } else {
            setSuccess(firstName);
        }

        // Last Name Validation
        if (lastNameValue === '') {
            setError(lastName, 'Last name is required');
        } else if (!isNaN(lastNameValue)) {
            setError(lastName, 'Numbers are not allowed');
        } else {
            setSuccess(lastName);
        }

        // Email Validation
        if (emailValue === '') {
            setError(email, 'Email is required');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Please enter a valid email address');
        } else {
            setSuccess(email);
        }

        // Phone Validation
        if (phoneValue === '') {
            setError(phone, 'Phone number is required');
        } else if (isNaN(phoneValue)) {
            setError(phone, 'Only numbers are allowed');
        } else if (phoneValue.length < 11) {
            setError(phone, 'Phone number must be at least 11 digits');
        } else {
            setSuccess(phone);
        }

        // Password Validation
        if (passwordValue === '') {
            setError(password, 'Password is required');
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters');
        } else {
            setSuccess(password);
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateInputs();
    });
});