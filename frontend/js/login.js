document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // Use your existing toast function for clean alerts
        showToast(data.message || "An error occurred");

        if (response.ok) {
            // Save token and user info into local storage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to the personalized menu or user landing page
            setTimeout(() => {
                window.location.href = "user-menu.html"; 
            }, 1500);
        }
    } catch (error) {
        console.error("Login network error:", error);
        showToast("Could not connect to the server.");
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2500);
}