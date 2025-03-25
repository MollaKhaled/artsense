import React, { useEffect, useState } from 'react';
import EventItem from '../EventItem/EventItem';
import { Helmet } from 'react-helmet-async';


const Event = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/event`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(() => setLoading(false)); // Handle errors gracefully
  }, []);

  return (
    <>
      <Helmet>
        <title>artsense | events</title>
      </Helmet>
      <div>
        {loading ? (
          // Show spinner when loading
          <div className="flex justify-center items-center min-h-screen text-sm">
          <span className="loading loading-spinner text-error"></span>
         </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full min-h-screen text-sm">
              <tbody>
                {event.map((item) => (
                  <EventItem key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
