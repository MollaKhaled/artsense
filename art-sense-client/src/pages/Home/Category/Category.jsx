import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import { FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Button } from '@headlessui/react';
import useArtworkSearchAndFilter from '../../../hooks/useArtworkSearchAndFilter';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const Category = () => {
  const { id } = useParams();
  const artistPhotos = useLoaderData(); // Load data from the loader

  console.log("Loaded artist photos:", artistPhotos); // Debugging: Check the received data

  if (!artistPhotos) {
    return <p>No photos found for this artist.</p>; // Handle empty or missing data
  }


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
  } = useArtworkSearchAndFilter();
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

  // Search handler
  const handleSearch = () => {
    if (searchText.trim()) {
      const encodedSearchText = encodeURIComponent(searchText);
      const searchUrl = `/search?query=${encodedSearchText}`;
      navigate(searchUrl);
    }
  };

  // Price change handler
  const handlePriceChange = (event) => {
    const cleanPrice = event.target.value.replace(/\s|,/g, '').replace('BDT', '');
    setSelectedPrice(cleanPrice);
    navigate(`/search?price=${cleanPrice}`);
  };

  // Year change handler
  const handleYearChange = (year) => {
    setSelectedYear(year);
    navigate(`/search?year=${year}`);
  };

  // Media change handler
  const handleMediaChange = (media) => {
    if (!media) return;
    setSelectedMedia(media.trim());
    navigate(`/search?media=${encodeURIComponent(media.trim())}`);
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
        <title>artsense | Artist Photos</title>
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
                      to={`/artworkArtists/${artist._id}`}
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
                <CategoryCard key={photo._id} photo={photo} />
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

export default Category;

