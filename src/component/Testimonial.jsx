import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Optional: for pagination styling
import 'swiper/css/navigation'; // Optional: for navigation styling
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const testimonials = [
  {
    id: 1,
    name: 'Smita Rastogi',
    role: 'CEO of Workcation',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'I was handled by Ms Renu. She was experienced lady who gave me massage like a butter. Her hand strokes were very smooth and relaxing. Staff was very cordial. Over all a great experience.',
  },
  {
    id: 2,
    name: 'Vinayak Gupta',
    role: 'CTO of TechCorp',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'Great salon with skilled professionals! The staff is friendly, the ambiance is relaxing, and the services are top-notch. Highly recommend for anyone looking for quality care and a great experience!',
  },
  {
    id: 3,
    name: 'Deepti Mishra',
    role: 'Marketing Head of Trendy Ltd.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'I absolutely loved my hair and makeup and your incredibly calm and warm presence made all of my dress/veil changes seem so easy. You gave me an amazing look which was quite natural and You give positive vibes and make me more comfortable.',
  },
  {
    id: 4,
    name: 'Sangam Yadav',
    role: 'Marketing Head of Trendy Ltd.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'I Recently got my engagement and bridal makeup done from Anamika Pandey and she did an absolutely fab job with my makeup. Everyone still compliments me on the makeup, it was very natural and subtle.',
  },
  {
    id: 5,
    name: 'Sarojni Yadav',
    role: 'Marketing Head of Trendy Ltd.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'My experience with Posh & polished is amazing and and work of Mr.Dilshad is outstanding I would always recommend him for the hair treatment',
  },
  {
    id: 6,
    name: 'Tejaswini Singh',
    role: 'Marketing Head of Trendy Ltd.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    text: 'Excellent service by Renu ji!!Absolutely satisfied with her facial service, super relaxing session, highly recommend posh & polished',
  },
];

const Testimonial = () => {
  return (
    <section className="bg-gradient-to-r from-[#fff6f6] to-[#e0f2ff] py-16 px-4">
      <div className="container mx-auto">
       {/*  <h3 className="text-black text-center font-bold text-sm uppercase mb-2">
          Testimonial
        </h3> */}
        <h2 className="text-[#6B7280] text-center text-4xl font-extrabold">
          Clients Say
        </h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          loop
          /* autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }} */
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <figure className="mt-10 max-w-3xl mx-auto">
              <figcaption className="mt-4">
                  <div className="flex items-center justify-center space-x-3 mb-3 text-base">
                    <div className="font-semibold text-2xl text-[#63682F]"> {testimonial.name}</div>
                  </div>
                </figcaption>
                <blockquote className="text-center  text-black">
                  <p>{testimonial.text}</p>
                </blockquote>
                
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonial
