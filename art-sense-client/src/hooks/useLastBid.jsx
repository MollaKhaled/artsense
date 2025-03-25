import { useState, useEffect } from "react";

const useLastBid = (lotId) => {
  const [lastBid, setLastBid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastBid = async () => {
      if (!lotId) return;

      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bid/${lotId}/last-bid`);
        const data = await response.json();
        setLastBid(data.highestBid || "No bids yet");
      } catch (error) {
        console.error("Error fetching last bid:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastBid();
  }, [lotId]);

  return { lastBid, loading };
};

export default useLastBid;
