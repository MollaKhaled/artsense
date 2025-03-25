import React, { useState } from 'react';
import ExhibitionModal from '../Shared/ExhibitionModal/ExhibitionModal';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useAxiosSecure from '../../hooks/useAxiosSecure';



const PopularExhibitionCard = ({ item }) => {
  const { _id, artist, title, size, lotId, photoUrl, media, price, formattedPrice, year } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [axiosSecure] = useAxiosSecure();
  const [cart, refetch] = useCart();
  const [isSold, setIsSold] = useState(item.isSold);
  const [isAdmin] = useAdmin();
  const openModal = () => {
    setSelectedPhoto(item);
    setIsOpen(true);
  };

  const handleMarkAsSold = async (e) => {
    e.preventDefault(); // Prevent navigation
    try {
      const response = await axiosSecure.patch(`/exhibition/${item._id}`, {
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
          onClick={openModal}
          src={photoUrl}
          alt="Artwork"
          className="w-full h-full object-contain rounded-sm "
        />
      </figure>

      <div className="card text-center p-5 text-sm">
        <div className="text-center text-sm">
          <p className=" font-bold">{artist}</p>

          <p >
            {title} <span className="text-red-500">|</span> {media}
          </p>

          <p> {size} <span className="text-red-500">|</span> {year} <span className="text-red-500">| {formattedPrice.split(".")[0]}</span></p>


          <p className='text-green-500 mt-2 text-center'>
            {lotId}
          </p>

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
                  to={`/exhibition/${_id}`}
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
                  to={`/exhibition/${_id}`}
                  state={{ item }}
                  className="inline-block w-3/4 py-2 px-4 rounded-md bg-gray-100"
                >
                  View Details
                </Link>
              )
            )}
          </div>


        </div>

      </div>

      {/* Booking Modal */}
      {selectedPhoto && (
        <ExhibitionModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          bookingInfo={selectedPhoto}
          refetch={refetch}
        />
      )}

    </div>
  );
};

export default PopularExhibitionCard;