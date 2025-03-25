import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ExhibitionForm = () => {
  const initialExhibitionData = useLoaderData();
  const [loadedExhibitionData, setLoadedExhibitionData] = useState(initialExhibitionData);
  const [loading, setLoading] = useState(false);

  // Fetch booking status on component load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/bookedExhibition/${initialExhibitionData.lotId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoadedExhibitionData((prev) => ({ ...prev, booked: data.booked }));
      })
      .catch((error) => console.error("Error fetching booking status:", error));
  }, [initialExhibitionData.lotId]);

  const handleBookExhibitionProduct = (event) => {
    event.preventDefault();
    setLoading(true);
  
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
  
    // Calculate grand total and format it
    const priceNumber = parseFloat(loadedExhibitionData.formattedPrice.replace(/[^\d.-]/g, ''));
    const discountNumber = parseFloat(loadedExhibitionData.discount.replace(/[^\d.-]/g, ''));
    const grandTotal = priceNumber - discountNumber;
    const formattedGrandTotal = `BDT ${grandTotal.toLocaleString()}`;
  
    const bookedExhibition = {
      id: loadedExhibitionData.lotId,
      price: loadedExhibitionData.formattedPrice,
      customerName: name,
      email,
      phone,
      address,
      grandTotal: formattedGrandTotal, // Include formatted grand total
    };
  
    fetch(`${import.meta.env.VITE_BACKEND_URL}/bookedExhibition`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookedExhibition),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Booked Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
  
          setLoadedExhibitionData((prev) => ({ ...prev, booked: true }));
          form.reset();
        } else if (data.error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Booking Failed",
            text: data.error,
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error booking exhibition:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to book the exhibition.",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      })
      .finally(() => setLoading(false));
  };
  

  return (
    <>
      <Helmet>
        <title>Book Exhibition | ArtSense</title>
      </Helmet>
      <div className="items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
          <form onSubmit={handleBookExhibitionProduct}>
            <div className="form-control mb-4">
              <input
                type="text"
                name="name"
                placeholder="*Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="email"
                name="email"
                placeholder="*Email"
                className="input input-bordered "
                required
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                name="phone"
                placeholder="*Phone"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-4">
              <textarea
                name="address"
                placeholder="*Address"
                className="textarea textarea-bordered h-28 resize-none"
                required
              ></textarea>
            </div>
            <div>
              <button
                className={`btn w-full font-semibold py-2 px-4 mb-2 rounded  ${loadedExhibitionData?.booked ? "cursor-not-allowed" : ""
                  }`}
                type="submit"
                disabled={loadedExhibitionData?.booked || loading}
              >
                {loadedExhibitionData?.booked ? "Already Booked" : loading ? "Booking..." : "Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExhibitionForm;
