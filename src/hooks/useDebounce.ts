import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // Store the delay in a ref to avoid recreating the debounced function
  const delayRef = useRef(delay);
  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  // Create the debounced function only once
  const debouncedSetterRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Initialize the debounced function
  if (debouncedSetterRef.current === null) {
    debouncedSetterRef.current = debounce((val: T) => {
      setDebouncedValue(val);
    }, delayRef.current);
  }

  useEffect(() => {
    // Use the stable reference to the debounced function
    if (debouncedSetterRef.current) {
      debouncedSetterRef.current(value);
    }

    // Cleanup function
    return () => {
      if (debouncedSetterRef.current) {
        debouncedSetterRef.current.cancel();
      }
    };
  }, [value]); // Only depend on value, not on the function itself

  // If delay changes, update the debounce timeout
  useEffect(() => {
    // Clean up old debounced function
    if (debouncedSetterRef.current) {
      debouncedSetterRef.current.cancel();
    }

    // Create new debounced function with updated delay
    debouncedSetterRef.current = debounce((val: T) => {
      setDebouncedValue(val);
    }, delay);
  }, [delay]);

  return debouncedValue;
}
