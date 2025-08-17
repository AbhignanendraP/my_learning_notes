import { useState, useEffect } from "react";

interface ContentItem {
  key: string;
  value: string;
}

export function API_value(contentKey: string) {
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbylmTHyrrufVVqug6pMHm3TEtC4IPjNxEvD6VA9XHLvAeHtaeshVg50gHTQYsUhg3kQrQ/exec"; // Replace with your actual API URL
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(apiUrl);
        const data: ContentItem[] = await response.json();

        // Find the object where key matches
        const found = data.find((item) => item.key === contentKey);
        setValue(found ? found.value : null);
      } catch (error) {
        console.error("Error fetching content:", error);
        setValue(null);
      }
    }

    fetchContent();
  }, [apiUrl, contentKey]);

  return value;
}
