import React, { useEffect, useState } from 'react';
import LightGallery from "lightgallery/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import axios from 'axios';
import { useLocation } from 'react-router-dom'

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useContext } from 'react';
import MyContext from '../context/MyContext';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const context = useContext(MyContext);
  const { first } = context;
  const { pathname } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        

        if (pathname == '/') {
          // console.log("yes")
          const response = await axios.get('https://admin.theposhandpolished.com/api/index-gallery');
          setGalleryData(response.data.gallery);
        }
        else {
          const response = await axios.get('https://admin.theposhandpolished.com/api/gallery');
          setGalleryData(response.data.gallery);
        }

      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="container mx-auto">
        {/* <h3 className="text-black text-center font-bold text-sm uppercase mb-2">Our Work</h3> */}
        <h2 className="text-[#63682F] text-center text-4xl font-extrabold mb-10">Gallery</h2>

        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} elementClassNames="container grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto" >

          {galleryData?.map((item, index) => (
            <a href={`https://admin.theposhandpolished.com/${item.image}`} key={index} className="group relative">
              <img  loading="lazy" className=" min-h-[250px] max-h-[250px] md:min-h-[450px] md:max-h-[450px] object-cover object-left-top w-full rounded-lg" src={`https://admin.theposhandpolished.com/${item.image}`} alt={item?.title} />
            </a>
          ))}

        </LightGallery>

      </div>
    </section>
  );
};

export default Gallery;
