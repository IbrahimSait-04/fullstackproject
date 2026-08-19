import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLogo from "../assets/Imperial-Logo.png";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-slate-600 px-4 py-4 md:px-6">

      {/* Main Navbar */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" onClick={closeMenu}>
          <img
            src={NavLogo}
            alt="Logo"
            className="w-16 md:w-20"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-gray-400 md:flex">

          <Link
            className="transition hover:text-gray-100"
            to="/home"
          >
            Home
          </Link>

          <Link
            className="transition hover:text-gray-100"
            to="/myrentals"
          >
            My Rents
          </Link>

          <Link
            className="transition hover:text-gray-100"
            to="/about"
          >
            About Us
          </Link>

          <Link
            className="transition hover:text-gray-100"
            to="/contact"
          >
            Contact
          </Link>

          {token ? (
            <Link
              className="transition hover:text-gray-100"
              to="/profile"
            >
              Profile
            </Link>
          ) : (
            <Link
              className="transition hover:text-gray-100"
              to="/"
            >
              LogIn
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-5 pb-2 pt-6 text-gray-300 md:hidden">

          <Link
            className="transition hover:text-white"
            to="/home"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            className="transition hover:text-white"
            to="/myrentals"
            onClick={closeMenu}
          >
            My Rents
          </Link>

          <Link
            className="transition hover:text-white"
            to="/about"
            onClick={closeMenu}
          >
            About Us
          </Link>


          {token ? (
            <Link
              className="transition hover:text-white"
              to="/profile"
              onClick={closeMenu}
            >
              Profile
            </Link>
          ) : (
            <Link
              className="transition hover:text-white"
              to="/"
              onClick={closeMenu}
            >
              LogIn
            </Link>
          )}

        </div>
      )}
    </nav>
  );
}