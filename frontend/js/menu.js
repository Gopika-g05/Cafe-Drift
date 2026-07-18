// frontend/js/menu.js (For public/guest menu.html)
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

    return '/images/default-food.jpg';
}

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
                <img src="${resolveImageSrc(item)}" alt="${item.name}" class="menu-item-img" onerror="this.onerror=null;this.src='/images/default-food.jpg';">
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