import React, { useEffect, useState } from "react";
import PhotoItem from "../../Shared/PhotoItem/PhotoItem";




const PopularPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/photo`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(() => setLoading(false)); // Handle errors and ensure spinner stops
  }, []);

  // Sort items to move sold items to bottom
  const sortedPhotos = photos.sort((a, b) => {
    if (a.isSold === b.isSold) return 0;
    return a.isSold ? 1 : -1;
  });

  return (
    <>
    <div className="my-4">
      {loading ? (
        // Show spinner while data is being fetched
        <div className="flex justify-center items-center h-screen">
         <span className="loading loading-spinner text-error"></span>
        </div>
      ) : photos.length > 0 ? (
        // Show photos if available
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {sortedPhotos.map((item) => (
            <PhotoItem  key={item._id} item={item} />
          ))}
        </div>
      ) : (
        // Show message if no photos are available
        <p className="text-center text-gray-500">No photos available at the moment.</p>
      )}
    </div>
    </>
  );
};

export default PopularPhoto;
