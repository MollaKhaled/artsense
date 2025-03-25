import React, { useState } from "react";
import { Link } from "react-router-dom";
import useBidCount from "../../hooks/useBidCount";
import useRemainingTime from "../../hooks/useRemainingTime";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAdmin from "../../hooks/useAdmin";

const AuctionCard = ({ item }) => {
  const [axiosSecure] = useAxiosSecure();
  const [isSold, setIsSold] = useState(item.isSold);
  const [isAdmin] = useAdmin();
  const { _id, artist, title, size, lotId, photoUrl, media,  birth, year, bid } = item;
  const { bidCount, loading } = useBidCount(lotId);
  const remainingTime = useRemainingTime(item.dates?.[0]?.endDate);

  const handleMarkAsSold = async (e) => {
    e.preventDefault(); // Prevent navigation
    try {
      const response = await axiosSecure.patch(`/auction/${item._id}`, {
        isSold: !isSold
      });

      if (response.data.success) {
        setIsSold(!isSold);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update status',
        text: error.response?.data?.message || 'Please try again'
      });
    }
  };

  return (
    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden text-sm">
      {/* Image Container */}
      <figure className="px-10 h-[250px] flex items-center justify-center">
        <img
          src={photoUrl}
          alt="Artwork"
          className="w-full h-full object-contain rounded-sm "
        />
      </figure>

      <div className="card-body text-center p-5 text-sm ">
        <div className="text-center text-sm">
          <p className="font-bold">{artist}</p>
          <p className=" text-gray-400">{birth}</p>
          <p className="mt-2" >
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">|</span> {year} <span className="text-red-500">|</span > lot id <span className="text-green-500">{lotId}</span>
          </p>
          <div className="mt-2">
          <h1 className="text-red-500">{bid.split(".")[0]}</h1>
            {/* {loading ? (
              <p className="text-green-500 text-center">Loading bids...</p>
            ) : (
              <p className="text-green-500 text-center">{bidCount} Bids</p>
            )} */}
            <p className="text-green-500 mt-1">{bidCount} {bidCount <= 1 ? "Bid" : "Bids"}</p>
            {remainingTime && (
              <p className="text-sm sm:text-base text-center ">
                {remainingTime}
              </p>
            )}
          </div>

        </div>

        <div className='mt-2'>
          {isAdmin ? (
            <div className="flex justify-center gap-2">
              <button
                onClick={handleMarkAsSold}
                className={`btn w-1/3 bg-white ${isSold ? "text-red-500" : "text-green-500"
                  } border border-current`}
              >
                {isSold ? "Mark as Available" : "Mark as Sold"}
              </button>
              <Link
                to={`/auction/${_id}`}
                state={{ item }}
                className="btn w-1/3 bg-white text-blue-500 border border-current"
              >
                View Details
              </Link>
            </div>
          ) : (
            isSold ? (
              <button
                className="inline-block w-3/4 py-2 px-4 rounded-md text-red-500 bg-gray-100 cursor-not-allowed"
                disabled
              >
                Sold
              </button>
            ) : (
              <Link
                to={`/auction/${_id}`}
                state={{ item }}
                className="inline-block w-3/4 py-2 px-4 rounded-md bg-gray-100"
              >
                Bid
              </Link>
            )
          )}
        </div>

      </div>
    </div>


  );
};

export default AuctionCard;