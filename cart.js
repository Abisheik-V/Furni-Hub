let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
}

function addToCart(name, price) {
  let product = cart.find(item => item.name === name);
  if (product) {
    product.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
    total += item.price * item.quantity;
  });

  document.getElementById("cart-total").textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function payment() {
    alert("Payment Successful! Thank you for your purchase. 🛒💳");
}

updateCartCount();
renderCart();
