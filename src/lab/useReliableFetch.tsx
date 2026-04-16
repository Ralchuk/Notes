import { useEffect, useState } from "react";

export default function useReliableFetch(url: string) {
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    setIsLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setData(data);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError" && !ignore) {
          setError(err);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}
