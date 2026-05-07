
import { getData, setData } from './storage.js';

const API_URL = "https://fakestoreapi.com/products";

// Initialize products in storage from API
export async function initProducts() {
  const products = getData("products");
  
  // Only fetch if storage is empty
  if (products.length === 0) {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      // Map API data to our structure
      const mappedProducts = data.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
        rating: item.rating ? item.rating.rate : 0
      }));

      setData("products", mappedProducts);
      return mappedProducts;
    } catch (error) {
      console.error("Error fetching products from API:", error);
      return [];
    }
  }
  return products;
}

export function getAllProducts() {
  return getData("products");
}

export function getProductById(id) {
  const products = getAllProducts();
  return products.find(p => p.id === parseInt(id));
}

export function searchProducts(query, category = "All") {
  let products = getAllProducts();
  
  if (category !== "All") {
    products = products.filter(p => p.category === category);
  }
  
  if (query) {
    const q = query.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }
  
  return products;
}

export function getCategories() {
  const products = getAllProducts();
  const categories = ["All", ...new Set(products.map(p => p.category))];
  return categories;
}
