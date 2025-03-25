import React, { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import AuctionCategoryCard from './AuctionCategoryCard';
import { FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Button } from '@headlessui/react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useAuctionSearchAndFilter from '../../../hooks/useAuctionSearchAndFilter';


const AuctionCategory = () => {
  const { id } = useParams();
  const artistPhotos = useLoaderData(); // Load data from the loader

  console.log("Loaded artist photos:", artistPhotos); // Debugging: Check the received data

  if (!artistPhotos) {
    return <p>No photos found for this artist.</p>; // Handle empty or missing data
  };

  const {
    artists,
    medias,
    setSelectedMedia,
    searchText,
    setSearchText,
    selectedPrice,
    setSelectedPrice,
    years,
    selectedYear,
    setSelectedYear,
    prices,
    loading
  } = useAuctionSearchAndFilter();
  const navigate = useNavigate();
  const [artistOpen, setArtistOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  // Toggle functions
  const toggleArtistDropdown = () => setArtistOpen(!artistOpen);
  const togglePriceDropdown = () => setPriceOpen(!priceOpen);
  const toggleYearDropdown = () => setYearOpen(!yearOpen);
  const toggleMediaDropdown = () => setMediaOpen(!mediaOpen);

  const handleSearch = () => {
    if (searchText.trim()) {
      const encodedSearchText = encodeURIComponent(searchText);
      const searchUrl = `/auctionSearch?query=${encodedSearchText}`;
      navigate(searchUrl);
    }
  };

  const handlePriceChange = (event) => {
    // Clean the price: Remove 'BDT' and commas
    const cleanPrice = event.target.value.replace(/\s|,/g, '').replace('BDT', '');
    setSelectedPrice(cleanPrice);
    navigate(`/auctionSearch?price=${cleanPrice}`);  // Send the cleaned price
  };


  const handleYearChange = (year) => {
    setSelectedYear(year);
    navigate(`/auctionSearch?year=${year}`); // Navigate with the selected year
  };

  const handleMediaChange = (media) => {
    if (!media) return; // Prevent navigation if media is empty or undefined
    setSelectedMedia(media.trim()); // Trim any unnecessary spaces
    navigate(`/auctionSearch?media=${encodeURIComponent(media.trim())}`); // Ensure URL safety
  };

 

  // Add enter key handler for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
 



  return (
    <>
      <Helmet>
        <title>artsense | Auction Photos</title>
      </Helmet>

      <div className="mb-10">
        {/* Add your banner or any other top content */}
      </div>

      <div className="my-10 grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm">
        {/* Left Sidebar (Search & Filter) */}
        <div className="lg:col-span-1 space-y-6 p-4 md:p-6">
          {/* Search Section */}
          <section>
            <label className="input input-bordered flex items-center gap-3 w-full">
              <input
                id="search-field"
                type="text"
                className="grow text-sm md:text-base"
                placeholder="Search by Artist or Title..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <FaSearch onClick={handleSearch} className="cursor-pointer" />
            </label>
          </section>
          {/* Filters Section */}
          <div>

            <h1 className="text-lg md:text-xl">Filter by</h1>
            <div className="divider"></div>
          </div>

          {/* Artist Dropdown */}
          <div className="relative text-sm mb-2">
            <Button
              variant="primary"
              onClick={toggleArtistDropdown}
              className="w-full flex items-center justify-between gap-2"
            >
              <span className="text-sm">Artist</span>
              {artistOpen ? <FaMinus /> : <FaPlus />}
            </Button>
            {artistOpen && (
              <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm">
                {artists.map((artist) => (
                  <li key={artist._id}>
                    <Link
                      to={`/auctionArtists/${artist._id}`}
                      className="block p-2 hover:bg-gray-200"
                    >
                      {artist.artist}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="divider h-0.5"></div>

          {/* Media Dropdown */}
          <div className="relative text-sm mb-2">
            <Button
              variant="primary"
              onClick={toggleMediaDropdown}
              className="w-full flex items-center justify-between gap-2"
            >
              <span>Media</span>
              {mediaOpen ? <FaMinus /> : <FaPlus />}
            </Button>
            {mediaOpen && (
              <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-md p-2 shadow-lg z-50 text-sm">
                {medias.length > 0 ? (
                  medias.map((media, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleMediaChange(media)}
                        className="block w-full p-2 text-left hover:bg-gray-100"
                      >
                        {media}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 p-2">No media available</li>
                )}
              </ul>
            )}
          </div>
          <div className="divider"></div>

          {/* Price Dropdown */}
          <div className="relative text-sm mb-2">
            <Button
              variant="primary"
              onClick={togglePriceDropdown}
              className="w-full flex items-center justify-between gap-2"
            >
              <span>Price</span>
              {priceOpen ? <FaMinus /> : <FaPlus />}
            </Button>
            {priceOpen && (
              <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm">
                {prices.map((price, index) => (
                  <li key={index}>
                    <button
                      value={price}
                      onClick={handlePriceChange}
                      className="block p-2 hover:bg-gray-200"
                    >
                      {price}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="divider"></div>

          {/* Year Dropdown */}
          <div className="relative text-sm mb-2">
            <Button
              variant="primary"
              onClick={toggleYearDropdown}
              className="w-full flex items-center justify-between gap-2"
            >
              <span>Year</span>
              {yearOpen ? <FaMinus /> : <FaPlus />}
            </Button>
            {yearOpen && (
              <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm">
                {Array.isArray(years) && years.length > 0 ? (
                  years.map((year, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleYearChange(year)}
                        className="block p-2 hover:bg-gray-200"
                      >
                        {year}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-sm">No years available</li>
                )}
              </ul>
            )}
          </div>
          <div className="divider"></div>

        </div>

        {/* Main Content (Category Items) */}
        <div className="lg:col-span-3">
          {artistPhotos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {artistPhotos.map(photo => (
                <AuctionCategoryCard key={photo._id} photo={photo} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No photos found.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default AuctionCategory;