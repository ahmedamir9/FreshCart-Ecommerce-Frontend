
import { getData, setData } from './storage.js';
import { clearCart, getCartItems, getCartSubtotal } from './cart.js';
import { getCurrentUser } from './auth.js';

export function placeOrder(shippingInfo) {

  const user = getCurrentUser(); 

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    return { success: false, message: "Cart is empty." };
  }

  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal * 0.01;
  const total = subtotal + tax + shipping;

  const orders = getData("orders") || []; // ✔️ مهم جدًا

  const newOrder = {
    id: `ORD-${Date.now()}`,
    userId: user.id,
    items: cartItems,
    shippingInfo,
    summary: {
      subtotal,
      tax,
      shipping,
      total
    },
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  setData("orders", orders);
  clearCart();

  return { success: true, orderId: newOrder.id };
}

export function getUserOrders(userId) {
  const orders = getData("orders");
  return orders.filter(order => order.userId === userId);
}

export function deleteOrder(orderId) {
  let orders = getData("orders");
  orders = orders.filter(order => order.id !== orderId);
  setData("orders", orders);
  return true;
}
