import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting Imperial Rentals!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-sky-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-widest text-sky-200 font-semibold">
            Get In Touch
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-sky-100">
            Have a question about your rental or need assistance?
            Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>

            <p className="text-sky-600 font-semibold uppercase tracking-wider">
              Contact Information
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mt-3">
              We'd Love To Hear From You
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              Whether you have a question about our cars, bookings,
              payments, or anything else, feel free to reach out to us.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-2xl">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Address
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Imperial Rentals<br />
                    Kollam, Kerala, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-2xl">
                  📞
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-500 mt-1">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-2xl">
                  ✉️
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-500 mt-1">
                    support@imperialrentals.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-2xl">
                  🕐
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Working Hours
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Monday – Sunday<br />
                    24/7 Support
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

            <h2 className="text-2xl font-bold text-gray-800">
              Send Us A Message
            </h2>

            <p className="text-gray-500 mt-2">
              Fill out the form and we'll get back to you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* FAQ-ish section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-800">
            Need Immediate Assistance?
          </h2>

          <p className="text-gray-500 mt-4">
            For urgent rental-related questions, contact our support team
            directly through phone or email.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}