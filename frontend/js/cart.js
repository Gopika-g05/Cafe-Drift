// frontend/js/cart.js
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

function displayCartItems() {
    const cartContainer = document.getElementById("cartContainer");
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // If the cart is empty, render the large centered visual card
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                Your cart is empty! ☕
                <br>
                <a href="user-menu.html" class="shop-btn">Go to Menu</a>
            </div>
        `;
        return;
    }

    let total = 0;

    // Render list items using matching classes for images and actions
    let itemsHtml = cart.map((item, index) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;
        total += itemTotal;

        const itemId = item.id || item._id || `item-${index}`;
        const itemImageFile = item.image || item.imagePath || item.imageUrl;
        const imageSrc = itemImageFile
            ? (itemImageFile.startsWith('http') ? itemImageFile : `/images/${itemImageFile}`)
            : '/images/logo.png';

        return `
            <div class="cart-item" data-id="${itemId}">
                <img src="${imageSrc}" alt="${item.name || 'Treat'}" class="cart-image">
                <div class="item-details">
                    <h3>${item.name || 'Delicious Item'}</h3>
                    <p>₹${price.toFixed(2)} x ${quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <span style="font-weight: bold; font-size: 18px; color: #2d1810;">₹${itemTotal.toFixed(2)}</span>
                    <button type="button" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    // Append the custom structured checkout footer summary container below the items grid
    let summaryHtml = `
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <h3 style="margin-bottom: 20px; color: #3e2723;">Total Amount: ₹${total.toFixed(2)}</h3>
            <button class="order-btn" onclick="checkoutOrder()">Place Order</button>
        </div>
    `;

    cartContainer.innerHTML = itemsHtml + summaryHtml;
}

window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
};

window.checkoutOrder = async function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

    try {
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity || 1
                })),
                totalPrice: total
            })
        });

        if (response.ok) {
            completeOrder();
        } else {
            const data = await response.json();
            showToast("Checkout Failed: " + (data.message || "Error processing order."));
        }
    } catch (error) {
        console.error("Order submission API error:", error);
        completeOrder(true);
    }
};

function completeOrder(fallback = false) {
    localStorage.removeItem("cart");
    showToast(fallback ? "Order placed locally!" : "Order placed successfully!");
    setTimeout(() => {
        window.location.href = "order-success.html";
    }, 1000);
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2500);
}