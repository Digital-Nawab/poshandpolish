import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Form() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    service: "",
    spamCheck: "", // Honeypot field
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://admin.theposhandpolished.com/api/service");
        if (response.data.service) {
          setServices(response.data.service);
          // Set default service to the first in the list, if available
          if (response.data.service.length > 0) {
            setFormData((prevData) => ({
              ...prevData,
              service: response.data.service[0].title,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10,13}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be between 10-13 digits";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Spam honeypot check
    if (formData.spamCheck) {
      alert("Spam detected. Request rejected.");
      return;
    }

    try {
      console.log("Submitting data:", formData); // Debugging line
      const response = await axios.post("https://admin.theposhandpolished.com/api/book-appointment", formData);

      if (response.data.status) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          city: "",
          service: "",
          spamCheck: "", // Honeypot field
          message: "",
        });
        toast.success(`Hi ${formData.name}, your appointment enquiry has been submitted successfully.`);
      } else {
        toast.error(`Failed to book appointment: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment. Please try again later.");
    }
  };

  return (
    <div
      className="w-full inset-0 bg-cover bg-cover-right bg-black bg-opacity-40 py-16 px-4"
      style={{ backgroundImage: "url('/assets/images/contact.webp')" }}
    >
      <div className="container mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#63682f] mb-6 text-center">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot Field */}
            <input
              type="text"
              name="spamCheck"
              value={formData.spamCheck}
              onChange={handleInputChange}
              style={{ display: "none" }}
              autoComplete="off"
              tabIndex="-1"
            />
            {/* Name and Email */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none text-[#63682f] focus:ring-2 focus:ring-[#63682f] ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">E-MAIL *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-[#63682f] focus:ring-[#63682f] ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            {/* Mobile and City */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  minLength={10}
                  maxLength={13}
                  placeholder="Mobile Number"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-[#63682f] focus:ring-[#63682f] ${errors.mobile ? 'border-red-500' : ''}`}
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Your City"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-[#63682f] focus:ring-[#63682f]"
                />
              </div>
            </div>
            {/* Select Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63682f] text-[#63682f] ${errors.service ? 'border-red-500' : ''}`}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id}>{service.title}</option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Your Message"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-[#63682f] focus:ring-[#63682f]"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#63682f] text-white font-bold py-2 px-4 rounded hover:bg-[#63682f] transition duration-300"
              >
                Book An Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
