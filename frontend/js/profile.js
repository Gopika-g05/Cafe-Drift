// frontend/js/profile.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Retrieve user data safely from local storage
    const userString = localStorage.getItem("user");

    try {
        if (userString && userString !== "undefined") {
            const user = JSON.parse(userString);
            
            // 2. Safely populate your HTML span tags by matching their IDs
            if (document.getElementById("fullname")) {
                document.getElementById("fullname").innerText = user.name || user.username || "Cafe Drift Member";
            }
            if (document.getElementById("email")) {
                document.getElementById("email").innerText = user.email || "Not Available";
            }
// Inside frontend/js/profile.js
if (document.getElementById("phone")) {
    // Tries user.phone first, then falls back to user.phoneNumber
    document.getElementById("phone").innerText = user.phone || user.phoneNumber || "Not Provided";
}
        } else {
            console.warn("User data object not found in localStorage.");
            // Fallback text so the interface stays beautiful instead of crashing
            document.getElementById("fullname").innerText = "Coffee Lover";
            document.getElementById("email").innerText = "Logged In";
        }
    } catch (error) {
        console.error("Error displaying profile data:", error);
    }

    // 3. Keep your cart item counter updated on the profile dashboard
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-items");
    if (cartCountElement) {
        // Counts total item quantities
        cartCountElement.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
});