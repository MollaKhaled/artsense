import { useState, useEffect } from "react";

const useRemainingTime = (endDate) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (!endDate) {
      setRemainingTime("No end date available");
      return;
    }

    const calculateTime = () => {
      const end = new Date(endDate).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setRemainingTime("Auction ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      // setRemainingTime(`${days} days, ${hours} hours, ${minutes} minutes remaining`);
      setRemainingTime(<span className="text-sm">{`${days} Days Remaining`}</span>);

    };

    // Calculate time initially
    calculateTime();

    // Update every minute
    const timerId = setInterval(calculateTime, 60000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [endDate]);

  return remainingTime;
};

export default useRemainingTime;
