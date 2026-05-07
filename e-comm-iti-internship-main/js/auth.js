
import { getData, setData, getSingleData, setSingleData, removeData } from './storage.js';

export function register(userData) {
  const users = getData("users");
  
  // Check if user already exists
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: "User with this email already exists." };
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    ...userData,
    joinedAt: new Date().toISOString()
  };

  users.push(newUser);
  setData("users", users);
  
  return { success: true, message: "Registration successful! You can now login." };
}

export function login(email, password) {
  const users = getData("users");
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Don't store password in session
    const { password, ...userSession } = user;
    setSingleData("currentUser", userSession);
    return { success: true, user: userSession };
  }

  return { success: false, message: "Invalid email or password." };
}

export function logout() {
  removeData("currentUser");
  window.location.href = "login.html";
}

export function getCurrentUser() {
  return getSingleData("currentUser");
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

export function authGuard() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
  }
}
