document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {
        showToast("Passwords do not match!");
        return;
    }

    try {
    
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fullname, 
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        
        showToast(data.message || "An error occurred");

        if (response.ok) {
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        }
    } catch (error) {
        console.error("Error during signup:", error);
        showToast("Could not connect to the server.");
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return; 

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}