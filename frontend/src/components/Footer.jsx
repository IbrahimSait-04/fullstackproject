import React from "react";
import FooterLogo from "../assets/Attire.png"
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <img src={FooterLogo} alt="Logo" className="w-36 mb-4" />

          <p className="text-gray-400 leading-7">
            Attire Car Rental provides premium, affordable, and reliable
            vehicles for business trips, vacations, and daily commuting.
          </p>

          <div className="flex gap-4 mt-6">

            <a
              href="#"
              className="bg-sky-600 hover:bg-sky-700 p-3 rounded-full duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-sky-600 hover:bg-sky-700 p-3 rounded-full duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="bg-sky-600 hover:bg-sky-700 p-3 rounded-full duration-300"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="bg-sky-600 hover:bg-sky-700 p-3 rounded-full duration-300"
            >
              <FaLinkedinIn />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer">
              Home
            </li>

            <li className="hover:text-white cursor-pointer">
              Cars
            </li>

            <li className="hover:text-white cursor-pointer">
              About Us
            </li>

            <li className="hover:text-white cursor-pointer">
              Services
            </li>

            <li className="hover:text-white cursor-pointer">
              Contact
            </li>

          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">
            Our Services
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li>Luxury Cars</li>
            <li>Economy Cars</li>
            <li>SUV Rentals</li>
            <li>Airport Pickup</li>
            <li>Long-Term Rental</li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">
            Contact
          </h2>

          <div className="space-y-5 text-gray-400">

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-sky-500" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-sky-500" />
              <span>support@attirecars.com</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-sky-500 mt-1" />
              <span>Kollam, Kerala, India</span>
            </div>

          </div>
        </div>

      </div>

      <hr className="border-slate-700" />

      <div className="text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Attire Car Rental. All Rights Reserved.
      </div>

    </footer>
  );
}