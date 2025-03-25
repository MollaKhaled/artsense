import { useState, useEffect } from 'react';

const useExhibitionSearchAndFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);
  const [medias, setMedias] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artists
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/exhibitionArtists`)
        .then(res => res.json())
        .then(data => {
          // Sort alphabetically by artist name
          const sortedArtists = Array.isArray(data) ? data.sort((a, b) => a.artist.localeCompare(b.artist)) : [];
          setArtists(sortedArtists);
        })
        .catch(error => {
          console.log("Error fetching artists:", error);
          setArtists([]);
        });
    }, []);
  // Fetch media
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/exhibitionMedia`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            // Remove duplicates and sort alphabetically
            const uniqueMedias = [...new Set(data)];
            const sortedMedias = uniqueMedias.sort((a, b) => a.localeCompare(b)); // Sort the media types alphabetically
            setMedias(sortedMedias);
            console.log(sortedMedias);  // This should now log the sorted array
          } else {
            setMedias([]);  // Ensure state is empty if data is invalid
          }
        })
        .catch(error => {
          console.error("Error fetching media:", error);
          setMedias([]);
        });
    }, []);

  // Fetch years
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/exhibitionYears`)
        .then(res => res.json())
        .then(data => {
  
          const sortedYears = Array.isArray(data) ? data.sort((a, b) => a - b) : [];
          setYears(sortedYears);
        })
        .catch(error => {
          console.log("Error fetching years:", error);
          setYears([]);
        });
    }, []);

  // Fetch prices
   useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/exhibitionPrices`)
        .then((res) => res.json())
        .then((data) => {
          // Safely process prices
          const sortedPrices = Array.isArray(data)
            ? data
              .map((price) => {
                if (typeof price !== 'string') return null; // Ensure price is a string
                const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
                return isNaN(numericPrice) ? null : numericPrice;
              })
              .filter((price) => price !== null) // Remove null or invalid prices
              .sort((a, b) => a - b) // Sort numerically
              .map((price) => `BDT ${price.toLocaleString()}`) // Format back as 'BDT <value>'
            : [];
  
          setPrices(sortedPrices); // Update state with sorted prices
        })
        .catch((error) => {
          console.error('Error fetching prices:', error);
          setPrices([]); // Set an empty array on error
        });
    }, []);


  return {
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
    loading,
    error
  };
};

export default useExhibitionSearchAndFilter;