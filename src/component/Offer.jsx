import React, { useEffect, useState, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import MyContext from '../context/MyContext';

const Offer = () => {
  const [offerData, setOfferData] = useState([]);
  const context = useContext(MyContext);
  const { handlePopup } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admin.theposhandpolished.com/api/offer');
        setOfferData(response.data.offer);
      } catch (error) {
        console.error('Error fetching offer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section data-aos="fade-down" className="bg-[#f7f3e8] text-white lg:py-16 py-6  px-4">
        <div className="container mx-auto">
          <Swiper 
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            centeredSlidesBounds={true}
            navigation={false}
            loop= {true}
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
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {offerData.map((item) => (
              <SwiperSlide key={item.id} className="flex items-center justify-center">
                <div className={`shadow hover:shadow-lg ${item.id === 1 ? 'hover:animate-pulse' : ''}`} >
                <img loading="lazy" src={`https://admin.theposhandpolished.com/${item.image}`} alt={item.title} />
                  <button className="w-full py-2 bg-[#63682f] text-white text-lg font-semibold transition-all duration-300 hover:bg-[#63682f] hover:shadow-xl"
                   onClick={() => handlePopup({title : item.title})} >
                    Book Appointment
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}

export default Offer
