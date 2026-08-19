import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="bg-sky-700 px-4 py-14 text-white sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200 sm:text-base sm:tracking-widest">
            About Imperial Rentals
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Your Journey, Our Responsibility
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-sky-100 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
            Imperial Rentals makes car rental simple, comfortable, and
            reliable. Choose the right vehicle for your journey and enjoy a
            smooth rental experience.
          </p>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">

          {/* Text */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600 sm:text-base">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-800 sm:text-4xl">
              Making Car Rental Easier
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base">
              Imperial Rentals is a modern car rental platform designed to
              provide customers with a convenient way to find and rent
              vehicles for their journeys.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              From selecting your rental dates to choosing an available car
              and completing your booking, our platform is designed to keep
              the process simple and transparent.
            </p>

          </div>

          {/* Feature Card */}
          <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-7 md:p-10">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">

              {/* Quality Cars */}
              <div className="rounded-2xl bg-sky-50 p-5 text-center sm:p-6">
                <div className="text-4xl">🚗</div>

                <h3 className="mt-3 text-lg font-bold sm:text-xl">
                  Quality Cars
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  A selection of vehicles for different journeys.
                </p>
              </div>

              {/* Fair Pricing */}
              <div className="rounded-2xl bg-sky-50 p-5 text-center sm:p-6">
                <div className="text-4xl">💰</div>

                <h3 className="mt-3 text-lg font-bold sm:text-xl">
                  Fair Pricing
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Clear rental pricing without unnecessary complexity.
                </p>
              </div>

              {/* Reliable Service */}
              <div className="rounded-2xl bg-sky-50 p-5 text-center sm:p-6">
                <div className="text-4xl">🛡️</div>

                <h3 className="mt-3 text-lg font-bold sm:text-xl">
                  Reliable Service
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  A rental experience built around convenience.
                </p>
              </div>

              {/* Customer Support */}
              <div className="rounded-2xl bg-sky-50 p-5 text-center sm:p-6">
                <div className="text-4xl">📞</div>

                <h3 className="mt-3 text-lg font-bold sm:text-xl">
                  Customer Support
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  We're here to help when you need us.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600 sm:text-base">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-800 sm:text-4xl">
              Everything You Need for Your Journey
            </h2>

          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 md:mt-14 md:grid-cols-3 md:gap-8">

            {/* Easy Search */}
            <div className="rounded-2xl border border-gray-100 p-6 shadow-lg sm:p-8">

              <div className="text-4xl">🔍</div>

              <h3 className="mt-5 text-xl font-bold">
                Easy Car Search
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Select your pickup and return dates to find cars available
                for your journey.
              </p>

            </div>

            {/* Simple Booking */}
            <div className="rounded-2xl border border-gray-100 p-6 shadow-lg sm:p-8">

              <div className="text-4xl">💳</div>

              <h3 className="mt-5 text-xl font-bold">
                Simple Booking
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Choose your vehicle and complete your booking through a
                straightforward process.
              </p>

            </div>

            {/* Flexible Rentals */}
            <div className="rounded-2xl border border-gray-100 p-6 shadow-lg sm:p-8">

              <div className="text-4xl">📅</div>

              <h3 className="mt-5 text-xl font-bold">
                Flexible Rentals
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Manage your bookings and keep track of your rental details
                from your account.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-sky-700 px-4 py-12 text-center text-white sm:px-6 sm:py-14 md:py-16">

        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          Ready to Start Your Journey?
        </h2>

        <p className="mt-3 text-sm text-sky-100 sm:mt-4 sm:text-base">
          Find the perfect car for your next trip.
        </p>

        <a
          href="/"
          className="
            mt-6
            inline-block
            w-full
            max-w-xs
            rounded-xl
            bg-white
            px-8
            py-3
            font-semibold
            text-sky-700
            transition
            hover:bg-gray-100
            sm:mt-7
            sm:w-auto
          "
        >
          Browse Cars
        </a>

      </section>

      <Footer />
    </div>
  );
}