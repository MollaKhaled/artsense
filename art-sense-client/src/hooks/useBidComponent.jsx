import { useState, useEffect } from "react";
import axios from "axios";

const BidComponent = ({ lotId }) => {
  const [disabledBids, setDisabledBids] = useState([]);
  const bidAmounts = [100, 200, 300, 400, 500]; // Example bid values

  // ✅ Fetch disabled bids on page load
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/disabled-bids/${lotId}`)
    // Fetch from API
      .then((res) => setDisabledBids(res.data))
      .catch((err) => console.error("Error fetching disabled bids:", err));
  }, [lotId]);

  // ✅ Handle placing a bid
  const handlePlaceBid = (selectedBid) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/bid`, { bidAmount: selectedBid, email: "user@example.com", lotId })

      .then(() => {
        setDisabledBids([...disabledBids, selectedBid]); // Update UI immediately
      })
      .catch((err) => console.error("Error placing bid:", err));
  };

  return (
    <div>
      <h2>Select a Bid</h2>
      {bidAmounts.map((bid) => (
        <button
          key={bid}
          onClick={() => handlePlaceBid(bid)}
          disabled={disabledBids.includes(bid)}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: disabledBids.includes(bid) ? "gray" : "blue",
            color: "white",
            cursor: disabledBids.includes(bid) ? "not-allowed" : "pointer"
          }}
        >
          {bid} USD
        </button>
      ))}
    </div>
  );
};

export default BidComponent;
