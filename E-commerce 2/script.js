const password = document.getElementById("password");
const message = document.getElementById("passwordMessage");

password.addEventListener("blur", function () {
    const value = password.value;

    if (value.length === 0) {
        message.textContent = "";
    }
    else if (value.length < 8) {
        message.textContent = "Use at least 8 characters";
    }
    else if (!/[A-Z]/.test(value)) {
        message.textContent = "Use at least one uppercase letter";
    }
    else if (!/[a-z]/.test(value)) {
        message.textContent = "Use at least one lowercase letter";
    }
    else if (!/[0-9]/.test(value)) {
        message.textContent = "Use at least one number";
    }
    else {
        message.textContent = "";
    }
});