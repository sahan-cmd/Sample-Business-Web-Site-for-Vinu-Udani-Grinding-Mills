import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvic1a4uKJbdYFEINkWg5o9IwojkSmP2o",
  authDomain: "vinu-udani-grinding-mills.firebaseapp.com",
  projectId: "vinu-udani-grinding-mills",
  storageBucket: "vinu-udani-grinding-mills.firebasestorage.app",
  messagingSenderId: "946213614427",
  appId: "1:946213614427:web:e32b938fc42514f134607e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Application State
let cart = [];
let isCartOpen = false;
let isAuthOpen = false;
let isPaymentOpen = false;
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLang = localStorage.getItem('lang') || 'en';

const translations = {
    en: {
        shopNow: "Shop Now",
        ourSpices: "Our Pure Spices",
        spicesDesc: "100% natural, freshly ground in Sri Lanka.",
        buy: "Buy",
        yourOrder: "Your Order",
        emptyCart: "Your cart is empty.",
        subtotal: "Subtotal:",
        total: "Total:",
        checkout: "Checkout via POS",
        buyNow: "Buy Now",
        discountMsg: "5% Discount Applied (3+ Items)!",
        login: "Login",
        aboutTitle: "About Us",
        aboutLegacy: "Our Legacy Since 1996",
        aboutDesc1: "The story of Vinu Udani Grinding Mills is one rooted in tradition, purity, and a deep-seated love for authentic Sri Lankan flavors. Established in 1996, we began our journey with a simple yet powerful mission: to bring the true essence of Sri Lankan spices from the sun-drenched fields directly to your kitchen. For nearly three decades, we have remained a family-oriented business that values quality over quantity, ensuring that every spoonful of spice we produce carries the heritage of our island.",
        aboutMissionTitle: "Our Mission and Motto",
        aboutMission: "Our philosophy is captured in our motto: \"Distributing 100% natural, non-toxic, fresh spices with a rustic flavor throughout Sri Lanka.\"",
        contactTitle: "Contact Details",
        phoneLbl: "Phone:",
        emailLbl: "Email:",
        addrLbl: "Address:",
        addedToCart: "Added to Cart",
        paymentMethod: "Payment Method",
        cardPayment: "Card Payment",
        codDelivery: "Cash on Delivery",
        confirmOrder: "Confirm Order"
    },
    si: {
        shopNow: "මිලදී ගන්න",
        ourSpices: "අපගේ නැවුම් කුළු බඩු",
        spicesDesc: "100% ස්භාවික, ශ්‍රී ලංකාවේ අඹරන ලද.",
        buy: "මිලදී ගන්න",
        yourOrder: "ඔබගේ ඇණවුම",
        emptyCart: "ඔබගේ කූඩය හිස් ය.",
        subtotal: "අතුරු එකතුව:",
        total: "මුළු මුදල:",
        checkout: "POS හරහා ඉටු කරන්න",
        buyNow: "දැන්ම මිලදී ගන්න",
        discountMsg: "5% ක වට්ටමක් ලැබී ඇත (අයිතම 3+)! ",
        login: "ඇතුල් වන්න",
        aboutTitle: "අප ගැන",
        aboutLegacy: "1996 සිට අපගේ උරුමය",
        aboutDesc1: "විනු උදානි ග්‍රයින්ඩින් මිල්ස් කතන්දරය ලාංකීය කුළුබඩු වල සැබෑ රසයට ආදරය කරන පාරම්පරික ව්‍යාපාරයකි. 1996 දී ආරම්භ කරන ලද අපගේ අරමුණ වන්නේ ශ්‍රී ලංකාවේ කුළුබඩු වල නියම සුවඳ ඔබේ මුළුතැන්ගෙට ගෙන ඒමයි.",
        aboutMissionTitle: "අපගේ අරමුණ",
        aboutMission: "\"100% ස්වභාවික, වසවිසෙන් තොර, ගැමි රසයකින් යුතු කුළු බඩු ශ්‍රී ලංකාව පුරා බෙදා හැරීම\" අපගේ තේමාවයි.",
        contactTitle: "අපව සම්බන්ධ කරගැනීමට",
        phoneLbl: "දුරකථන අංකය:",
        emailLbl: "විද්‍යුත් තැපෑල:",
        addrLbl: "ලිපිනය:",
        addedToCart: "සාර්ථකව එක් කරන ලදි",
        paymentMethod: "ගෙවීමේ ක්‍රමය",
        cardPayment: "කාඩ්පත මගින් ගෙවීම",
        codDelivery: "භාණ්ඩ ලැබුණු පසු ගෙවීම (COD)",
        confirmOrder: "ඇණවුම තහවුරු කරන්න"
    }
};

const appDiv = document.getElementById('app');

function init() {
    setTheme(currentTheme);
    renderApp();
    setupEventListeners();
    updateCartIcon();
    applyLanguage();
    initObserver();
}

function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }
}

function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function renderApp() {
    appDiv.innerHTML = `
        ${renderNavbar()}
        ${renderHero()}
        ${renderProducts()}
        ${renderAbout()}
        ${renderFooter()}
        ${renderCartPanel()}
        ${renderAuthModal()}
        ${renderPaymentModal()}
        ${renderItemPreviewPopup()}
        <div id="overlay" class="overlay"></div>
    `;
}

function renderNavbar() {
    return `
        <nav class="navbar glass">
            <div class="nav-brand" style="cursor: pointer;" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})">
                <img src="../Photots/old logo.png" alt="Logo" class="nav-logo" onerror="this.src='https://via.placeholder.com/50?text=Logo'">
            </div>
            <div class="nav-links">
                 <a href="#products" class="t-ourSpices">Our Spices</a>
                 <a href="#about" class="t-aboutTitle">About</a>
                 <a href="#contact" class="t-contactTitle">Contact</a>
            </div>
            <div class="nav-actions">
                <button id="lang-toggle" class="btn btn-secondary glass" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
                    ${currentLang === 'en' ? 'සිංහල' : 'English'}
                </button>
                <button id="theme-toggle" class="icon-btn" title="Toggle Theme">
                    <i id="theme-icon" class="ph ph-${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>
                </button>
                <button id="auth-btn" class="btn btn-secondary glass" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
                    <i class="ph ph-user"></i> <span class="t-login">Login</span>
                </button>
                <button id="cart-toggle" class="icon-btn cart-icon-wrapper" title="Cart">
                    <i class="ph ph-shopping-cart"></i>
                    <span id="cart-badge" class="cart-badge" style="display: none;">0</span>
                </button>
            </div>
        </nav>
    `;
}

function renderHero() {
    return `
        <section class="hero">
            <div class="hero-content" style="padding: 3rem; border-radius: 24px;">
                <h1 class="hero-title">${businessDetails[currentLang].name}</h1>
                <p class="hero-subtitle">${businessDetails[currentLang].motto}</p>
                <button class="btn btn-primary" onclick="document.getElementById('products').scrollIntoView({behavior: 'smooth'})">
                    <i class="ph ph-shopping-bag"></i> <span class="t-shopNow">Shop Now</span>
                </button>
            </div>
        </section>
    `;
}

function getProductsHtml() {
    return products.map(product => {
        const variantsHtml = product.variants.map((v, idx) => `<option value="${idx}">${v.weight}</option>`).join('');
        const startPrice = product.variants[0].price;

        return `
        <div class="product-card fade-in" style="opacity: 1; background: var(--bg-surface); border: none;">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product[currentLang].name}" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
            </div>
            <div class="product-info">
                <h3 class="product-name" style="margin-bottom: 0.5rem;">${product[currentLang].name}</h3>
                <p class="product-desc">${product[currentLang].description}</p>
                <div class="product-meta">
                    <select id="select-variant-${product.id}" class="variant-select" onchange="window.updateProductPrice(this, ${product.id})">
                        ${variantsHtml}
                    </select>
                    <span class="product-price" id="price-${product.id}">Rs. ${startPrice}</span>
                </div>
                <button class="btn btn-primary buy-btn" onclick="window.handleBuyClick(${product.id})" style="width: 100%;">
                    <i class="ph ph-shopping-cart-simple"></i> <span class="t-buy">${translations[currentLang].buy || 'Buy'}</span>
                </button>
            </div>
        </div>
    `}).join('');
}

function renderProducts() {
    return `
        <section id="products" class="section">
            <div class="section-header fade-in">
                <h2 class="section-title t-ourSpices">Our Pure Spices</h2>
                <p style="color: var(--text-muted);" class="t-spicesDesc">100% natural, freshly ground in Sri Lanka.</p>
            </div>
            <div id="product-grid" class="product-grid">
                ${getProductsHtml()}
            </div>
        </section>
    `;
}

window.updateProductPrice = function (selectElem, productId) {
    const index = parseInt(selectElem.value);
    const product = products.find(p => p.id === productId);
    const priceSpan = document.getElementById('price-' + productId);
    if (product && priceSpan) {
        priceSpan.innerText = 'Rs. ' + product.variants[index].price;
    }
};

window.handleBuyClick = function (productId) {
    const sel = document.getElementById('select-variant-' + productId);
    if (sel) {
        addToCart(productId, parseInt(sel.value));
    }
};

function renderAbout() {
    return `
        <section id="about" class="section glass-heavy fade-in" style="margin: 2rem auto; border-radius: 16px; max-width: 1000px;">
            <div class="section-header">
                <h2 class="section-title t-aboutTitle">About Us</h2>
                <p style="color: var(--text-muted);" class="t-aboutLegacy">Our Legacy Since 1996</p>
            </div>
            <div style="font-size: 1.1rem; max-width: 800px; margin: 0 auto; text-align: justify; line-height: 1.8;">
                <p class="t-aboutDesc1">The story of Vinu Udani Grinding Mills is one rooted in tradition, purity, and a deep-seated love for authentic Sri Lankan flavors. Established in 1996, we began our journey with a simple yet powerful mission: to bring the true essence of Sri Lankan spices from the sun-drenched fields directly to your kitchen. For nearly three decades, we have remained a family-oriented business that values quality over quantity, ensuring that every spoonful of spice we produce carries the heritage of our island.</p>
                <br>
                <h3 class="t-aboutMissionTitle" style="color: var(--brand-red); margin-bottom:0.5rem;">Our Mission and Motto</h3>
                <p class="t-aboutMission" style="border-left: 4px solid var(--brand-yellow); padding-left: 1rem; font-style: italic;">Our philosophy is captured in our motto: "Distributing 100% natural, non-toxic, fresh spices with a rustic flavor throughout Sri Lanka."</p>
            </div>
        </section>
    `;
}

function renderFooter() {
    return `
        <footer id="contact" class="footer glass fade-in">
            <div class="footer-content">
                <div class="footer-info">
                    <h2 class="t-contactTitle" style="color:var(--brand-red); margin-bottom:1rem;">Contact Details</h2>
                    <p style="margin-bottom:0.8rem;"><i class="ph-fill ph-phone" style="color:var(--brand-red)"></i> <strong class="t-phoneLbl">Phone:</strong> ${businessDetails.phone}</p>
                    <p style="margin-bottom:0.8rem;"><i class="ph-fill ph-envelope" style="color:var(--brand-yellow)"></i> <strong class="t-emailLbl">Email:</strong> ${businessDetails.email}</p>
                    <p style="margin-bottom:0.8rem;"><i class="ph-fill ph-map-pin" style="color:var(--brand-red)"></i> <strong class="t-addrLbl">Address:</strong> <span class="footer-address-text">${businessDetails[currentLang].address}</span></p>
                    <div style="margin-top: 1.5rem;">
                        <a href="${businessDetails.facebook}" target="_blank" class="btn btn-secondary glass"><i class="ph-fill ph-facebook-logo"></i> Facebook</a>
                    </div>
                </div>
                <div class="footer-map" style="border-radius:12px; overflow:hidden; border: 2px solid var(--border-color);">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.428456616895!2d79.82483569650212!3d7.424367396163351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e03af3077759%3A0x6bba46c5354eefca!2sMadampe%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div class="footer-bottom">
                © 2026 Sahan Ramanayake. All rights reserved.
            </div>
        </footer>
    `;
}

function renderCartPanel() {
    return `
        <div id="cart-panel" class="cart-panel">
            <div class="cart-header">
                <h2 class="cart-title"><i class="ph ph-shopping-cart"></i> <span class="t-yourOrder">Your Order</span></h2>
                <button id="close-cart" class="close-btn"><i class="ph ph-x"></i></button>
            </div>
            <div id="cart-items" class="cart-items">
                </div>
            <div class="cart-footer">
                <div id="discount-msg" class="discount-msg">
                    <i class="ph ph-tag"></i> <span class="t-discountMsg">5% Discount Applied (3+ Items)!</span>
                </div>
                <div class="cart-summary">
                    <span class="t-subtotal">Subtotal:</span>
                    <span id="cart-subtotal">Rs. 0.00</span>
                </div>
                <div class="cart-summary" style="margin-bottom: 1rem;">
                    <span class="t-total">Total:</span>
                    <span id="cart-total" class="cart-total">Rs. 0.00</span>
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="window.openPaymentModal()"><i class="ph ph-credit-card"></i> <span class="t-buyNow">Buy Now</span></button>
            </div>
        </div>
    `;
}

function renderAuthModal() {
    return `
        <div id="auth-modal" class="auth-modal glass-heavy">
            <button id="close-auth" class="close-btn" style="position: absolute; top: 1rem; right: 1rem;">
                <i class="ph ph-x"></i>
            </button>
            <div class="auth-header">
                <h2 id="auth-title" class="auth-title">Welcome Back</h2>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Sign in to your account</p>
            </div>
            <button class="btn social-btn google">
                <i class="ph-fill ph-google-logo"></i> Continue with Google
            </button>
            <button class="btn social-btn facebook">
                <i class="ph-fill ph-facebook-logo"></i> Continue with Facebook
            </button>
            <div class="auth-divider">
                <span>or</span>
            </div>
            <form id="auth-form" class="auth-form" onsubmit="event.preventDefault();">
                <div class="input-group">
                    <label>Email</label>
                    <input type="email" class="input-control" placeholder="Enter your email" required>
                </div>
                <div class="input-group">
                    <label>Password</label>
                    <input type="password" class="input-control" placeholder="Enter your password" required>
                </div>
                <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">Sign In</button>
            </form>
            <div class="auth-switch">
                Don't have an account? <a href="#" id="switch-auth-mode">Create new account</a>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'si' : 'en';
        localStorage.setItem('lang', currentLang);
        document.getElementById('lang-toggle').innerText = currentLang === 'en' ? 'සිංහල' : 'English';
        applyLanguage();
    });
    document.getElementById('cart-toggle').addEventListener('click', () => toggleCart(true));
    document.getElementById('close-cart').addEventListener('click', () => toggleCart(false));
    document.getElementById('auth-btn').addEventListener('click', () => toggleAuth(true));
    document.getElementById('close-auth').addEventListener('click', () => toggleAuth(false));
    document.getElementById('switch-auth-mode').addEventListener('click', (e) => {
        e.preventDefault();
        const title = document.getElementById('auth-title');
        const submitBtn = document.querySelector('#auth-form button[type="submit"]');
        const switchText = document.getElementById('switch-auth-mode');
        if (title.innerText === 'Welcome Back') {
            title.innerText = 'Create Account';
            submitBtn.innerText = 'Register';
            switchText.innerText = 'Sign in instead';
            switchText.previousSibling.textContent = 'Already have an account? ';
        } else {
            title.innerText = 'Welcome Back';
            submitBtn.innerText = 'Sign In';
            switchText.innerText = 'Create new account';
            switchText.previousSibling.textContent = "Don't have an account? ";
        }
    });
    document.getElementById('overlay').addEventListener('click', () => {
        toggleCart(false);
        toggleAuth(false);
        window.closePaymentModal();
    });
}

function toggleCart(show) {
    isCartOpen = show;
    document.getElementById('cart-panel').classList.toggle('open', show);
    document.getElementById('overlay').classList.toggle('active', show || isAuthOpen);
}

function toggleAuth(show) {
    isAuthOpen = show;
    document.getElementById('auth-modal').classList.toggle('active', show);
    document.getElementById('overlay').classList.toggle('active', show || isCartOpen);
}

// Payment Modal
function renderPaymentModal() {
    return `
        <div id="payment-modal" class="auth-modal glass-heavy">
            <button class="close-btn" style="position: absolute; top: 1rem; right: 1rem;" onclick="window.closePaymentModal()">
                <i class="ph ph-x"></i>
            </button>
            <div class="auth-header">
                <h2 class="auth-title t-paymentMethod">Payment Method</h2>
            </div>
            <div style="margin-bottom: 1rem;">
                <input type="text" id="cust-name" placeholder="ඔබේ නම" class="input-control" required style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;">
                <input type="text" id="cust-phone" placeholder="දුරකථන අංකය" class="input-control" required style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;">
                <textarea id="cust-address" placeholder="භාණ්ඩ ලැබිය යුතු ලිපිනය" class="input-control" required style="width: 100%; padding: 0.5rem;"></textarea>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <label class="payment-option">
                    <input type="radio" name="paymentType" value="card" checked>
                    <div class="payment-card">
                        <i class="ph ph-credit-card"></i>
                        <span class="t-cardPayment">Card Payment</span>
                    </div>
                </label>
                <label class="payment-option">
                    <input type="radio" name="paymentType" value="cod">
                    <div class="payment-card">
                        <i class="ph ph-truck"></i>
                        <span class="t-codDelivery">Cash on Delivery</span>
                    </div>
                </label>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" onclick="window.confirmOrder()">
                <i class="ph ph-check-circle"></i> <span class="t-confirmOrder">Confirm Order</span>
            </button>
        </div>
    `;
}

window.confirmOrder = async function() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    if(!name || !phone || !address) {
        alert("කරුණාකර නම, දුරකථන අංකය සහ ලිපිනය ඇතුළත් කරන්න!");
        return;
    }

    try {
        await addDoc(collection(db, "orders"), {
            customerName: name,
            customerPhone: phone,
            deliveryAddress: address,
            cartItems: cart,
            total: document.getElementById('cart-total').innerText,
            date: new Date()
        });
        alert("ඔබේ ඇණවුම සාර්ථකව ලැබුණා!");
        window.closePaymentModal();
        cart = [];
        renderCartItems();
        updateCartIcon();
    } catch (e) {
        alert("වැරදීමක් සිදුවුණා: " + e.message);
    }
};

window.openPaymentModal = function() {
    if (cart.length === 0) return alert('Your cart is empty!');
    isCartOpen = false;
    document.getElementById('cart-panel').classList.remove('open');
    isPaymentOpen = true;
    document.getElementById('payment-modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
};

window.closePaymentModal = function() {
    isPaymentOpen = false;
    document.getElementById('payment-modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
};

function addToCart(productId, variantIndex) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const variant = product.variants[variantIndex];
    const cartItemId = `${productId}-${variantIndex}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, cartItemId, assignedPrice: variant.price, assignedWeight: variant.weight, quantity: 1 });
    }
    updateCartIcon();
    renderCartItems();
    showItemPreview(product, variant);
    toggleCart(true);
}

function updateQuantity(cartItemId, delta) {
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.cartItemId !== cartItemId);
    }
    updateCartIcon();
    renderCartItems();
}

function updateCartIcon() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
        badge.style.display = 'block';
        badge.innerText = totalItems;
    } else {
        badge.style.display = 'none';
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: var(--text-muted); margin-top: 2rem;">Your cart is empty.</p>';
        calculateTotals();
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item[currentLang].name}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/60?text=IMG'">
            <div class="cart-item-info">
                <div class="cart-item-name" style="line-height:1.2; margin-bottom:0.4rem;">${item[currentLang].name} <span style="font-size:0.8rem; color:var(--text-muted);">(${item.assignedWeight})</span></div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.6rem; line-height: 1.3;">${item[currentLang].description}</div>
                <div class="cart-item-price">Rs. ${item.assignedPrice}</div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="window.updateQuantity('${item.cartItemId}', -1)">-</button>
                    <span style="font-weight: bold; width: 20px; text-align: center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="window.updateQuantity('${item.cartItemId}', 1)">+</button>
                    <button class="qty-btn" style="margin-left: auto; border:none; color:var(--brand-red);" title="Remove Item" onclick="window.updateQuantity('${item.cartItemId}', -${item.quantity})"><i class="ph ph-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');
    calculateTotals();
    const t = translations[currentLang];
    if (t) container.querySelectorAll('.t-yourOrder').forEach(e => e.innerText = t.yourOrder);
}

function applyLanguage() {
    const t = translations[currentLang];
    if (!t) return;
    Object.keys(t).forEach(key => {
        document.querySelectorAll('.t-' + key).forEach(el => el.innerText = t[key]);
    });
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerText = businessDetails[currentLang].name;
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerText = businessDetails[currentLang].motto;
    const addressText = document.querySelector('.footer-address-text');
    if (addressText) addressText.innerText = businessDetails[currentLang].address;
    const productGrid = document.getElementById('product-grid');
    if (productGrid) productGrid.innerHTML = getProductsHtml();
    if (cart.length > 0) renderCartItems();
}

let previewTimeout;
function showItemPreview(product, variant) {
    const popup = document.getElementById('item-preview-popup');
    const content = document.getElementById('preview-content');
    const t = translations[currentLang];
    content.innerHTML = `
        <img src="${product.image}" alt="${product[currentLang].name}" class="preview-img" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
        <div class="preview-item-name">${product[currentLang].name} <span style="font-size:0.8rem; color:var(--text-muted);">(${variant.weight})</span></div>
        <div class="preview-item-desc">${product[currentLang].description}</div>
    `;
    const titleEl = document.querySelector('.item-preview-popup .t-addedToCart');
    if (titleEl && t) titleEl.innerText = t.addedToCart;
    popup.classList.add('show');
    clearTimeout(previewTimeout);
    previewTimeout = setTimeout(() => { popup.classList.remove('show'); }, 4500);
}

function renderItemPreviewPopup() {
    return `
        <div id="item-preview-popup" class="item-preview-popup">
            <div class="preview-header">
                <span class="preview-title"><i class="ph-fill ph-check-circle"></i> <span class="t-addedToCart">Added to Cart</span></span>
                <button class="preview-close" onclick="document.getElementById('item-preview-popup').classList.remove('show')"><i class="ph ph-x"></i></button>
            </div>
            <div id="preview-content" class="preview-content"></div>
        </div>
    `;
}

window.updateQuantity = updateQuantity;

function calculateTotals() {
    let totalItems = 0;
    let subtotal = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.assignedPrice * item.quantity;
    });
    let total = totalItems >= 3 ? subtotal * 0.95 : subtotal;
    const discountMsg = document.getElementById('discount-msg');
    if (totalItems >= 3) discountMsg.classList.add('active'); else discountMsg.classList.remove('active');
    document.getElementById('cart-subtotal').innerText = `Rs. ${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `Rs. ${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', init);