export function getData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting data for key "${key}":`, error);
    return [];
  }
}

export function setData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting data for key "${key}":`, error);
  }
}

export function getSingleData(key) {
  try {
    const data = localStorage.getItem(key);
    console.log(`Retrieved single data for key "${key}":`, data);
    return data ? JSON.parse(data) : null;

  } catch (error) {
    console.error(`Error getting single data for key "${key}":`, error);
    return null;
  }
}

export function setSingleData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting single data for key "${key}":`, error);
  }
}

export function removeData(key) {
  localStorage.removeItem(key);
}
