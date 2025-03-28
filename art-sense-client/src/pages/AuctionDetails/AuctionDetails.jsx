import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import useBidCount from "../../hooks/useBidCount";
import useRemainingTime from "../../hooks/useRemainingTime";
import { io } from "socket.io-client";
import useCart from "../../hooks/useCart";

// Use the correct backend URL for Socket.IO
// const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3000");


const AuctionDetails = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentItem = photos[currentIndex]; // Moved this up to use it in destructuring safely
  const lotId = currentItem?.lotId || null;
  const [currentHighestBid, setCurrentHighestBid] = useState('No bids yet');

  const { bidCount, incrementBidCount, error } = useBidCount(lotId);
  const remainingTime = useRemainingTime(currentItem?.dates?.[0]?.endDate);

  useEffect(() => {
    const fetchCurrentHighestBid = async () => {
      if (!lotId) return;

      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/totalBid/${lotId}`);


        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data); // Log the response to verify its structure

        // Correctly access the bid amount from the object
        const highestBid = data?.currentHighestBid || "No bids yet";
        setCurrentHighestBid(highestBid);
        console.log("Updated Highest Bid:", highestBid);

      } catch (error) {
        console.error("Error fetching bid data:", error);
        setCurrentHighestBid("No bids yet");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentHighestBid();
  }, [lotId]);

  // useEffect(() => {
  //   socket.on("updateBid", (bidData) => {
  //     if (bidData.lotId === currentItem?.lotId) {
  //       // Update the photos state with the new bid info
  //       setPhotos((prevPhotos) => {
  //         return prevPhotos.map((photo) =>
  //           photo.lotId === bidData.lotId
  //             ? { ...photo, bid: bidData.bidAmount }
  //             : photo
  //         );
  //       });
  //       incrementBidCount(); // Corrected bid count update
  //     }
  //   });

  //   return () => {
  //     socket.off("updateBid"); // Clean up listener on unmount
  //   };
  // }, [currentItem, incrementBidCount]);




  // Fetch photos and item data
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auction`);

        const data = await response.json();
        setPhotos(data);

        const initialIndex = data.findIndex((photo) => photo._id === id);
        setCurrentIndex(initialIndex !== -1 ? initialIndex : 0);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [id]);

  // Load selected bid from localStorage when component mounts
  useEffect(() => {
    const storedBid = localStorage.getItem("selectedBid");
    if (storedBid) {
      setSelectedBid(parseInt(storedBid, 10)); // Parse as integer
    }
  }, []);
 

  const handlePlaceBid = async () => {
    incrementBidCount();
    const selectedBidValue = parseInt(selectedBid.toString().replace(/[^0-9]/g, ""), 10);
const currentHighestBidValue = parseInt(currentHighestBid.toString().replace(/[^0-9]/g, ""), 10);

    if (!user) {
      Swal.fire("Warning", "You need to be logged in to place a bid", "warning");
      navigate("/login");
      return;
    }

    if (!selectedBid) {
      Swal.fire("Error", "Please select a bid amount", "error");
      return;
    }
    if (selectedBidValue <= currentHighestBidValue) {
      Swal.fire("Error", "Your bid must be higher than the current bid", "error");
      return;
   }


    const bidData = {
      bidAmount: `BDT ${selectedBid.toLocaleString()}`,
      email: user?.email,
      lotId: lotId,
    };

    try {
      setLoading(true); // ✅ Set loading state to true

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bid`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bidData),
      });

      const result = await response.json();

      if (response.ok && result.insertedId) {
        Swal.fire("Success", "Bid placed successfully!", "success");

        // Emit bid event to server
        // socket.emit("newBid", bidData);

        setSelectedBid(null);
        localStorage.removeItem("selectedBid");
        // ✅ Directly update the currentHighestBid based on the selected bid
        setCurrentHighestBid(`BDT ${selectedBid.toLocaleString()}`);


      } else {
        Swal.fire("Error", "Already placed a bid!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred. Try again!", "error");
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };



  if (photos.length === 0) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner text-error"></span>
    </div>;
  }

  // Generate bid options based on the item's current bid and estimated bid
  const generateBidOptions = (currentBid, estimateBid, selectedBid) => {
    try {
      // Validate estimateBid input
      if (!estimateBid || typeof estimateBid !== "string") {
        console.error("Invalid estimateBid:", estimateBid);
        return [];
      }

      // Remove "BDT" and split the range
      const [minEstimateStr, maxEstimateStr] = estimateBid
        .replace(/BDT/g, "") // Remove "BDT"
        .split("-")
        .map((str) => str.replace(/,/g, "").trim()); // Remove commas and whitespace

      // Convert the cleaned strings to numbers
      const minEstimate = parseFloat(minEstimateStr);
      const maxEstimate = parseFloat(maxEstimateStr);

      // Validate the parsed estimates
      if (
        isNaN(minEstimate) ||
        isNaN(maxEstimate) ||
        minEstimate <= 0 ||
        maxEstimate <= 0 ||
        minEstimate >= maxEstimate
      ) {
        console.error("Invalid parsed estimates:", { minEstimate, maxEstimate });
        return [];
      }

      // Default currentBid to minEstimate if undefined or invalid
      const validCurrentBid = typeof currentBid === "number" && currentBid > 0 ? currentBid : minEstimate;

      // If currentBid exceeds maxEstimate, no bids are valid
      if (validCurrentBid >= maxEstimate) {
        console.warn("Current bid exceeds max estimate:", validCurrentBid);
        return [];
      }

      // Generate bid options
      const increment = 5000;
      const options = [];
      let bid = Math.max(validCurrentBid, minEstimate); // Start from max(currentBid, minEstimate)

      // If selectedBid is held by the local host, prevent it from appearing in the options
      while (bid <= maxEstimate) {
        if (bid !== selectedBid) {
          options.push(bid);
        }
        bid += increment;
      }

      // Check if the selected bid is within the valid range
      if (!options.includes(selectedBid) && selectedBid > 0 && selectedBid <= maxEstimate) {
        options.push(selectedBid); // Add the held bid if it's valid but excluded
      }

      return options;
    } catch (error) {
      console.error("Error in generateBidOptions:", error);
      return [];
    }
  };

  const bidOptions = generateBidOptions(currentItem?.bid, currentItem?.estimateBid, selectedBid);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      navigate(`/auction/${photos[prevIndex]._id}`, { replace: true }); // Change URL to previous item
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      navigate(`/auction/${photos[nextIndex]._id}`, { replace: true }); // Change URL to next item
    }
  };

  const handleBidChange = (e) => {
    const newBid = parseInt(e.target.value, 10); // Convert to integer
    setSelectedBid(newBid);
    localStorage.setItem("selectedBid", newBid); // Store in localStorage
  };



  return (
    <>
    <Helmet>
      <title>artsense | auction details</title>
    </Helmet>
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 m-4 md:m-12 pl-4 md:pl-20 pr-4 md:pr-20 text-sm">
      {/* Previous Button outside Image */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 focus:outline-none disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack size={20} />
        </button>
      </div>
  
      {/* Image Section */}
      <div className="flex-1 relative">
        <img
          src={currentItem.photoUrl}
          alt={currentItem.title}
          className="w-full h-auto shadow-lg mt-4"
        />
      </div>
  
      {/* Item Details Section */}
      <div className="flex-1 rounded-md">
      {/* <div className="flex">
            Lot Id <p className="ml-20 text-red-500">{currentItem.lotId}</p>
          </div> */}
          <h2>lot id <span className="text-red-500">{currentItem.lotId} </span></h2>
         

        <div className="divider h-0.5"></div>
        <h2 className="text-sm font-bold mb-2">{currentItem.artist}</h2>
        <p className="text-sm text-gray-400">{currentItem.birth}</p>
        <div className="divider h-0.5"></div>
        <p>{currentItem.title}</p>
        <p>{currentItem.media}</p>
        <p>{currentItem.size}</p>
        <p>{currentItem.year}</p>
  
        <div className="divider h-0.5"></div>
      
      
        <div className="text-sm space-y-4">
  {/* Ending Date Section */}
  <div className="grid grid-cols-3 gap-4">
    <span className="col-span-1">Ending:</span>
    <div className="col-span-2">
      <p>
        {currentItem.dates && currentItem.dates[0]?.endDate
          ? new Date(currentItem.dates[0].endDate).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "No end date available"}
      </p>
      {remainingTime && (
        <p className="text-gray-500 mt-1">{remainingTime}</p>
      )}
    </div>
  </div>

  <div className="divider h-0.5"></div>

  {/* Estimate Section */}
  <div className="grid grid-cols-3 gap-4">
    <span className="col-span-1">Estimate:</span>
    <p className="col-span-2">
      {currentItem.estimateBid.replace(/\.00/g, "")}
    </p>
  </div>

  <div className="divider h-0.5"></div>

  {/* Current Bid Section */}
  <div className="grid grid-cols-3 gap-4">
    <span className="col-span-1">Current Bid:</span>
    <div className="col-span-2">
      <p className="text-red-500">{currentHighestBid}</p>
      <p className="text-green-500 mt-1">{bidCount} {bidCount <= 1 ? "Bid" : "Bids"}</p>
    </div>
  </div>
</div>


        <div className="divider h-0.5"></div>
  
        {/* Bid Select */}
        <div className="mt-4 text-sm">
          <label className="block font-medium mb-2 text-red-500">
            Choose your maximum bid*
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedBid || ""}
            onChange={handleBidChange}
          >
            <option value="">Select a bid</option>
            {bidOptions.length > 0 ? (
              bidOptions.map((bid, index) => (
                <option key={index} value={bid}>
                  BDT {bid.toLocaleString()} {/* Format bid with commas */}
                </option>
              ))
            ) : (
              <option>No bid options available</option>
            )}
          </select>
        </div>
        <p className="text-gray-400">*This amount excludes shipping fees</p>
        <div>
          <button className="btn w-full sm:w-1/2 mt-4" onClick={handlePlaceBid}>
            Place Bid
          </button>
        </div>
        <div>
          <button className="btn btn-outline border-gray-400 mt-4 w-full sm:w-1/2">
            ADD TO WATCH LIST
          </button>
        </div>
      </div>
  
      {/* Next Button outside Item Details Section */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 focus:outline-none disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === photos.length - 1}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  
    <div className="p-4 text-sm m-4 md:m-12 pt-2">
      <div className="divider h-0.5"></div>
      <h2 className="text-center font-semibold">Lot Details</h2>
      <div className="divider h-0.5"></div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* About Details Section */}
        <div className="w-full md:w-1/2">
          <h2 className="font-semibold mb-2">About Details</h2>
          <p className="text-sm">{currentItem.lotDetails}</p>
        </div>
  
        {/* Additional Details Section */}
        <div className="w-full md:w-1/2">
          <div className="collapse collapse-arrow">
            <input type="checkbox" className="peer" />
            <div className="collapse-title">Condition Report</div>
            <div className="collapse-content">
              <p>{currentItem.condition}</p>
            </div>
          </div>
          <div className="divider h-0.5"></div>
          <div className="collapse collapse-arrow">
            <input type="checkbox" className="peer" />
            <div className="collapse-title">History and Provenance</div>
            <div className="collapse-content">
              <p>{currentItem.history}</p>
            </div>
          </div>
          <div className="divider h-0.5"></div>
          <div className="collapse collapse-arrow">
            <input type="checkbox" className="peer" />
            <div className="collapse-title">Shipping Information</div>
            <div className="collapse-content">
              <p>{currentItem.shipping}</p>
            </div>
          </div>
          <div className="divider h-0.5"></div>
          <div className="collapse collapse-arrow">
            <input type="checkbox" className="peer" />
            <div className="collapse-title">Payment and Return Policies</div>
            <div className="collapse-content">
              <p>{currentItem.payment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default AuctionDetails;
