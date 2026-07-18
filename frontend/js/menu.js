// frontend/js/menu.js (For public/guest menu.html)
document.addEventListener("DOMContentLoaded", async () => {
    const menuContainer = document.getElementById("menuContainer");
    if (!menuContainer) return;

    try {
        const response = await fetch("/api/menu");
        const items = await response.json();

        if (!response.ok || items.length === 0) {
            menuContainer.innerHTML = `<p class="empty-msg">Our kitchen is currently preparing! Check back soon.</p>`;
            return;
        }

        // Render card layouts WITHOUT any "Add to Cart" buttons
        menuContainer.innerHTML = items.map(item => `
            <div class="menu-card" data-id="${item._id}">
                <img src="/images/${item.image || 'default-food.jpg'}" alt="${item.name}" class="menu-item-img">
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <p class="description">${item.description || 'Freshly made to order.'}</p>
                    <div class="price-row">
                        <span class="price">₹${item.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error loading guest menu:", error);
        menuContainer.innerHTML = `<p class="error-msg">Could not connect to the server.</p>`;
    }
});