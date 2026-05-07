
import { getCurrentUser, logout } from './auth.js';
import { updateCartBadge } from './cart.js';
import { initProducts } from './products.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize data
  await initProducts();
  updateCartBadge();
  
  // Render Header & Mobile Nav
  renderHeader();
  renderMobileNav();
  
  // Initialize UI components
  setupLogout();
});

function renderMobileNav() {
  // Only create if it doesn't exist
  if (document.querySelector('.mobile-nav')) return;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  
  const currentPage = window.location.pathname;
  
  mobileNav.innerHTML = `
    <a href="index.html" class="mobile-nav-item ${currentPage.includes('index.html') || currentPage === '/' ? 'active' : ''}">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </a>
    <a href="cart.html" class="mobile-nav-item ${currentPage.includes('cart.html') ? 'active' : ''}">
      <i class="fas fa-shopping-cart"></i>
      <span>Cart</span>
    </a>
    <a href="profile.html" class="mobile-nav-item ${currentPage.includes('profile.html') ? 'active' : ''}">
      <i class="fas fa-user"></i>
      <span>Profile</span>
    </a>
  `;
  
  document.body.appendChild(mobileNav);
}

function renderHeader() {
  const user = getCurrentUser();
  const authLinks = document.getElementById('auth-links');
  
  if (authLinks) {
    if (user) {
      authLinks.innerHTML = `
        <a href="profile.html" class="nav-link">Hi, ${user.name}</a>
        <button id="logout-btn" class="nav-link icon-btn" title="Logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      `;
    } else {
      authLinks.innerHTML = `
        <a href="login.html" class="nav-link">Login</a>
        <a href="register.html" class="btn-primary" style="padding: 8px 20px;">Join</a>
      `;
    }
  }
}

function setupLogout() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('#logout-btn')) {
      logout();
    }
  });
}



export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}
