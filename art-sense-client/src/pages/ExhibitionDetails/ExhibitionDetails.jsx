import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import ExhibitionForm from '../ExhibitionForm/ExhibitionForm';
import numberToWords from '../../utils/numberToWords';


const ExhibitionDetails = () => {
  const loadedExhibitionData = useLoaderData();

  // Destructure price and discount from the loaded data
  const { formattedPrice = 0, discount = 0, photoUrl, title, lotId, artist, media, size, year, lotDetails,condition, history, shipping, payment,artworkDetails } = loadedExhibitionData;

  // Extract numeric value from formattedPrice (e.g., "BDT 12,000.00" -> 12000)
  const priceNumber = parseFloat(formattedPrice.replace(/[^\d.-]/g, ''));

  // Extract numeric value from discount (e.g., "BDT 1,000.00" -> 1000)
  const discountNumber = parseFloat(discount.replace(/[^\d.-]/g, ''));

  // Calculate grand total
  const grandTotal = priceNumber - discountNumber;
  const grandTotalInWords = numberToWords(grandTotal);

  return (
    <>
  <Helmet>
    <title>artsense | Exhibition details</title>
  </Helmet>
  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 m-4 md:m-12 px-4 md:px-20 text-sm">
    {/* Image Section */}
    <div className="flex-1 relative">
      <img
        src={photoUrl}
        alt={title}
        className="w-full h-auto shadow-lg"
      />
    </div>
    {/* Item Details Section */}
    <div className="text-sm">
      <h2>artwork id <span className="text-red-500">{lotId}</span></h2>
      <div className="divider h-0.5"></div>
      <h2 className="font-semibold mb-2">{artist}</h2>
      <p>{title}</p>
      <p>{media}</p>
      <p>{size}</p>
      <p>{year}</p>

      {/* Pricing Section */}
      <div className="mt-4 text-sm">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>{formattedPrice.split(".")[0]}</span>
        </div>
        <div className="divider h-0.5"></div>

        <div className="font-semibold">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>{formattedPrice.split(".")[0]}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Special Honor</span>
          <span>{discount.split(".")[0]}</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Grand Total </span>
          <span className="text-red-500">{`BDT ${grandTotal.toLocaleString()}`}</span> {/* Display grand total */}
        </div>
        <div className="mt-2">
          <span>In Words: </span>
          <span className="font-semibold">{grandTotalInWords}</span> BDT only.
        </div>
        <div className="divider h-0.5"></div>
      </div>

      {/* Booking Form */}
      <div className="mt-6">
        <h2 className="mb-2 font-semibold">Booking Form</h2>
        <ExhibitionForm />
      </div>
    </div>
  </div>

  {/* Notes Section */}
  <div className="text-sm m-4 md:m-12">
    <div className="divider h-0.5"></div>
    <h2 className="text-center font-semibold">Notes</h2>
    <div className="divider h-0.5"></div>
    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
      {/* About Details Section */}
      <div className="w-full md:w-1/2 mx-2">
        <h2 className="font-semibold mb-2">About Details</h2>
        <p className="text-sm">{artworkDetails}</p>
      </div>

      {/* Additional Details Section */}
      <div className="w-full md:w-1/2">
        <div className="collapse collapse-arrow">
          <input type="checkbox" className="peer" />
          <div className="collapse-title">
            Condition Report
          </div>
          <div className="collapse-content">
            <p>{condition}</p>
          </div>
        </div>
        <div className="divider h-0.5"></div>
        <div className="collapse collapse-arrow">
          <input type="checkbox" className="peer" />
          <div className="collapse-title">
            History and Provenance
          </div>
          <div className="collapse-content">
            <p>{history}</p>
          </div>
        </div>
        <div className="divider h-0.5"></div>
        <div className="collapse collapse-arrow">
          <input type="checkbox" className="peer" />
          <div className="collapse-title">
            Shipping Information
          </div>
          <div className="collapse-content">
            <p>{shipping}</p>
          </div>
        </div>
        <div className="divider h-0.5"></div>
        <div className="collapse collapse-arrow">
          <input type="checkbox" className="peer" />
          <div className="collapse-title">
            Payment and Return Policies
          </div>
          <div className="collapse-content">
            <p>{payment}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default ExhibitionDetails;