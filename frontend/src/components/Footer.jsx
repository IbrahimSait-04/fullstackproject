import React from "react";
import FooterLogo from "../assets/Imperial-Logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-white sm:mt-16 md:mt-20">

      {/* Footer Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-10 sm:grid-cols-2 sm:px-8 sm:py-12 md:grid-cols-4 md:gap-8 md:py-16">

        {/* Company */}
        <div className="sm:col-span-2 md:col-span-1">

          <img
            src={FooterLogo}
            alt="Logo"
            className="mb-4 w-28 sm:w-32 md:w-36"
          />

          <p className="max-w-md text-sm leading-7 text-gray-400 sm:text-base">
            Imperial Car Rental provides premium, affordable, and reliable
            vehicles for business trips, vacations, and daily commuting.
          </p>

          {/* Social Icons */}
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 sm:gap-4">

            <button
              type="button"
              aria-label="Facebook"
              className="rounded-full bg-sky-600 p-3 transition duration-300 hover:bg-sky-700"
            >
              <FaFacebookF />
            </button>

            <button
              type="button"
              aria-label="Instagram"
              className="rounded-full bg-sky-600 p-3 transition duration-300 hover:bg-sky-700"
            >
              <FaInstagram />
            </button>

            <button
              type="button"
              aria-label="Twitter"
              className="rounded-full bg-sky-600 p-3 transition duration-300 hover:bg-sky-700"
            >
              <FaTwitter />
            </button>

            <button
              type="button"
              aria-label="LinkedIn"
              className="rounded-full bg-sky-600 p-3 transition duration-300 hover:bg-sky-700"
            >
              <FaLinkedinIn />
            </button>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-4 text-xl font-semibold sm:mb-5 sm:text-2xl">
            Quick Links
          </h2>

          <ul className="space-y-3 text-sm text-gray-400 sm:text-base">

            <li>
              <Link
                to="/home"
                className="transition hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/myrentals"
                className="transition hover:text-white"
              >
                My Rents
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="transition hover:text-white"
              >
                About Us
              </Link>
            </li>


          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="mb-4 text-xl font-semibold sm:mb-5 sm:text-2xl">
            Our Services
          </h2>

          <ul className="space-y-3 text-sm text-gray-400 sm:text-base">
            <li>Luxury Cars</li>
            <li>Economy Cars</li>
            <li>SUV Rentals</li>
            <li>Airport Pickup</li>
            <li>Long-Term Rental</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-4 text-xl font-semibold sm:mb-5 sm:text-2xl">
            Contact
          </h2>

          <div className="space-y-4 text-sm text-gray-400 sm:space-y-5 sm:text-base">

            {/* Phone */}
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 shrink-0 text-sky-500" />

              <span className="break-words">
                +91 98765 43210
              </span>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 shrink-0 text-sky-500" />

              <span className="break-all">
                support@imperialcars.com
              </span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-sky-500" />

              <span>
                Kollam, Kerala, India
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Divider */}
      <hr className="border-slate-700" />

      {/* Copyright */}
      <div className="px-4 py-5 text-center text-xs text-gray-400 sm:py-6 sm:text-sm">
        © {new Date().getFullYear()} Imperial Car Rental. All Rights Reserved.
      </div>

    </footer>
  );
}