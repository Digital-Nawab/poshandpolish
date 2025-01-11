import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Offer from './pages/Offers'
import './App.css'
import MyState from './context/MyState'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ToastContainer } from 'react-toastify'


function App() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      <BrowserRouter>
        <MyState>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="about" element={<About />} />
            {/* <Route path="services" element={<Services />} /> */}
            <Route path="service/:slug_url" element={<Services />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="offer" element={<Offer />} />
          </Routes>
        </MyState>
        <ToastContainer  />
      </BrowserRouter>
    </>
  )
}

export default App
