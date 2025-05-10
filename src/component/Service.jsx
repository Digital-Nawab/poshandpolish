import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://admin.theposhandpolished.com/api/service"
        );
        setServices(response.data.service);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section
        className="w-full inset-0  bg-cover bg-top bg-black bg-opacity-40 lg:py-16 py-6  px-4 "
        style={{ backgroundImage: "url('/assets/images/service.webp')" }}
      >
        <div className="container mx-auto">
          <h2 className="text-[#000000] text-center text-4xl font-extrabold mb-10">
            Our Services
          </h2>
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
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="group rounded-md hover:bg-[#63682f] bg-[#f1e3da] hover:mt-0 mt-4 hover:shadow-2xl  transition-all duration-1000">
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
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="grid md:grid-cols-4 gap-8 items-center"></div>
        </div>
      </section>
    </>
  );
};

export default Service;
