import { useState, useEffect, useCallback } from "react";

interface ContentItem {
  key: string;
  value: string;
}

export function useAPIValue(initialKeys: string[] = []) {
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbylmTHyrrufVVqug6pMHm3TEtC4IPjNxEvD6VA9XHLvAeHtaeshVg50gHTQYsUhg3kQrQ/exec";

  const [value, setValue] = useState<Record<string, string>>({});
  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContent = useCallback(
    async (keys: string[]) => {
      const newKeys = keys.filter((k) => !loadedKeys.has(k));
      if (newKeys.length === 0) return;

      setLoading(true); // show loading while fetching
      try {
        const response = await fetch(
          `${apiUrl}?key=${encodeURIComponent(newKeys.join(","))}`
        );
        const data: ContentItem[] = await response.json();

        const newData: Record<string, string> = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);

        setValue((prev) => ({ ...prev, ...newData }));
        setLoadedKeys((prev) => new Set([...prev, ...newKeys]));
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false); // stop loading
      }
    },
    [loadedKeys]
  );

  // Load initial keys on mount
  useEffect(() => {
    if (initialKeys.length > 0) {
      fetchContent(initialKeys);
    }
  }, [initialKeys, fetchContent]);

  return { value, fetchContent, loading };
}
