import { useState, useEffect } from "react";

// The "value" is what the user is typing
const useDebounce = (value) => {
  // We keep a separate state for the "delayed" value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start a 350ms timer
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 350);

    // If the user types again BEFORE 350ms is up, React runs this cleanup function,
    // which kills the old timer before it can finish.
    return () => {
      clearTimeout(timerId);
    };
  }, [value]); // This effect restarts every time the user types

  return debouncedValue;
};

export default useDebounce;
