import React from 'react'

function Footer() {
  return (
    <>
      <div>
          {/* Web View Buttons */}
          <div className="  hidden md:flex fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-2 gap-2 z-50">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => alert('Call Clicked')}>Call</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" onClick={() => alert('WhatsApp Clicked')}>WhatsApp</button>
            <button className="px-4 py-2 bg-[#63682f] text-white rounded hover:bg-blue-700" onClick={() => alert('Book Appointment Clicked')}>Book Appointment</button>
          </div>

          {/* Mobile View Buttons */}
          <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 grid grid-cols-3 justify-evenly p-2 z-50">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => alert('Call Clicked')}>Call</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" onClick={() => alert('WhatsApp Clicked')}>WhatsApp</button>
            <button className="px-4 py-2 bg-[#63682f] text-white rounded hover:bg-[#63682f]" onClick={() => alert('Book Appointment Clicked')}>Book Appointment</button>
          </div>
        </div>


        <footer className="bg-[#63682f] text-gray-300 py-10">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div className="">
                <h1 className="text-white text-2xl font-bold mb-4">Posh And Polished.</h1>
                <p className="text-sm text-white">
                  Welcome to Posh & Polished Unisex Salon & Makeup Academy, where passion meets professionalism! Founded by the visionary Deepak Satya & Tina Satya, our academy is built on the values of family, creativity, and skill development.
                </p>
              </div>

              {/* Our Links */}
              <div>
                <h2 className="text-white text-lg font-semibold mb-4">Our Links</h2>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline text-white">Home</a></li>
                  <li><a href="#" className="hover:underline text-white">About Us</a></li>
                  <li><a href="#" className="hover:underline text-white">Services</a></li>
                  <li><a href="#" className="hover:underline text-white">Contact Us</a></li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h2 className="text-white text-lg font-semibold mb-4">Our Services</h2>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline text-white">FAQ</a></li>
                  <li><a href="#" className="hover:underline text-white">Support</a></li>
                  <li><a href="#" className="hover:underline text-white">Privacy</a></li>
                  <li><a href="#" className="hover:underline text-white">Terms & Conditions</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
                <div className="space-y-2">
                  <p className="flex items-center text-white">
                    <span className="mr-2">📞</span> 9559165805
                  </p>
                  <p className="flex items-center text-white">
                    <span className="mr-2">📧</span> poshnpolishedsalon@gmail.com
                  </p>
                  <p className="flex items-center text-white">
                    <span className="mr-2">📍</span> B-40, Mandir Marg, opposite House of Johnson, Mahanagar
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright and Footer Links */}
            <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between">
              <p className="text-sm text-white">&copy; 2024 poshandpolishedsalon. All rights reserved.</p>
              {/*  <div className="flex space-x-4 text-sm mt-4 md:mt-0">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms & Conditions</a>
              </div> */}
              <div className="flex space-x-4 text-sm mt-4 md:mt-0">
                <a href="https://www.facebook.com/poshandpolishedsalonn" className="hover:underline text-white">
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/poshandpolishedmakeupsalon" className="hover:underline text-white">
                  <i className="fa fa-instagram"></i>
                </a>
                {/*  <a href="https://www.facebook.com/poshandpolishedsalonn" className="hover:underline text-white">
                <i className="fa fa-twitter"></i>
              </a> */}
                <a href="https://www.youtube.com/@PoshandPolished1995" className="hover:underline text-white">
                  <i className="fa fa-youtube"></i>
                </a>
                <a href="tel:9559165805" className="hover:underline text-white">
                  <i className="fa fa-phone"></i>
                </a>
                <a href="mailto:poshnpolishedsalon@gmail.com" className="hover:underline text-white">
                  <i className="fa fa-envelope"></i>
                </a>
                <a href="https://wa.me/919559165805" className="hover:underline text-white">
                  <i className="fa fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
    </>
  )
}

export default Footer
