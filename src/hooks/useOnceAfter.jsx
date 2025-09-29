// useOnceAfter.js
import { useEffect } from "react";

export default function useOnceAfter(delayMs, storageKey, action) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) return; // already shown once
    } catch {}
    const t = setTimeout(() => {
      action();                                    // open popup
      try { sessionStorage.setItem(storageKey, "1"); } catch {}
    }, delayMs);
    return () => clearTimeout(t);
  }, [delayMs, storageKey, action]);
}
