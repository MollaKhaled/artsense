import React from 'react';
import { FaDownload } from "react-icons/fa";

const EventItem = ({ item }) => {
  const { title, press, description, photoUrl, _id } = item;

  const handleDownload = async (eventId) => {
    try {
      if (!eventId) {
        throw new Error('Invalid event object or missing _id field');
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event/${eventId}/file`);


      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }
      const contentType = response.headers.get('Content-Type');
      if (contentType !== 'application/pdf') {
        throw new Error(`Invalid file type: ${contentType}`);
      }

      const disposition = response.headers.get('Content-Disposition');
      let filename = 'file.pdf';

      if (disposition && disposition.indexOf('attachment') !== -1) {
        const matches = disposition.match(/filename="(.+)"/);
        if (matches && matches[1]) {
          filename = matches[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error.message);
    }
  };

  return (
    <tr>
      {/* Photo column */}
      <td>
        <div className="flex items-center gap-3 ">
          <div className="avatar">
            <div className="rounded h-32 w-32">
              <img src={photoUrl} alt="Event" />
            </div>
          </div>
        </div>
      </td>

      {/* Title, Description, and Press columns */}
      <td colSpan={3}>
        <div className="grid grid-cols-1 text-sm">
          <div className="text-red-500 text-lg">{title}</div>
          <div className="">{description}</div>
          <div className="flex items-center">
            <div className=" text-green-600">{press}</div>
            <div className="text-lg ml-6">
              <button onClick={() => handleDownload(item._id)} aria-label={`Download ${title} PDF`}>
                <FaDownload />
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EventItem;
