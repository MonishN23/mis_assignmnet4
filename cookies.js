// Helper function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Helper function to set a cookie with an expiration date
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Helper function to delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Update the welcome message based on the cookie
function updateWelcomeMessage() {
    const name = getCookie('firstName');
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (name) {
        welcomeMessage.textContent = `Welcome, ${name}!`;
    } else {
        welcomeMessage.textContent = 'Welcome, New User!';
    }
}

// Save user data (first name) and update the cookie
function saveUserData(event) {
    event.preventDefault(); // Prevent form submission
    const firstName = document.getElementById('firstName').value;
    if (firstName) {
        setCookie('firstName', firstName, 7); // Set cookie to expire in 7 days
        updateWelcomeMessage();
        alert('Your name has been saved!');
    }
}

// Reset user as new by clearing the cookie
function resetUser() {
    deleteCookie('firstName');
    updateWelcomeMessage();
    alert('You are now treated as a new user!');
}

// On page load, update the welcome message
document.addEventListener('DOMContentLoaded', updateWelcomeMessage);
