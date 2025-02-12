import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admin.theposhandpolished.com/api/service');
        setServices(response.data.service);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-full inset-0  bg-cover bg-top bg-black bg-opacity-40 py-16 px-4 " 
        style={{ backgroundImage: "url('/assets/images/service.webp')" }}>
        <div className="container mx-auto">
          <h2 className="text-[#63682f] text-center text-4xl font-extrabold mb-10">
            Our Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8 items-center">
            {services.map((service) => (
              <div
                key={service.id}
                className="group rounded-md hover:bg-[#63682f] bg-[#f1e3da] hover:mt-0 mt-4 hover:shadow-2xl  transition-all duration-1000"
              >
                <img
                  className="w-full"
                  src={`https://admin.theposhandpolished.com/${service.image}`}
                  alt={service.title}
                  loading="lazy" // Lazy load images
                />
                <h2 className="text-2xl font-extrabold text-center mt-3 group-hover:text-white text-[#63682f] transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="px-6 py-4 group-hover:text-gray-200 text-black transition-colors duration-300">
                  {service.description.substring(0, 100)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Service
