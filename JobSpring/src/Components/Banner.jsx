import React, { useState } from 'react'
import {FiMapPin, FiSearch} from 'react-icons/fi'

const Banner = ({query,handleInputChange}) => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-6 md:py-20 py-24 bg-gradient-to-r from-purple-300 via-pink-300 to-red-400'>
      <h1 className='text-4xl text-black font-bold mb-3'>Spring into your dream job with  
        <span className='text-[#1a3b9c]'> JobSpring!! </span> today </h1>
      <p className='text-lg text-shadow-white mb-8'>Explore thousands of opportunities in computer, engineering, and tech sectors! </p>

      <form>
        <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
            <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-800 focus-within:ring-2 focus-within:ring-inset
              md:w-1/2 w-full'>
                <input type="text" name='title' id='title' placeholder='what position are you looking for ?' 
                onChange={handleInputChange} value={query} className='block flex-1 border-0 bg-transparent
                py-1.5 pl-8 text-gray-900 placeholder:text-gray-800 focus:right-0 sm:text-sm sm:leading-6' />
                <FiSearch className='absolute mt-2.5 ml-2 text-gray-800'/>
            </div>

        </div>
      </form>
    </div>
  )
}

export default Banner
