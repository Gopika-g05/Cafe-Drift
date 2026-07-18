// frontend/js/user-menu.js
function resolveImageSrc(item) {
    const fallbackMap = {
        espresso: 'espresso.jpg',
        cappuccino: 'cappuccino.jpg',
        latte: 'latte.jpg',
        sandwich: 'sandwich.jpg',
        burger: 'burger.jpg',
        fries: 'fries.jpg',
        brownie: 'brownie.jpg',
        cake: 'cake.jpg',
        donut: 'donut.jpg',
        tea: 'hot-tea.jpg',
        chai: 'chai.jpg',
        matcha: 'matcha.jpg',
        chocolate: 'hot-chocolate.jpg',
        steamer: 'steamer.jpg',
        milk: 'flavored-milk.jpg',
        smoothie: 'smoothie.jpg',
        frappe: 'frappe.jpg',
        milkshake: 'milkshake.jpg',
        juice: 'fresh-juice.jpg',
        lemonade: 'lemonade.jpg',
        soda: 'fruit-soda.jpg'
    };

    const rawValue = item?.image || '';
    const normalized = String(rawValue).trim().replace(/^\/+/, '').replace(/^images\//i, '').replace(/^frontend\//i, '');

    if (normalized.startsWith('http')) {
        return normalized;
    }

    if (normalized) {
        return `/images/${normalized}`;
    }

    const itemName = String(item?.name || '').toLowerCase();
    for (const [key, file] of Object.entries(fallbackMap)) {
        if (itemName.includes(key)) {
            return `/images/${file}`;
        }
    }

    return '/images/logo.png';
}

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
            coffee: document.getElementById("coffee-menu"),
            drinks: document.getElementById("coffee-menu"),
            snacks: document.getElementById("snacks-menu"),
            bakery: document.getElementById("snacks-menu"),
            desserts: document.getElementById("desserts-menu"),
            tea: document.getElementById("tea-menu"),
            chocolate: document.getElementById("chocolate-menu"),
            blended: document.getElementById("blended-menu"),
            juice: document.getElementById("juice-menu"),
            'main course': document.getElementById("coffee-menu"),
            'main-course': document.getElementById("coffee-menu")
        };

        // Loop through each item from the database
        items.forEach(item => {
            const targetContainer = containers[String(item.category || '').toLowerCase().trim()];

            if (targetContainer) {
                const cardHTML = `
                    <div class="menu-card" data-id="${item._id}">
                        <img src="${resolveImageSrc(item)}" alt="${item.name}" class="menu-item-img" onerror="this.onerror=null;this.src='/images/default-food.jpg';">
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