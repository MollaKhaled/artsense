import { useState, useEffect } from 'react';

const useArtworkSearchAndFilter = () => {
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/artworkArtists`)
      .then(res => res.json())
      .then(data => {
        const sortedArtists = Array.isArray(data) 
          ? data.sort((a, b) => a.artist.localeCompare(b.artist)) 
          : [];
        setArtists(sortedArtists);
      })
      .catch(error => {
        console.error("Error fetching artists:", error);
        setError(error);
        setArtists([]);
      })
      .finally(() => setLoading(false));
  }, []);
  // Fetch media
   useEffect(() => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/media`)
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/years`)
      .then(res => res.json())
      .then(data => {
        const sortedYears = Array.isArray(data) 
          ? data.sort((a, b) => a - b) 
          : [];
        setYears(sortedYears);
      })
      .catch(error => {
        console.error("Error fetching years:", error);
        setYears([]);
      });
  }, []);

  // Fetch prices
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/prices`)
      .then(res => res.json())
      .then(data => {
        const sortedPrices = Array.isArray(data)
          ? data
              .map(price => {
                if (typeof price !== 'string') return null;
                const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
                return isNaN(numericPrice) ? null : numericPrice;
              })
              .filter(price => price !== null)
              .sort((a, b) => a - b)
              .map(price => `BDT ${price.toLocaleString()}`)
          : [];
        setPrices(sortedPrices);
      })
      .catch(error => {
        console.error("Error fetching prices:", error);
        setPrices([]);
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

export default useArtworkSearchAndFilter;