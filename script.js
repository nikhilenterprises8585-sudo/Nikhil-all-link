// =========================================================
// NEXORA storefront logic — no framework, no backend.
// This is a FRONT-END DEMO: cart totals are real math, but
// nothing here charges a card or talks to a server. Wire it
// to a real backend/payment provider before selling anything.
// =========================================================

const PRODUCTS = [
  { id: "kb-01", name: "Aurora TKL Mechanical Keyboard", cat: "keyboard", price: 89.99, icon: "⌨️", desc: "Hot-swappable switches, per-key RGB, PBT keycaps." },
  { id: "kb-02", name: "Vantage 60% Keyboard", cat: "keyboard", price: 64.5, icon: "⌨️", desc: "Compact 60% layout for travel and small desks." },
  { id: "ms-01", name: "Nova Wireless Gaming Mouse", cat: "mouse", price: 49.99, icon: "🖱️", desc: "26k DPI sensor, 60g body, 70hr battery." },
  { id: "ms-02", name: "Glide Ergo Mouse", cat: "mouse", price: 34.0, icon: "🖱️", desc: "Vertical grip shape built for long work sessions." },
  { id: "au-01", name: "Pulse ANC Headset", cat: "audio", price: 74.99, icon: "🎧", desc: "Active noise cancelling, detachable boom mic." },
  { id: "au-02", name: "Orbit Desktop Mic", cat: "audio", price: 59.0, icon: "🎙️", desc: "USB condenser mic with pop filter, cardioid pickup." },
  { id: "cam-01", name: "ClearView 1080p Webcam", cat: "cam", price: 39.99, icon: "📷", desc: "60fps, auto low-light correction, privacy shutter." },
  { id: "cam-02", name: "StreamCam Pro 4K", cat: "cam", price: 119.0, icon: "📷", desc: "4K30 capture with ring-light mount included." },
  { id: "cb-01", name: "8-in-1 USB-C Hub", cat: "cable", price: 29.99, icon: "🔌", desc: "HDMI, 2x USB-A, SD card, 100W passthrough." },
  { id: "cb-02", name: "Braided USB-C Cable 2m", cat: "cable", price: 12.0, icon: "🔌", desc: "100W fast charge, kevlar-reinforced jacket." },
];

const HUES = [190, 320, 265, 40]; // cyan, magenta, violet, amber
let hueIndex = 0;
let cart = {}; // { productId: qty }

const productGrid = document.getElementById("productGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

function money(n) {
  return "$" + n.toFixed(2);
}

function renderProducts(filter = "all") {
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  productGrid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-media">${p.icon}</div>
      <div class="product-body">
        <span class="product-tag">${p.cat}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">Add +</button>
        </div>
      </div>
    </article>
  `).join("");
}

function setFilter(filter) {
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.filter === filter));
  renderProducts(filter);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  openCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  const ids = Object.keys(cart);
  cartCountEl.textContent = ids.reduce((sum, id) => sum + cart[id], 0);

  if (ids.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Go add something cool.</p>`;
    cartTotalEl.textContent = money(0);
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(p => p.id === id);
    const qty = cart[id];
    total += p.price * qty;
    return `
      <div class="cart-item">
        <div class="cart-item-media">${p.icon}</div>
        <div class="cart-item-info">
          <p>${p.name}</p>
          <span>${qty} × ${money(p.price)}</span>
        </div>
        <button data-remove="${id}" aria-label="Remove ${p.name}">✕</button>
      </div>
    `;
  }).join("");
  cartTotalEl.textContent = money(total);
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function cycleRGB() {
  hueIndex = (hueIndex + 1) % HUES.length;
  document.documentElement.style.setProperty("--hue", HUES[hueIndex]);
}

// ---------- event wiring ----------
document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  if (addBtn) addToCart(addBtn.dataset.id);

  const removeBtn = e.target.closest("[data-remove]");
  if (removeBtn) removeFromCart(removeBtn.dataset.remove);

  const catCard = e.target.closest(".cat-card");
  if (catCard) {
    setFilter(catCard.dataset.filter);
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  }

  const chip = e.target.closest(".chip");
  if (chip) setFilter(chip.dataset.filter);
});

document.getElementById("rgbToggle").addEventListener("click", cycleRGB);
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty — add a product first.");
    return;
  }
  alert("This is a demo storefront: no real payment is processed. Connect a payment provider (e.g. Stripe) to go live.");
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value;
  document.getElementById("newsletterMsg").textContent = `Thanks — this demo doesn't actually send email, but ${email} is the address it would use.`;
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- init ----------
renderProducts();
renderCart();
