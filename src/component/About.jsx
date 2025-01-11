import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function About() {
  const [aboutData, setAboutData] = useState([]) // Changed from {} to []
  //get current Url 
  const { pathname } = useLocation()
  // console.log(pathname)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admin.theposhandpolished.com/api/about')
        // setAboutData(response.data.about)
        // console.log(response.data.about)
        if (pathname == '/') {
          // console.log("yes")
          const index = response.data.about.filter(data => data.is_index == 'Y')
          setAboutData(index)
        }
        else {
          const about = response.data.about.filter(data => data.is_index == 'N')
          setAboutData(about)
        }
      } catch (error) {
        console.error('Error fetching about data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>

      {aboutData.map((item, index) => (
        <section key={item.id} data-aos="fade-down" className={`bg-[#f7f3e8] text-white about-section py-16 px-4 ${index % 2 === 0 ? 'bg-[#f7f3e8]' : 'bg-[#d6e7f7]'}`}>
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-56 items-center">
              {/* Image Section */}
              <div className={index % 2 === 0 ? 'order-last' : ''}>
                <img loading="lazy" className='w-full' src={`https://admin.theposhandpolished.com/${item.image}`} alt="Posh & Polished" />
              </div>

              {/* Text Section */}
              <div className={index % 2 === 0 ? 'order-first' : ''}>
                <h2 className="text-green text-2xl md:text-4xl font-extrabold mb-6">
                  {item.heading}
                </h2>
                <p className="text-black mb-6">
                  <div className="text-black mb-6" dangerouslySetInnerHTML={{ __html: item.description }} />
                </p>

              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default About
