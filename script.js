const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("pass");
const cpassInput = document.getElementById("cpass");

const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");
const cpassErr = document.getElementById("cpassErr");


// Email pattern 
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, nameErr, "Name must be at least 3 characters");
    } else {
        showSuccess(nameInput, nameErr);
    }
});


emailInput.addEventListener("input", () => {
    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, emailErr, "Enter a valid email");
    } else {
        showSuccess(emailInput, emailErr);
    }
});

passInput.addEventListener("input", () => {
    checkPasswordStrength();
});

// Matching password

cpassInput.addEventListener("input", () => {
    if (cpassInput.value !== passInput.value) {
        showError(cpassInput, cpassErr, "Passwords do not match");
    } else {
        showSuccess(cpassInput, cpassErr);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    alert("Sign up successfully!");
    form.reset();
});

function validateForm() {
    let valid = true;

    if (nameInput.value.trim() === "") {
        showError(nameInput, nameErr, "Name is required");
        valid = false;
    }

    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, emailErr, "Enter a valid email");
        valid = false;
    }

    if (passInput.value.length < 6) {
        showError(passInput, passErr, "Password must be at least 6 characters");
        valid = false;
    }

    if (passInput.value !== cpassInput.value) {
        showError(cpassInput, cpassErr, "Passwords do not match");
        valid = false;
    }

    return valid;
}

// checking password strength

function checkPasswordStrength() {
    const password = passInput.value;

    if (password.length < 6) {
        showError(passInput, passErr, "Weak password");
        return;
    }

    if (!/[A-Z]/.test(password)) {
        showError(passInput, passErr, "Add at least one uppercase letter");
        return;
    }

    if (!/[0-9]/.test(password)) {
        showError(passInput, passErr, "Add at least one number");
        return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
        showError(passInput, passErr, "Add at least one special character");
        return;
    }

    showSuccess(passInput, passErr);
}

function showError(input, errorElement, message) {
    errorElement.innerHTML = message;
    input.style.borderColor = "red";
}

function showSuccess(input, errorElement) {
    errorElement.innerHTML = "";
    input.style.borderColor = "green";
}

function togglePassword(icon) {
    passInput.type =
        passInput.type === "password" ? "text" : "password";

    icon.src =
        passInput.type === "password" ? "./assets/show.png" : "./assets/hide.png";
}

function toggleCPassword(icon) {
    cpassInput.type =
        cpassInput.type === "password" ? "text" : "password";

    icon.src =
        cpassInput.type === "password" ? "./assets/show.png" : "./assets/hide.png";
}