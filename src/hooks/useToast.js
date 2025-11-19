import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const hideToast = useCallback(() => {
    setToast(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    if (!message) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({ message, type });

    if (duration !== 0) {
      timerRef.current = setTimeout(() => {
        setToast(null);
        timerRef.current = null;
      }, duration);
    }
  }, []);

  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return { toast, showToast, hideToast };
}

