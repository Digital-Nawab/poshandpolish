import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "./component/Slider";
import { ToastContainer, toast } from "react-toastify";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
} from "@material-tailwind/react";
import MyContext from "./context/MyContext";
import axios from "axios";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="white"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const context = useContext(MyContext);
  const { handlePopup, isPopupOpen, title, setIsPopupOpen } = context;

  const [count, setCount] = useState(0);
  const [servicesMenu, setServicesMenu] = useState([]);
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://admin.theposhandpolished.com/api/service"
        );
        if (response.data.service) {
          setServicesMenu(response.data.service);
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

  const [formDataPopup, setformDataPopup] = useState({
    name: "",
    email: "",
    mobile: "",
    spamCheck: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formDataPopup.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formDataPopup.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10,13}$/.test(formDataPopup.mobile)) {
      newErrors.mobile = "Mobile number must be between 10-13 digits";
    }

    if (formDataPopup.email && !/\S+@\S+\.\S+/.test(formDataPopup.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChangePopup = (event) => {
    const { name, value } = event.target;
    setformDataPopup({
      ...formDataPopup,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmitPopup = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (formDataPopup.spamCheck) {
      alert("Spam detected. Request rejected.");
      return;
    }

    try {
      const dataToSubmit = {
        ...formDataPopup,
        service: title,
      };

      const response = await axios.post(
        "https://admin.theposhandpolished.com/api/book-appointment",
        dataToSubmit
      );

      if (response.data.status) {
        toast.success(
          `Hi ${formDataPopup.name}, your appointment enquiry has been submitted successfully.`
        );

        // console.log(`Hi ${formDataPopup.name}, your appointment enquiry has been submitted successfully.`);
        setformDataPopup({
          name: "",
          email: "",
          mobile: "",
          spamCheck: "",
        });
        setIsPopupOpen(!isPopupOpen);
      } else {
        toast.error(`Failed to book appointment: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const [open2, setOpen2] = React.useState(0);

  const handleOpen = (value) => setOpen2(open2 === value ? 0 : value);

  return (
    <>
      {/* <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <Button onClick={handlePopup}>Notify !</Button>
      
    </div> */}
      <div className="bg-[#63682F] text-white sticky top-0 z-50">
        <div className="container mx-auto">
          <header className="flex justify-between items-center ">
            <div className="text-2xl font-bold uppercase flex items-center">
              <span className="mr-2">
                <Link to="/">
                  <img
                    src="/assets/images/logo.png" // Replace with your logo URL
                    alt="Logo"
                    className=" p-2 w-[130px]"
                  />
                </Link>
              </span>
            </div>
            <nav className="hidden md:flex gap-10 text-sm">
              <Link
                to="/"
                className="hover:text-[#ffcc6e] text-lg hover:underline hover:decoration-yellow-400 h2"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-[#ffcc6e] text-lg  hover:underline hover:decoration-yellow-400 h2"
              >
                About
              </Link>
              <Menu allowHover={true}>
                <MenuHandler>
                  <h2
                    to="/services"
                    className="hover:text-[#ffcc6e] text-lg cursor-pointer  hover:underline hover:decoration-yellow-400 h2"
                  >
                    Services
                  </h2>
                </MenuHandler>
                <MenuList>
                  {servicesMenu &&
                    servicesMenu.map((service) => (
                      <MenuItem key={service._id}>
                        <Link to={`/service/${service.slug_url}`}>
                          {service.title}
                        </Link>
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
              <Link
                to="/gallery"
                className="hover:text-[#ffcc6e]  text-lg  hover:underline hover:decoration-yellow-400 h2"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#ffcc6e] text-lg hover:underline hover:decoration-yellow-400 h2"
              >
                Contact
              </Link>
              <Link
                to="/offer"
                className="text-lg tracking-widest bg-yellow-600 font-semibold rounded-xl px-2 !text-[#63682F] hover:text-yellow-400 h2 hover:underline hover:decoration-yellow-400 
      animate-blink transition-all duration-300 ease-in-out"
              >
                {" "}
                Offers
              </Link>
            </nav>
            <div className="md:hidden block z-50 bg-[#63682F]">
              <React.Fragment>
                <Button
                  className="bg-[#63682F] shadow-none hover:shadow-none"
                  onClick={openDrawer}
                >
                  <i className="fa fa-2x fa-bars" aria-hidden="true"></i>
                </Button>

                <Drawer
                  className="bg-[#63682F]"
                  open={open}
                  onClose={closeDrawer}
                >
                  <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                      <Link to="/">
                        <img
                          src="/assets/images/logo.png" // Replace with your logo URL
                          alt="Logo"
                          className=" p-2 w-[130px]"
                        />
                      </Link>
                    </Typography>
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={closeDrawer}
                    >
                      <i className="fa fa-2x text-[#ccc8bf] fa-close"></i>
                    </IconButton>
                  </div>
                  <List>
                    <Link
                      to="/"
                      className="hover:text-[#ffcc6e] text-lg w-full  hover:underline hover:decoration-yellow-400 h2"
                    >
                      Home
                    </Link>

                    <Link
                      to="/about"
                      className="hover:text-[#ffcc6e] w-full  text-lg  hover:underline hover:decoration-yellow-400 h2"
                    >
                      About
                    </Link>

                    <Accordion
                      className="p-0 border-none"
                      open={open2 === 1}
                      icon={<Icon id={1} open={open2} />}
                    >
                      <AccordionHeader
                        className="p-0 border-none"
                        onClick={() => handleOpen(1)}
                      >
                        {" "}
                        <h2
                          to="/about"
                          className="hover:text-[#ffcc6e] w-full  text-lg  hover:underline hover:decoration-yellow-400 h2"
                        >
                          Services
                        </h2>
                      </AccordionHeader>
                      <AccordionBody className="border-none">
                        {servicesMenu &&
                          servicesMenu.map((service) => (
                            <div key={service._id}>
                              <Link
                                to={`/service/${service.slug_url}`}
                                className="text-white text-lg"
                              >
                                {service.title}
                              </Link>
                            </div>
                          ))}
                      </AccordionBody>
                    </Accordion>

                    <Link
                      to="/gallery"
                      className="hover:text-[#ffcc6e] w-full text-lg  hover:underline hover:decoration-yellow-400 h2"
                    >
                      Gallery
                    </Link>

                    <Link
                      to="/contact"
                      className="hover:text-[#ffcc6e] w-full text-lg hover:underline hover:decoration-yellow-400 h2"
                    >
                      Contact
                    </Link>
                  </List>
                  {/* <Button
                    className="mt-3 ml-5 bg-[#ffcc6e] text-[#63682F]"
                    size="sm"
                  >
                    Book Appointment
                  </Button> */}
                </Drawer>
              </React.Fragment>
            </div>
          </header>
        </div>
      </div>

      <div className={``}>
        <Slider />
        {children}
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 items-center justify-center">
          <div className="relative bg-white w-80 p-4 text-[#63682f] rounded-lg">
            <button
              onClick={handlePopup}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Close"
            >
              X
            </button>
            <h2 className="text-lg font-bold text-[#63682f] mb-4">
              Enquiry Form
            </h2>
            <form onSubmit={handleSubmitPopup}>
              <input
                type="text"
                name="spamCheck"
                value={formDataPopup.spamCheck}
                onChange={handleInputChangePopup}
                style={{ display: "none" }}
                autoComplete="off"
                tabIndex="-1"
              />
              <input
                type="hidden"
                name="service"
                value={title}
                onChange={handleInputChangePopup}
              />

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formDataPopup.name}
                  onChange={handleInputChangePopup}
                  placeholder="Your Name"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none text-[#63682f] focus:ring-2 focus:ring-[#63682f] ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formDataPopup.mobile}
                  onChange={handleInputChangePopup}
                  minLength={10}
                  maxLength={13}
                  placeholder="Mobile Number"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-[#63682f] focus:ring-[#63682f] ${
                    errors.mobile ? "border-red-500" : ""
                  }`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formDataPopup.email}
                  onChange={handleInputChangePopup}
                  placeholder="Your Email"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-[#63682f] focus:ring-[#63682f] ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="text-right">
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
      )}

      <div className="reative">
        <button
          className="fixed top-1/2 right-[-66px] animate-bgBlink transition-all duration-300 ease-in-out transform -translate-y-1/2 shadow-lg rotate-90 z-50 text-white px-4 py-2 bg-[#63682f] rounded hover:bg-blue-700"
          onClick={() => handlePopup({ title: "Book Appointment" })}
        >
          Book Appointment
        </button>

        <div className="fixed bottom-10 right-2 transform -translate-y-1/2 flex flex-col gap-2 z-50">
          <a
            href="tel:+919559165805"
            className="flex items-center justify-center bg-blue-500 text-white rounded-full w-14 h-14 hover:bg-blue-700 animate-shake"
          >
            <i className="fa fa-2x fa-phone"></i>
          </a>
          <a
            href="https://wa.me/919956465805"
            className="flex items-center justify-center bg-green-500 text-white rounded-full w-14 h-14 hover:bg-green-700"
          >
            <i className="fa fa-2x fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <footer className="bg-[#63682f] text-gray-300 py-10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="">
              <h1 className="text-white text-2xl font-bold mb-4">
                Posh And Polished.
              </h1>
              <p className="text-sm text-white">
                Welcome to Posh & Polished Unisex Salon & Makeup Academy, where
                passion meets professionalism! Founded by the visionary Deepak
                Satya & Tina Satya, our academy is built on the values of
                family, creativity, and skill development.
              </p>
            </div>

            {/* Our Links */}
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">
                Our Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">
                Our Services
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">
                Contact Us
              </h2>
              <div className="space-y-2">
                <p className="flex items-center text-white">
                  <span className="mr-2">
                    <i className="fa fa-phone"></i>
                  </span>{" "}
                  +91 9956465805, 9559165805
                </p>
                <p className="flex items-center text-white">
                  <span className="mr-2">
                    <i className="fa fa-envelope"></i>
                  </span>{" "}
                  poshnpolishedsalon@gmail.com
                </p>
                <p className="flex items-center text-white">
                  <span className="mr-2">
                    <i className="fa fa-map"></i>
                  </span>{" "}
                  B-40, Mandir Marg, opposite House of Johnson, Mahanagar
                </p>
              </div>
            </div>
          </div>

          {/* Copyright and Footer Links */}
          <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-white">
              &copy; 2024 poshandpolishedsalon. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/poshandpolishedsalonn"
                className="hover:underline text-white"
              >
                <i className="fa fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/poshandpolishedmakeupsalon"
                className="hover:underline text-white"
              >
                <i className="fa fa-instagram"></i>
              </a>
              {/* <a
                href="https://www.youtube.com/@PoshandPolished1995"
                className="hover:underline text-white"
              >
                <i className="fa fa-youtube"></i>
              </a> */}
              <a
                href="tel:+919559165805"
                className="hover:underline text-white"
              >
                <i className="fa fa-phone"></i>
              </a>
              <a
                href="mailto:poshnpolishedsalon@gmail.com"
                className="hover:underline text-white"
              >
                <i className="fa fa-envelope"></i>
              </a>
              <a
                href="https://wa.me/919956465805"
                className="hover:underline text-white"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
