// hooks/useLocalStorage.js
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      // If nothing stored or invalid "undefined"
      if (!item || item === "undefined") {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }

      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}", resetting...`, error);
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Support function updater like useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
