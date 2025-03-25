import { useState, useEffect } from "react";

const useBidCount = (lotId) => {
  const [bidCount, setBidCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bid count when the lotId changes
  useEffect(() => {
    const fetchBidCount = async () => {
      if (!lotId) return;

      try {
        setLoading(true);
        const response = await fetch(`VITE_BACKEND_URL/bid/${lotId}/bid-count`);

        if (!response.ok) {
          throw new Error("Failed to fetch bid count");
        }

        const data = await response.json();
        setBidCount(data.bidCount || 0);
      } catch (error) {
        console.error("Error fetching bid count:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBidCount();
  }, [lotId]);

  // Increment bid count locally
  const incrementBidCount = async () => {
    setBidCount((prevCount) => prevCount + 1);  // Immediately increment count

    // Optionally: Send the updated count to the server after placing the bid
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/bid/${lotId}/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lotId, bidCount: bidCount + 1 }), // Send updated bid count to server
      });
    } catch (error) {
      console.error("Error updating bid count on the server:", error);
    }
  };

  return { bidCount, incrementBidCount, loading, error };
};

export default useBidCount;
