import React from "react";
import Navbar from "../components/Navbar";
import titleimg from "../assets/title_img.png";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[90vh]">

        {/* Background Image */}
        <img
          src={titleimg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">

          <div className="text-white max-w-2xl">

            <p className="text-lg tracking-widest uppercase mb-2">
              Premium Car Rental
            </p>

            <h1 className="text-6xl font-bold leading-tight">
              Find The Perfect Car
            </h1>

            <h2 className="text-5xl font-bold text-sky-400 mt-2">
              For Every Journey
            </h2>

            <p className="mt-6 text-lg text-gray-200">
              Rent premium vehicles at affordable prices. Experience comfort,
              luxury, and safety for your next trip.
            </p>

            <div className="flex gap-5 mt-8">

              <button className="bg-sky-500 hover:bg-sky-700 px-8 py-3 rounded-lg font-semibold duration-300">
                Rent Now
              </button>

              <button className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black duration-300">
                Learn More
              </button>

            </div>

          </div>

        </div>

        {/* Search Box */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 w-[90%] max-w-6xl bg-white rounded-2xl shadow-xl p-8">

          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5">

            <div>
              <label className="font-semibold">Pickup Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Pickup Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Return Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Car Type</label>

              <select className="w-full border rounded-lg p-3 mt-2">
                <option>All Cars</option>
                <option>SUV</option>
                <option>Sedan</option>
                <option>Luxury</option>
                <option>Sports</option>
              </select>

            </div>

            <button className="bg-sky-700 text-white rounded-xl mt-8 h-12 hover:bg-sky-800">
              Search Cars
            </button>

          </div>

        </div>

      </section>

      {/* Space */}
      <div className="h-28"></div>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose Imperial Rentals
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Premium cars with exceptional service.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="font-bold text-xl">Wide Selection</h3>
            <p className="text-gray-500 mt-3">
              Economy, SUV, Luxury & Sports Cars.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="font-bold text-xl">Affordable Prices</h3>
            <p className="text-gray-500 mt-3">
              Transparent pricing with no hidden charges.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-bold text-xl">Safe & Reliable</h3>
            <p className="text-gray-500 mt-3">
              Fully insured and well-maintained vehicles.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="font-bold text-xl">24/7 Support</h3>
            <p className="text-gray-500 mt-3">
              Our team is available anytime you need help.
            </p>
          </div>

        </div>

      </section>
      <Footer />
    </div>
  );
}