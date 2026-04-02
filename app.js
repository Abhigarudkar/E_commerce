// Mock Data Fallback (Prices converted to INR roughly x82)
const mockProducts = [
    {
        "id": 101, "name": "Premium Vermicompost", "category": "Compost", "price": 450,
        "image": "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "100% organic earthworm compost. Rich in nutrients to enhance soil health rapidly.",
        "rating": 4.9, "reviews": 320
    },
    {
        "id": 102, "name": "Aged Cow Dung Compost", "category": "Manure", "price": 380,
        "image": "https://images.unsplash.com/photo-1598425237654-4ecc294c6536?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Fully decomposed, weed-free cow dung manure. Perfect base fertilizer.",
        "rating": 4.7, "reviews": 215
    },
    {
        "id": 103, "name": "AzotoBoost Bio Fertilizer", "category": "Bio Fertilizer", "price": 750,
        "image": "https://images.unsplash.com/photo-1592982537447-6f2acc22dcdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Live culture of Azotobacter bacteria that naturally traps atmospheric nitrogen.",
        "rating": 4.8, "reviews": 189
    },
    {
        "id": 104, "name": "Pure Neem Cake", "category": "Pest Control", "price": 540,
        "image": "https://images.unsplash.com/photo-1615814040994-098555e0c6eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Slow-release organic fertilizer and a powerful natural soil pest repellent.",
        "rating": 4.9, "reviews": 430
    },
    {
        "id": 105, "name": "Seaweed Extract Liquid", "category": "Liquid Growth", "price": 620,
        "image": "https://images.unsplash.com/photo-1585807466540-1a6bcce8bafb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Boosts plant immunity and improves resistance against stress.",
        "rating": 4.6, "reviews": 150
    },
    {
        "id": 106, "name": "Bone Meal Powder", "category": "Phosphorus Rich", "price": 490,
        "image": "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Excellent source of organic phosphorus for strong root development.",
        "rating": 4.5, "reviews": 210
    },
    {
        "id": 107, "name": "Mustard Oil Cake", "category": "Nitrogen Rich", "price": 310,
        "image": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Highly nutritious for flowering plants. 100% natural and safe.",
        "rating": 4.7, "reviews": 180
    },
    {
        "id": 108, "name": "Epsom Salt (Magnesium)", "category": "Micronutrients", "price": 280,
        "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "description": "Helps seeds germinate, makes plants grow bushier, and produces more flowers.",
        "rating": 4.8, "reviews": 512
    }
];

let cart = [];
let myOrders = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(mockProducts);
    initScrollAnimations();
});

// Render Products
function renderProducts(products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    products.forEach((p, index) => {
        // Add staggered animation delay
        const delay = (index % 4) * 0.1;

        grid.innerHTML += `
            <div class="product-card fade-in-up" style="transition-delay: ${delay}s">
                <div class="product-category">${p.category}</div>
                <div class="product-img-wrapper">
                    <img src="${p.image}" class="product-img" alt="${p.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div style="color: var(--accent); margin-bottom: 15px; font-size: 0.9rem;">
                        <i class="fa-solid fa-star"></i> ${p.rating} (${p.reviews} reviews)
                    </div>
                    <div class="product-price-row">
                        <div class="product-price">₹${p.price}</div>
                    </div>
                    <div class="product-actions">
                        <button class="btn-cart" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                        <button class="btn-buy" onclick="addToCart(${p.id}); openCart();">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Cart Logic
function addToCart(id) {
    const product = mockProducts.find(p => p.id === id);
    if (product) {
        cart.push(product);
        updateCartBadge();

        // Show lightweight floating toast mechanism (Optional improvement, here we just alert or silently update)
        // We'll just update the badge smoothly
        const badge = document.querySelector('.cart-badge');
        badge.style.transform = "scale(1.5)";
        setTimeout(() => badge.style.transform = "scale(1)", 200);
    }
}

function updateCartBadge() {
    document.querySelector('.cart-badge').textContent = cart.length;
}

function openCart() {
    const modal = document.getElementById('cartModal');
    const itemsDiv = document.getElementById('cartItems');
    let total = 0;

    itemsDiv.innerHTML = '';
    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p class="text-center" style="color: var(--text-light)">Your basket is empty.</p>';
    } else {
        cart.forEach((item, i) => {
            total += item.price;
            itemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong><br>
                        <span style="color: var(--primary)">₹${item.price.toFixed(0)}</span>
                    </div>
                    <button onclick="removeFromCart(${i})" style="border:none; background:transparent; color:#d32f2f; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });
    }

    document.getElementById('cartTotal').textContent = `₹${total.toFixed(0)}`;
    modal.style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    openCart(); // Re-render
}

function showCheckout() {
    document.getElementById('proceedBtn').style.display = 'none';
    document.getElementById('checkoutSection').style.display = 'block';
}

function processOrder() {
    const name = document.getElementById('bName').value;
    const addr = document.getElementById('bAddr').value;
    if (!name || !addr) {
        alert("Please enter Name and Address");
        return;
    }

    closeCart();

    const orderTotal = cart.reduce((sum, item) => sum + item.price, 0);

    // Save order
    const newOrder = {
        id: "ORD" + Math.floor(Math.random() * 100000),
        items: [...cart],
        total: orderTotal,
        date: new Date().toLocaleDateString(),
        status: "Placed" // Can be Placed, Shipped, Delivered
    };
    myOrders.push(newOrder);

    // Show Success Modal
    const orderModal = document.getElementById('orderSuccessModal');
    document.getElementById('orderMsg').innerHTML = `Thank you <strong>${name}</strong>!<br>Your order <strong>#${newOrder.id}</strong> for <strong>₹${orderTotal}</strong> has been placed.<br>Check the "My Orders" tab to track it!`;

    orderModal.style.display = 'flex';

    cart = [];
    updateCartBadge();
}

function closeOrderSuccess() {
    document.getElementById('orderSuccessModal').style.display = 'none';
}

// Order Tracking Logic
function openOrdersModal() {
    const modal = document.getElementById('ordersModal');
    const container = document.getElementById('ordersContainer');
    container.innerHTML = '';

    if (myOrders.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--text-light)">You have no orders yet.</p>';
    } else {
        myOrders.forEach(order => {
            const itemsHtml = order.items.map(i => i.name).join(", ");
            container.innerHTML += `
                <div class="order-card">
                    <div class="d-flex justify-between" style="margin-bottom: 10px;">
                        <strong>Order #${order.id}</strong>
                        <span style="color: var(--primary)">₹${order.total}</span>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 15px;">${itemsHtml}</p>
                    
                    <!-- Tracking Animation UI -->
                    <div class="tracking-wrap">
                        <div class="track-step active">
                            <i class="fa-solid fa-box"></i>
                            <p>Placed</p>
                        </div>
                        <div class="track-line active-line"></div>
                        <div class="track-step">
                            <i class="fa-solid fa-truck-fast"></i>
                            <p>Shipped</p>
                        </div>
                        <div class="track-line"></div>
                        <div class="track-step">
                            <i class="fa-solid fa-house"></i>
                            <p>Delivered</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    modal.style.display = 'block';
}

function closeOrdersModal() {
    document.getElementById('ordersModal').style.display = 'none';
}

// AI Chatbot Mock Logic
let chatOpen = false;

function toggleChat() {
    const chat = document.getElementById('aiChatbot');
    chatOpen = !chatOpen;
    chat.style.display = chatOpen ? 'flex' : 'none';
    if (chatOpen) {
        document.getElementById('chatInput').focus();
    }
}

function openAIChat(e) {
    e.preventDefault();
    if (!chatOpen) toggleChat();
}

function handleChatKeypress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;

    // Add user message to UI
    appendMessage(msg, 'user');
    input.value = '';

    // Simulate AI thinking and response
    appendMessage('<span class="typing-indicator"><i></i><i></i><i></i></span>', 'bot');

    setTimeout(() => {
        // Remove typing indicator
        const messages = document.querySelectorAll('.message.bot');
        const lastMsg = messages[messages.length - 1];
        if (lastMsg && lastMsg.innerHTML.includes('typing-indicator')) {
            lastMsg.remove();
        }

        const reply = generateBotReply(msg.toLowerCase());
        appendMessage(reply, 'bot');
    }, 1200);
}

function appendMessage(text, sender) {
    const body = document.getElementById('chatBody');
    body.innerHTML += `<div class="message ${sender}">${text}</div>`;
    body.scrollTop = body.scrollHeight; // Auto-scroll
}

function generateBotReply(msg) {
    if (msg.includes('wheat')) return "For Wheat, I recommend our AzotoBoost Bio Fertilizer to efficiently fix nitrogen!";
    if (msg.includes('rice') || msg.includes('paddy')) return "For Rice, Cow Dung Compost provides excellent soil prep before transplanting.";
    if (msg.includes('vegetable')) return "Vermicompost is fantastic for vegetables! Use about 200g per plant.";
    if (msg.includes('pest') || msg.includes('disease')) return "To manage soil pests naturally, apply our Pure Neem Cake.";
    return "That's a great question! Organic farming ensures long-term yield. I recommend Vermicompost as a highly nutrient-rich start for almost everything. Can I specify for a particular crop?";
}

// Scroll Animations Logic using Intersection Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Close modals when clicking outside
window.onclick = function (event) {
    if (event.target == document.getElementById('cartModal')) closeCart();
    if (event.target == document.getElementById('ordersModal')) closeOrdersModal();
}

