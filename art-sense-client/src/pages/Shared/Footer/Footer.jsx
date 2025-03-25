import React from 'react';
import { Link } from 'react-router-dom';
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content text-sm p-4">
  {/* Logo Centered on Small Screens */}
  <div className=" text-center md:text-left text-gray-500">
      <h1>connecting through art</h1>
  </div>

  {/* Responsive Footer Content */}
  <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
    {/* Left Section */}
    <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
      <div>
        <Link
          to="https://www.facebook.com/artsensebd"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <span className="text-red-500">f</span>/<span className="text-red-500">a</span>rt
          <span className="text-red-500">s</span>ense
        </Link>
      </div>
      <div>
        <p>
          +880 1718 876332
          <span className="text-red-500"> | </span>artsensebdgallery@gmail.com
        </p>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col md:flex-row items-center lg:gap-2 text-center md:text-left">
      <h1>
        &copy; 02.02.2024 by
        <span className="text-red-500"> a</span>rt
        <span className="text-red-500">s</span>ense
        <span className="text-red-500"> | </span>
    
      <Link
        to="https://mollakhaledhossain.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className='items-center'>Powered By MH.Khaled <TbWorld className='inline' size={20} /></span>
        
      </Link>
      </h1>
    </div>
  </div>
</footer>
  );
};

export default Footer;


