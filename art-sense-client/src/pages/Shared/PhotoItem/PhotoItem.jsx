import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import BookingModal from "../BookingModal/BookingModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAdmin from "../../../hooks/useAdmin";


const PhotoItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { _id, artist, title, size, lotId, photoUrl, media, year } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [axiosSecure] = useAxiosSecure();
  const [cart, refetch] = useCart();
  const phoneNumber = "+8801727079377"; // Your WhatsApp number
  const fixedMessage = "Inquire about artwork";
  const [isSold, setIsSold] = useState(item.isSold); // Track sold status
  const [isAdmin] = useAdmin();



  const handleMarkAsSold = async () => {
    try {
      const response = await axiosSecure.patch(`/photo/${item._id}`, {
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


  const handleWhatsAppClick = () => {
    const message = `${fixedMessage} Id ${lotId}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const openModal = () => {
    setSelectedPhoto(item);
    setIsOpen(true);
  };

  return (

    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden text-sm">
      {/* Image Container */}
      <figure className="px-10 h-[250px] flex items-center justify-center">
        <img
          onClick={openModal}
          src={photoUrl}
          alt="Artwork"
          className="w-full h-full object-contain rounded-sm"
        />
      </figure>

      <div className="card text-center p-5 text-sm">
        <div className="text-center text-sm">
          <p className="font-bold">{artist}</p>
          <p>
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">| </span> {year}
          </p>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1 "
            >
              <span>{lotId}</span>
              <span className="text-red-500">| </span>
              <p className="text-green-500">Ask for Price</p>
              <FaWhatsapp className="text-green-500" />
            </button>
            <span className="text-red-500">|</span>
            <Link to={`/inquire/${_id}/${lotId}`}>
              <IoMdMail />
            </Link>
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
                          to={`/photo/${_id}`}
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
                          to={`/photo/${_id}`}
                          state={{ item }}
                          className="inline-block w-3/4 py-2 px-4 rounded-md bg-gray-100"
                        >
                          Available
                        </Link>
                      )
                    )}
                  </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedPhoto && (
        <BookingModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          bookingInfo={selectedPhoto}
          refetch={refetch}
        />
      )}
    </div>


  );
};

export default PhotoItem;