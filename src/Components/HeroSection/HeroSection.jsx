import React from 'react'
import './HeroSection.css'
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from '../ui/hero-highlight';
import { Link } from 'react-router-dom'
import { BackgroundLines } from '../ui/background-lines'
import heroImage from '../../assets/heroImage-removebg-preview.png'
import { Cover } from '../ui/cover';
export default function HeroSection() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
<div className='hero-section'>
<div className='w-52 text-white absolute right-16 top-6 flex'>
  <button className='p-2 bg-customBlue w-44 mt-7 h-10 rounded-md m-2 hover:bg-transparent hover:border-solid hover:border-customBlue hover:border-2'><Link to='/signin'>Sign In</Link></button>
  <button className='p-2 bg-transparent w-52 h-10 mt-7 border-customBlue border-solid border-2 rounded-md hover:bg-customBlue'><Link to='/signup'>Sign Up</Link></button>
</div>
<div className="hero-img">
  <img src={heroImage} alt="Tilted Image"/>
</div>

<div className="hero-content">
<h1>

    
    Elevate Player Performance with Cutting-Edge Analysis
   
    </h1>
    <p>Welcome to our Football Player Performance Analyzer! Our web-based platform utilizes computer vision technology to analyze player performance during soccer matches. Coaches and analysts can track players' passes, receives, and dribbles, aiding in data-driven player selection and performance evaluation.</p>
</div>
      

</div>
</BackgroundLines>
  )
}
