import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import axios from 'axios';

function Makeup() {
  const context = useContext(MyContext)
  const { handlePopup } = context
  const [services, setServices] = useState([]);

  // Fetching data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://admin.theposhandpolished.com/api/makeup');
        setServices(response.data.makeup);
      } catch (error) {
        console.error('Error fetching makeup data:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section data-aos="fade-down" className="bg-gradient-to-r from-[#f7e7e0] to-[#b7cbda] py-16 px-4">
      <div className="container mx-auto text-center">
        <h3 className="text-sm font-semibold uppercase mb-3 text-[#6B7280]">Makeup Services</h3>
        <h2 className="text-3xl font-extrabold text-[#1F2937] mb-12">Choose Your Perfect Makeup Look</h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service) => (
            <div key={service.id} className="group rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                loading="lazy" 
                className="w-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                src={`https://admin.theposhandpolished.com/${service.image}`}
                alt={service.title}
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#4B5563] group-hover:text-[#1F2937] transition-colors duration-300">{service.title}</h3>
                {/* <p className="mt-4 text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p> */}
                <button className="mt-6 w-full py-2 bg-[#63682f] text-white text-lg font-semibold rounded-full transition-all duration-300 hover:bg-[#63682f] hover:shadow-xl"  onClick={() => handlePopup({title : service.title})}>
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Makeup;
