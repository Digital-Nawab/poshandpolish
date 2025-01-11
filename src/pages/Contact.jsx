import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../Layout"
import { toast } from "react-toastify";

function Contact() {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  // State for handling loading and success/error messages
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(""); // Reset status message

    try {
      // Send form data to the API using POST request
      const response = await axios.post(
        'https://admin.theposhandpolished.com/api/contact',
        formData
      );

      // Check if response was successful
      if (response.data.status) {
        toast.success(`Hi ${formData.name}, Your message has been sent successfully!`);
        setStatusMessage('Your message has been sent successfully!');
        setFormData({ name: '', mobile: '', email: '', message: '' }); // Clear form data
      } else {
        toast.error(`Failed to send message. Please try again.: ${response.data.message}`);
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      setStatusMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="w-full inset-0 bg-cover bg-cover-right bg-black bg-opacity-40 py-16 px-4"
        style={{ backgroundImage: "url('/assets/images/contact.webp')" }}
      >
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-[#63682f] mb-6 text-center">Contact Us</h2>

        <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between bg-white shadow-lg rounded-lg p-6 md:p-10 gap-8">
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#63682f] mb-4">Get in Touch</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <label htmlFor="name" className="text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 mt-2 text-gray-700 focus:ring-2 focus:ring-[#63682f] focus:outline-none transition"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="mobile" className="text-gray-700 font-semibold">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 mt-2 text-gray-700 focus:ring-2 focus:ring-[#63682f] focus:outline-none transition"
                  placeholder="Your Mobile Number"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 mt-2 text-gray-700 focus:ring-2 focus:ring-[#63682f] focus:outline-none transition"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="message" className="text-gray-700 font-semibold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 mt-2 text-gray-700 focus:ring-2 focus:ring-[#63682f] focus:outline-none transition"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#63682f] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#63682f] transform hover:scale-105 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {statusMessage && (
              <div
                className={`mt-4 text-center p-3 rounded-lg ${
                  statusMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {statusMessage}
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="grid grid-cols-1 gap-4 w-full">
              {/* Phone Item */}
              <div className="flex items-center bg-white rounded-lg p-4 hover:shadow-xl transform hover:scale-105 transition duration-300">
                <div className="text-[#63682f] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10.5V6a2 2 0 012-2h3.5m3 0H18a2 2 0 012 2v4.5M16 21H8a2 2 0 01-2-2v-3.5m0-3H3m18 0h-3.5m0 0V16a2 2 0 01-2 2h-3m-3-7h.01M12 12h.01M15 12h.01M9 12h.01M9 15h.01M15 15h.01M12 15h.01M6 15h.01"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-700">Phone</h4>
                  <p className="text-gray-600">
                    <a href="tel:+919956465805">+91 9956465805</a>, <a href="tel:+919559165805">9559165805</a>
                  </p>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-center bg-white rounded-lg p-4 hover:shadow-xl transform hover:scale-105 transition duration-300">
                <div className="text-[#63682f] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18M5 16V9m14 7V9m0 0L12 5m7 4l-7 5m0 0L5 9"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-700">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:poshnpolishedsalon@gmail.com">poshnpolishedsalon@gmail.com</a>
                  </p>
                </div>
              </div>

              {/* Address Item */}
              <div className="flex items-center bg-white rounded-lg p-4 hover:shadow-xl transform hover:scale-105 transition duration-300">
                <div className="text-[#63682f] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 21l-5.447-2.724A2 2 0 012 16.382V5.618a2 2 0 011.553-1.895L9 1m6 20l5.447-2.724A2 2 0 0022 16.382V5.618a2 2 0 00-1.553-1.895L15 1m0 0L9 3m6-2L9 3m-3 15.6a2.6 2.6 0 005.2 0m-5.2 0H3m12 0h3m-6-2.6h.01"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-700">Address</h4>
                  <p className="text-gray-600">
                    <a href="https://maps.app.goo.gl/3VU7Lu7QWuVg5aqH9" target="_blank">
                      B-40, Mandir Marg, opposite House of Johnson, Mahanagar
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#63682f] mb-4">Our Location</h3>
            <div className="overflow-hidden rounded-lg shadow-md w-full h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.8557673008354!2d80.9528445!3d26.8763232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd92bb9cd7bd%3A0xbf4e3f214e3a75de!2sPosh%20%26%20Polished%20Unisex%20Salon%20%26%20Academy!5e0!3m2!1sen!2sin!4v1734770549590!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
