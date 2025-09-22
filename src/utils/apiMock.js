// utils/apiMock.js
// Simulate API calls with delays
export const mockApi = {
  get: (key, delay = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getFromStorage(key);
        resolve({ data });
      }, delay);
    });
  },
  
  post: (key, value, delay = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveToStorage(key, value);
        resolve({ success: true });
      }, delay);
    });
  },
  
  delete: (key, delay = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(key);
        resolve({ success: true });
      }, delay);
    });
  }
};