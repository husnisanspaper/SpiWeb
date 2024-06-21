import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void, () => void] { // Add the third element for removal
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {

    console.log('useLocalStorage:', key, initialValue)


    try {
      // Get from local storage by key
      if (typeof window !== "undefined") {
        // browser code
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Function to remove the item from local storage
  const removeStoredValue = () => {

    console.log('removeStoredValue:', key);
    try {
      if (typeof window !== "undefined") {
        // browser code
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;
      // Save state
      if (typeof window !== "undefined") {
        // browser code
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue, removeStoredValue]; // Return the removal function
}

export default useLocalStorage;
