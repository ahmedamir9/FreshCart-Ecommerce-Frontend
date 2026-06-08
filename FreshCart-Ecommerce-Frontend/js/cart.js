
import { getData, setData } from './storage.js';
import { getProductById } from './products.js';

export function getCart() {
  return getData("cart");
}

export function addToCart(productId, quantity = 1) {
  let cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  setData("cart", cart);
  updateCartBadge();
  return true;
}

export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.productId !== productId);
  setData("cart", cart);
  updateCartBadge();
}

export function updateQuantity(productId, quantity) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }

  let cart = getCart();
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    setData("cart", cart);
  }
}

export function getCartItems() {
  const cart = getCart();
  return cart.map(item => {
    const product = getProductById(item.productId);
    return {
      ...product,
      quantity: item.quantity,
      totalPrice: product ? product.price * item.quantity : 0
    };
  });
}

export function getCartSubtotal() {
  const items = getCartItems();
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
}

export function clearCart() {
  setData("cart", []);
  updateCartBadge();
}

export function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}
