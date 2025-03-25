import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch((error) => console.log(error));
  };

  const handleOptionClick = () => {
    setDropdownOpen(false); // Close the dropdown menu
  };

  const navOptions = (
    <>
      <div className="flex lg:flex-row flex-col items-center gap-2 ">
        <li>
          <Link to="/" onClick={handleOptionClick}>artworks</Link>
        </li>
        <span className="hidden lg:inline-block text-red-500">|</span>
        <li>
          <Link to="/auction" onClick={handleOptionClick}>auction</Link>
        </li>
        <span className="hidden lg:inline-block text-red-500">|</span>
        <li>
          <Link to="/exhibition" onClick={handleOptionClick}>exhibition</Link>
        </li>
        <span className="hidden lg:inline-block text-red-500">|</span>
        <li>
          <Link to="/services" onClick={handleOptionClick}>services</Link>
        </li>
        <span className="hidden lg:inline-block text-red-500">|</span>
        <li>
          <Link to="/about" onClick={handleOptionClick}>about</Link>
        </li>
        <span className="hidden lg:inline-block text-red-500">|</span>
        <li>
          <Link to="/event" onClick={handleOptionClick}>events</Link>
        </li>
        <span className="hidden lg:inline-block text-red-500">|</span>
        {isAdmin && <li><Link to="/dashboard" onClick={handleOptionClick}>dashboard</Link></li>}
        {/* <li>
          <button className="btn">
            <FaShoppingCart className="m-2" />
            <div className="badge" style={{ backgroundColor: '#B22222', color: 'white' }}>
              +{cart.length || 0}
            </div>
          </button>
        </li> */}

        {user?.email ? (
          <>
            <li>
              <button onClick={() => { handleLogOut(); handleOptionClick(); }}>log out</button>
            </li>

            <li>
              <span>{user?.displayName}</span>
            </li>

          </>
        ) : (
          <li>
            <Link to="/login" onClick={handleOptionClick}>login</Link>
          </li>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="navbar sticky top-0 z-10 bg-opacity-30 max-w-screen-xl mx-auto px-4">

        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-vertical bg-base-100 dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {navOptions}
              </ul>
            )}
          </div>
          <div className="text-2xl text-center">
            <Link to="/">
              <span className="text-red-600">a</span>rt
              <span className="text-red-600">s</span>ense
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;