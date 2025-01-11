import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admin.theposhandpolished.com/api/slider');
        setSliderData(response.data.slider);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="bg-[#f7f3e8] text-white ">
        <div className="w-100 mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            loop
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {sliderData.map((item) => (
              <SwiperSlide key={item.id} aria-label={`Slide ${item.id}`}>
                <div
                  className={`flex flex-col items-center justify-center text-white text-2xl ${item.bgColor}`}
                >
                  <img loading="lazy" className='w-full' src={`https://admin.theposhandpolished.com/${window.innerWidth > 768 ? item.slider_image : item.mobile_image}`} alt={`${item.alt_text}`}/>
                
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slider;
