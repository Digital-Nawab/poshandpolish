import React, { useState } from 'react'
// import Slider from '../component/Slider'
import Makeup from '../component/Makeup'
import About from '../component/About'
import Service from '../component/Service'
import Offer from '../component/Offer'
import Testimonial from '../component/Testimonial'
import Gallery from '../component/Gallery'
import Form from '../component/Form'
import { Link } from "react-router-dom";
import Layout from "../Layout"

import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

function Index() {

  return (
    <>
    <Layout>
    <div className="bg-[#63682F] text-white">
       


       {/* Slider Section */}
       {/* <Slider /> */}

       {/* Slider Section */}
       <About />

       {/* User  Section */}
       <Makeup />

       {/* Offer  Section */}
       <Offer />

       {/* User  Section */}
       <Service />

       <Gallery />

       <Form />

       <Testimonial />



     </div>
    </Layout>


      
    </>
  )
}

export default Index
