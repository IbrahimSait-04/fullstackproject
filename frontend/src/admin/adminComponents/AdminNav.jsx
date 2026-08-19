import React, { useState } from "react";
import NavLogo from "../../assets/Imperial-Logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNav() {
  const token = localStorage.getItem("adminToken");
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    nav("/adminLogin");
  };

  return (
    <nav className="bg-slate-600 px-4 py-4 md:px-6">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/adminhome">
          <img
            src={NavLogo}
            className="w-16 md:w-20"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-400">
          <Link
            className="hover:text-gray-100"
            to="/adminhome"
          >
            Home
          </Link>

          <Link
            className="hover:text-gray-100"
            to="/getusers"
          >
            User List
          </Link>

          <Link
            className="hover:text-gray-100"
            to="/allbooking"
          >
            All Bookings
          </Link>

          {token ? (
            <button
              className="hover:text-gray-100"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          ) : (
            <Link
              className="hover:text-gray-100"
              to="/adminLogin"
            >
              LogIn
            </Link>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 pt-5 pb-2 text-gray-300">
          <Link
            className="hover:text-gray-100"
            to="/adminhome"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            className="hover:text-gray-100"
            to="/getusers"
            onClick={() => setMenuOpen(false)}
          >
            User List
          </Link>

          <Link
            className="hover:text-gray-100"
            to="/allbooking"
            onClick={() => setMenuOpen(false)}
          >
            All Bookings
          </Link>

          {token ? (
            <button
              className="hover:text-gray-100"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          ) : (
            <Link
              className="hover:text-gray-100"
              to="/adminLogin"
              onClick={() => setMenuOpen(false)}
            >
              LogIn
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}