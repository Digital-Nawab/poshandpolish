import React, { useEffect, useState } from "react";
import LightGallery from "lightgallery/react";
import Layout from "../Layout";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Form from "../component/Form";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useContext } from "react";
import MyContext from "../context/MyContext";

function Services() {
  const url = useParams();
  console.log(url.slug_url);
  const context = useContext(MyContext);
  const { handlePopup } = context;

  const [aboutData, setAboutData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [subServiceData, setSubServiceData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://admin.theposhandpolished.com/api/service/${url.slug_url}`
        );
        setAboutData(response.data.about);
        setOfferData(response.data.offer);
        setServiceData(response.data.service);
        setSubServiceData(response.data.subService);
        setGalleryData(response.data.gallery);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      <Layout>
        {/* About Section */}
        {aboutData.map((item) => (
          <section
            key={item.id}
            data-aos="fade-down"
            className="bg-[#f7f3e8] text-white about-section lg:py-16 py-6  px-4"
          >
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-56 items-center">
                {/* Image Section */}
                <div>
                  <img
                    loading="lazy"
                    className="w-full"
                    src={`https://admin.theposhandpolished.com/${item.image}`}
                    alt="Posh & Polished"
                  />
                </div>

                {/* Text Section */}
                <div>
                  <h2 className="text-green text-2xl md:text-4xl font-extrabold mb-6">
                    {item.heading}
                  </h2>
                  <p className="text-black mb-6">
                    <div
                      className="text-black mb-6"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section
          data-aos="fade-down"
          className="bg-white text-white lg:py-16 py-6  px-4"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {serviceData.title}
              </h2>
              {/* <p className="text-gray-600">Experience the art of transformation with our expert makeup services.</p> */}
            </div>
          </div>
          <div className="container mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={false}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {subServiceData.map((service) => (
                <SwiperSlide key={service.id}>
                  <div className="group rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <img
                      className="w-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      src={`https://admin.theposhandpolished.com/${service.image}`}
                      alt={service.title}
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#4B5563] group-hover:text-[#1F2937] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <button
                        className="mt-6 w-full py-2 bg-[#63682f] text-white text-lg font-semibold rounded-full transition-all duration-300 hover:bg-[#63682f] hover:shadow-xl"
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
        </section>

        {/* Offer Section */}
        <section
          data-aos="fade-down"
          className="bg-[#f7f3e8] text-white lg:py-16 py-6  px-4"
        >
          <div className="container mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={false}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {offerData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className={`shadow hover:shadow-lg ${
                      item.id === 1 ? "hover:animate-pulse" : ""
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={`https://admin.theposhandpolished.com/${item.image}`}
                      alt={item.title}
                    />
                    <button
                      className="w-full py-2 bg-[#63682f] text-white text-lg font-semibold transition-all duration-300 hover:bg-[#63682f] hover:shadow-xl"
                      onClick={() => handlePopup({ title: item.title })}
                    >
                      Book Appointment
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <Form />

        {/* Gallery Section */}
        <section className="relative isolate overflow-hidden bg-white lg:py-16 py-6  px-4">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          <div className="container mx-auto">
            {/* <h3 className="text-black text-center font-bold text-sm uppercase mb-2">Our Work</h3> */}
            <h2 className="text-[#63682F] text-center text-4xl font-extrabold mb-10">
              Gallery
            </h2>

            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              elementClassNames="container grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto"
            >
              {galleryData?.map((item, index) => (
                <a
                  href={`https://admin.theposhandpolished.com/${item.image}`}
                  key={index}
                  className="group relative"
                >
                  <img
                    loading="lazy"
                    className=" min-h-[250px] max-h-[250px] md:min-h-[450px] md:max-h-[450px] object-cover object-left-top w-full rounded-lg"
                    src={`https://admin.theposhandpolished.com/${item.image}`}
                    alt={item?.title}
                  />
                </a>
              ))}
            </LightGallery>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Services;
