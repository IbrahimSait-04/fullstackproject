import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-sky-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-widest text-sky-200 font-semibold">
            About Imperial Rentals
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Your Journey, Our Responsibility
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-sky-100">
            Imperial Rentals makes car rental simple, comfortable, and
            reliable. Choose the right vehicle for your journey and enjoy a
            smooth rental experience.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div>
            <p className="text-sky-600 font-semibold uppercase tracking-wider">
              Who We Are
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mt-3">
              Making Car Rental Easier
            </h2>

            <p className="text-gray-600 mt-6 leading-7">
              Imperial Rentals is a modern car rental platform designed to
              provide customers with a convenient way to find and rent
              vehicles for their journeys.
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              From selecting your rental dates to choosing an available car
              and completing your booking, our platform is designed to keep
              the process simple and transparent.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="grid grid-cols-2 gap-6">

              <div className="text-center p-6 bg-sky-50 rounded-2xl">
                <div className="text-4xl">🚗</div>
                <h3 className="font-bold text-xl mt-3">
                  Quality Cars
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  A selection of vehicles for different journeys.
                </p>
              </div>

              <div className="text-center p-6 bg-sky-50 rounded-2xl">
                <div className="text-4xl">💰</div>
                <h3 className="font-bold text-xl mt-3">
                  Fair Pricing
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Clear rental pricing without unnecessary complexity.
                </p>
              </div>

              <div className="text-center p-6 bg-sky-50 rounded-2xl">
                <div className="text-4xl">🛡️</div>
                <h3 className="font-bold text-xl mt-3">
                  Reliable Service
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  A rental experience built around convenience.
                </p>
              </div>

              <div className="text-center p-6 bg-sky-50 rounded-2xl">
                <div className="text-4xl">📞</div>
                <h3 className="font-bold text-xl mt-3">
                  Customer Support
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  We're here to help when you need us.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <p className="text-sky-600 font-semibold uppercase tracking-wider">
              Why Choose Us
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mt-3">
              Everything You Need for Your Journey
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl">🔍</div>
              <h3 className="text-xl font-bold mt-5">
                Easy Car Search
              </h3>
              <p className="text-gray-500 mt-3">
                Select your pickup and return dates to find cars available
                for your journey.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl">💳</div>
              <h3 className="text-xl font-bold mt-5">
                Simple Booking
              </h3>
              <p className="text-gray-500 mt-3">
                Choose your vehicle and complete your booking through a
                straightforward process.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl">📅</div>
              <h3 className="text-xl font-bold mt-5">
                Flexible Rentals
              </h3>
              <p className="text-gray-500 mt-3">
                Manage your bookings and keep track of your rental details
                from your account.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-700 py-16 text-white text-center">
        <h2 className="text-4xl font-bold">
          Ready to Start Your Journey?
        </h2>

        <p className="mt-4 text-sky-100">
          Find the perfect car for your next trip.
        </p>

        <a
          href="/"
          className="inline-block mt-7 bg-white text-sky-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Browse Cars
        </a>
      </section>

      <Footer />
    </div>
  );
}