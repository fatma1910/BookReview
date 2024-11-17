import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div>
         <div className=" w-full bg-center bg-cover h-screen" style={{backgroundImage: "url('/hero.webp')"}}>
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-white lg:text-4xl">Write your  <span className="text-teal-800">Reviews</span> </h1>
                <Link href='/books'>
                <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Browse a book</button>
                </Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Hero