import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@headlessui/react';
import useArtworkSearchAndFilter from '../../../hooks/useArtworkSearchAndFilter';

const LeftSideNav = () => {
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
  } = useArtworkSearchAndFilter(); // Using the custom hook

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
      navigate(`/search?query=${encodedSearchText}`); // Navigate with search query
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

  // Encode the media once, correctly
  const encodedMedia = encodeURIComponent(media.trim());

  setSelectedMedia(media.trim());

  // Navigate with the encoded media
  navigate(`/search?media=${encodedMedia}`);
};


  // Add enter key handler for search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // ... existing imports and component code ...

return (
  <div className="space-y-6 p-4 md:p-6">
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

    {/* Filters Section - Mobile Collapsible / Desktop Expanded */}
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
                  to={`/artworkArtists/${artist._id}`}
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
            <ul className="absolute left-0 w-full min-w-[200px] bg-base-100  p-2 shadow-md z-50 text-sm">
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
         
            <ul className="w-full min-w-[200px] bg-base-100 p-2  z-50 text-sm max-h-[60vh] overflow-y-auto">
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

export default LeftSideNav;


