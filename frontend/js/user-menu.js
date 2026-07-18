// frontend/js/user-menu.js
document.addEventListener("DOMContentLoaded", async () => {
    updateCartCount();
    await loadCategorizedMenu();
});

async function loadCategorizedMenu() {
    try {
        const response = await fetch("/api/menu");
        const items = await response.json();

        if (!response.ok || items.length === 0) {
            console.log("No menu items found in MongoDB.");
            return;
        }

        // Updated container mapping to handle both names smoothly
        const containers = {
            "Coffee": document.getElementById("coffee-menu"),
            "Drinks": document.getElementById("coffee-menu"),   // Maps database "Drinks" to your Coffee section
            "Snacks": document.getElementById("snacks-menu"),
            "Bakery": document.getElementById("snacks-menu"),   // Maps database "Bakery" to your Snacks section
            "Desserts": document.getElementById("desserts-menu"),
            "Tea": document.getElementById("tea-menu"),
            "Chocolate": document.getElementById("chocolate-menu"),
            "Blended": document.getElementById("blended-menu"),
            "Juice": document.getElementById("juice-menu")
        };

        // Loop through each item from the database
        items.forEach(item => {
            const targetContainer = containers[item.category];

            if (targetContainer) {
                const cardHTML = `
                    <div class="menu-card" data-id="${item._id}">
                        <img src="/images/${item.image || 'default.jpg'}" alt="${item.name}" class="menu-item-img">
                        <div class="menu-item-details">
                            <h3>${item.name}</h3>
                            <p class="description">${item.description || 'Freshly made to order.'}</p>
                            <div class="price-row">
                                <span class="price">₹${item.price}</span>
                                <button class="add-to-cart-btn" onclick="addToCart('${item._id}', '${item.name}', ${item.price}, '${item.image || 'default.jpg'}')">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                targetContainer.insertAdjacentHTML('beforeend', cardHTML);
            } else {
                console.warn(`No HTML container section found for category: "${item.category}"`);
            }
        });

    } catch (error) {
        console.error("Error loading user menu items:", error);
    }
}

// Shopping Cart Add Action
// Inside your user-menu.js click handler
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image: image || 'default.jpg', quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update the navbar count element: Cart (X)
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (!cartCountElement) return;
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalCount;
}

// Visual Toast Pop-up Notification
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}