import React, { useState, useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Makeup() {
  const context = useContext(MyContext);
  const { handlePopup } = context;
  const [services, setServices] = useState([]);

  // Fetching data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://admin.theposhandpolished.com/api/makeup"
        );
        setServices(response.data.makeup);
      } catch (error) {
        console.error("Error fetching makeup data:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      data-aos="fade-down"
      className="bg-gradient-to-r from-[#f7e7e0] to-[#b7cbda] lg:py-16 py-6  px-4"
    >
      <div className="container mx-auto text-center">
        <h3 className="text-2xl  lg:text-sm font-semibold uppercase mb-3 text-black lg:text-[#6B7280]">
          Makeup Services
        </h3>
        <h2 className="lg:block hidden text-3xl font-extrabold text-[#1F2937] mb-12">
          Choose Your Perfect Makeup Look
        </h2>

        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            centeredSlidesBounds={true}
            navigation={false}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {services.map((service , index) => (
              <SwiperSlide key={index}>
                <div
                  key={service.id}
                  className="group rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    loading="lazy"
                    className="w-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                    src={`https://admin.theposhandpolished.com/${service.image}`}
                    alt={service.title}
                  />
                  <div className="p-3 lg:p-6">
                    <h3 className="text-2xl font-semibold text-[#0a0b0c] group-hover:text-[#1F2937] transition-colors duration-300">
                      {service.title}
                    </h3>
                    {/* <p className="mt-4 text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p> */}
                    <button
                      className="mt-3 lg:mt-6 lg:w-full px-4 py-2 bg-[#63682f] text-white lg:text-lg text-sm font-semibold rounded-2xl lg:rounded-full transition-all duration-300 hover:bg-[#63682f] hover:shadow-xl"
                      onClick={() => handlePopup({ title: service.title })}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"></div>
      </div>
    </section>
  );
}

export default Makeup;
