const PRODUCTS = {
  bella: { id: "bella", name: "Nadia Perfume Bella", inspired: "Inspired by Lancome La Vie Est Belle", price: 13, was: 24 },
  florence: { id: "florence", name: "Nadia Perfume Florence", inspired: "Inspired by Olympea Paco Rabanne", price: 13, was: 24 },
  mystique: { id: "mystique", name: "Nadia Perfume Mystique", inspired: "Inspired by Coco Mademoiselle", price: 13, was: 24 },
  noir: { id: "noir", name: "Nadia Perfume Noir", inspired: "Inspired by Black Opium", price: 13, was: 24 },
  paris: { id: "paris", name: "Nadia Perfume Paris Bloom", inspired: "Inspired by Chloe Chloe", price: 13, was: 24 },
  venice: { id: "venice", name: "Nadia Perfume Venice", inspired: "Inspired by Narciso Rodriguez", price: 13, was: 24 }
};

function getCart() {
  try { return JSON.parse(localStorage.getItem("nadia-cart") || "[]"); }
  catch { return []; }
}
function saveCart(c) { localStorage.setItem("nadia-cart", JSON.stringify(c)); updateCount(); }
function addToCart(id) {
  const c = getCart();
  const found = c.find(i => i.id === id);
  if (found) found.qty += 1; else c.push({ id, qty: 1 });
  saveCart(c);
  alert("Added to cart");
}
function updateCount() {
  const n = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = n);
}
function renderCart() {
  const wrap = document.getElementById("cart-body");
  if (!wrap) return;
  const c = getCart();
  if (!c.length) {
    wrap.innerHTML = '<p class="empty">Your cart is empty.</p>';
    return;
  }
  let total = 0;
  wrap.innerHTML = `<table class="cart-table"><thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead><tbody>` +
    c.map(i => {
      const p = PRODUCTS[i.id];
      if (!p) return "";
      total += p.price * i.qty;
      return `<tr><td>${p.name}<br><small>${p.inspired}</small></td><td>${i.qty}</td><td>£${(p.price * i.qty).toFixed(2)}</td></tr>`;
    }).join("") +
    `</tbody></table><p style="max-width:900px;margin:0 auto 40px;text-align:right;font-size:22px">Total £${total.toFixed(2)}</p>`;
}
document.addEventListener("DOMContentLoaded", () => {
  updateCount();
  renderCart();
  document.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
  });
});
