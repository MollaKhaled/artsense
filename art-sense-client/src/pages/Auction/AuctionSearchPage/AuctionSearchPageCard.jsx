import React from 'react';
import { Link } from 'react-router-dom';

const AuctionSearchCard = ({ photo }) => {
  const { _id, artist, title, media, size,  photoUrl, formattedPrice, year,lotId, isSold } = photo
  return (
    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden">
      {/* Image Container */}
      <figure className="px-10 h-[250px] flex items-center justify-center">
        <img
          src={photoUrl}
          alt="Artwork"
          className="w-full h-full object-contain rounded-sm "
        />
      </figure>
      <div className="text-center p-5">
        <div className="text-center ">
          <p className=" font-bold">{artist}</p>
          <p >
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">| </span>{year}  <span className="text-red-500"> | {formattedPrice.split(".")[0]}</span>
          </p>
          <p className="mt-2" >
            <span className="text-green-600">{lotId}</span>
          </p>
          <div className="mt-2">
            {isSold ? (
              <button
                className="w-3/4 mx-auto py-2 px-4 rounded-md text-red-500 bg-gray-100 cursor-not-allowed"
                disabled
              >
                Sold
              </button>
            ) : (
              <Link to={`/auction/${_id}`}>
                <button className="w-3/4 mx-auto py-2 px-4 rounded-md bg-gray-100">
                  Bid
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuctionSearchCard;