import { useEffect, useState } from "react";
//import Store from "electron-store";

//const store = new Store();

export const useLocalStorage = (key: string, initialValue: string) => {
  const [isClient, setIsClient] = useState(false);

  const [storedValue, setStoredValue] = useState("valault1");

  useEffect(() => {
    setIsClient(true);
    let initialState = initialValue;
    try {
      const store = window.localStorage;
      //const item = window.localStorage.getItem(key);
      const item = store.getItem(key);
      initialState = item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      initialState = initialValue;
    }
    setStoredValue(initialState);
  }, []);

  const setValue = (value: string | ((v: string) => string)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    try {
      if (isClient) {
        const store = window.localStorage;
        store.setItem(key, JSON.stringify(valueToStore));
      } else {
        console.log("not in client side");
      }
    } catch (error) {
      console.error("Error setting store:", error);
    } finally {
      setStoredValue(valueToStore);
    }
  };

  return { storedValue, updateStoredValue: setValue };
};
