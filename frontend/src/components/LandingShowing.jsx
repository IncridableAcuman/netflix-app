import React from 'react'

const LandingShowing = () => {
  return (
    <>
    <div className="w-full min-h-screen bg-gray-950 text-white">
       <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10">
         <h1 className='text-xl font-semibold'>Showing Now</h1>
        <p className='text-sm text-gray-400 hover:text-gray-50 transition duration-300 cursor-pointer'>Show All</p>
       </div>
    </div>
    </>
  )
}

export default LandingShowing