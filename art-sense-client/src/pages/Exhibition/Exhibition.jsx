import React, { useEffect, useState } from 'react';
import PopularExhibitionCard from '../PopularExhibitionCard/PopularExhibitionCard';
import Banner from '../Exhibition/Banner';
import { Helmet } from 'react-helmet-async';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Button } from '@headlessui/react';
import useExhibitionSearchAndFilter from '../../hooks/useExhibitionSearchAndFilter';

const Exhibition = () => {
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

  } = useExhibitionSearchAndFilter();
  const [exhibition, setExhibition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/exhibition`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch exhibitions');
        }
        return res.json();
      })
      .then(data => {
        setExhibition(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Set error message in case of fetch failure
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchText.trim()) {
      const encodedSearchText = encodeURIComponent(searchText);
      const searchUrl = `/exhibitionSearch?query=${encodedSearchText}`;
      navigate(searchUrl);
    }
  };

  const handlePriceChange = (event) => {
    // Clean the price: Remove 'BDT' and commas
    const cleanPrice = event.target.value.replace(/\s|,/g, '').replace('BDT', '');
    setSelectedPrice(cleanPrice);
    navigate(`/exhibitionSearch?price=${cleanPrice}`);  // Send the cleaned price
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    navigate(`/exhibitionSearch?year=${year}`); // Navigate with the selected year
  };

  const handleMediaChange = (media) => {
    if (!media) return; // Prevent navigation if media is empty or undefined
    setSelectedMedia(media.trim()); // Trim any unnecessary spaces
    navigate(`/exhibitionSearch?media=${encodeURIComponent(media.trim())}`); // Ensure URL safety
  };

  // Sort items to move sold items to bottom
  const sortedExhibitionPhoto = exhibition.sort((a, b) => {
    if (a.isSold === b.isSold) return 0;
    return a.isSold ? 1 : -1;
  });

  // Add enter key handler for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <>
      <Helmet>
        <title>artsense | Exhibition</title>
      </Helmet>

      <div className="mb-10">
        <Banner />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm  ">
        {/* Left Sidebar (Search & Filter) */}
        <div className="lg:col-span-1 space-y-6 p-4 md:p-6">
          <section>
            <label className="input input-bordered flex items-center gap-2 w-full">
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
          <div className="block">
            {/* Mobile View - Collapsible */}
            <div className="md:hidden collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                Filter by
              </div>

              <div className="collapse-content">
                <div className="divider h-0.5"></div>
                <FilterContent
                  {...{
                    artistOpen, toggleArtistDropdown, artists,
                    mediaOpen, toggleMediaDropdown, medias, handleMediaChange,
                    priceOpen, togglePriceDropdown, prices, handlePriceChange,
                    yearOpen, toggleYearDropdown, years, handleYearChange
                  }}
                />
              </div>
            </div>

            {/* Desktop View - Always Expanded */}
            <div className="hidden md:block">
              <h2 className="text-lg font-medium mb-4">Filter by</h2>
              <div className="divider h-0.5"></div>
              <FilterContent
                {...{
                  artistOpen, toggleArtistDropdown, artists,
                  mediaOpen, toggleMediaDropdown, medias, handleMediaChange,
                  priceOpen, togglePriceDropdown, prices, handlePriceChange,
                  yearOpen, toggleYearDropdown, years, handleYearChange
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Content (Exhibition Cards) */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <span className="loading loading-spinner text-error"></span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Error: {error}</p>
            </div>
          ) : exhibition.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {sortedExhibitionPhoto.map((item) => (
                <PopularExhibitionCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No exhibitions available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>


  );
};

// Create a separate FilterContent component for reusability
const FilterContent = ({
  artistOpen, toggleArtistDropdown, artists,
  mediaOpen, toggleMediaDropdown, medias, handleMediaChange,
  priceOpen, togglePriceDropdown, prices, handlePriceChange,
  yearOpen, toggleYearDropdown, years, handleYearChange
}) => {
  return (
    <>
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
          <ul className="w-full min-w-[200px] bg-base-100  p-2  z-50 text-sm max-h-[60vh] overflow-y-auto">
            {artists.map((artist) => (
              <li key={artist._id}>
                <Link
                  to={`/exhibitionArtists/${artist._id}`}
                  className="block w-full p-2 text-left hover:bg-gray-200 transition-colors"
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
           
          <ul className="w-full min-w-[200px] bg-base-100  p-2  z-50 text-sm max-h-[60vh] overflow-y-auto">
            {medias.length > 0 ? (
              medias.map((media, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleMediaChange(media)}
                    className="block w-full p-2 text-left hover:bg-gray-200 transition-colors"
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
          
            <ul className="w-full min-w-[200px] bg-base-100  p-2  z-50 text-sm max-h-[60vh] overflow-y-auto">
              {prices.map((price, index) => (
                <li key={index}>
                  <button
                    value={price}
                    onClick={handlePriceChange}
                    className="block w-full p-2 text-left hover:bg-gray-200 transition-colors"
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
          
            <ul className="w-full min-w-[200px] bg-base-100  p-2  z-50 text-sm max-h-[60vh] overflow-y-auto">
              {Array.isArray(years) && years.length > 0 ? (
                years.map((year, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleYearChange(year)}
                      className="block w-full p-2 text-left hover:bg-gray-200 transition-colors"
                    >
                      {year}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm p-2">No years available</li>
              )}
            </ul>
          
        )}
      </div>
      <div className="divider"></div>
    </>
  );
};

export default Exhibition;
