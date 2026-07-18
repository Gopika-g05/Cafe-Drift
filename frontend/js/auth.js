// frontend/js/auth.js
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    // Check if the current page filename is one of our protected templates
    const isProtectedPage = currentPath.includes("profile.html") || 
                            currentPath.includes("user-menu.html") || 
                            currentPath.includes("cart.html");

    // ONLY redirect if the user does NOT have a valid token and tries to access a protected zone
    if (!token && isProtectedPage) {
        console.log("Auth Guard: Missing token. Redirecting to login.html");
        window.location.href = "login.html";
    }
});
