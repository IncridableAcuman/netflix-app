import React, {  useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import {Calendar, Clock } from 'lucide-react';
import Footer from '../components/Footer'
import MovieContext from '../contexts/movieContext';
import MoviesData from '../components/MoviesData';
  const Home = () => {
    const navigate=useNavigate();
      useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
          navigate("/landing");
        }
      },[navigate])

    return (
      <>
      <div className="w-full h-screen landing-image text-white pt-36 ">
        <MainNavbar/>
        {/* data section */}
        <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="">
            <h1 className='text-2xl lg:text-6xl font-extrabold py-4'>Guardians <br /> of the Galaxy</h1>
              {/* data */}
                <div className="flex items-center gap-4">
                <p>Action | Adventure | Sci-Fi</p>
                <div className="flex items-center gap-3">
            <Calendar size={18} />
            <p>2018</p>
            </div>
                <div className="flex items-center gap-3">
            <Clock size={18} />
            <p>2h 8m</p>
                  </div>
                </div>
        {/* content */} 
        <div className="pt-3 text-sm">
          <p>In a post-apocalyptic world where cities ride on wheels 
          and <br /> consume each other to survive, two people meet in London 
          and <br /> try to stop a conspiracy.</p>
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <button className='bg-white text-black flex items-center gap-3 px-5 py-2.5
                rounded shadow cursor-pointer'>
                  <img src="./play_icon.png" alt="play" className='w-6' />
                  Play
                </button>
                <button className='flex items-center gap-3 px-5 py-2.5 bg-gray-600 
                rounded shadow cursor-pointer opacity-90'>
                  <img src="./info_icon.png" alt="play" className='w-6' />
                  More Info
                </button>
              </div>
            </div>
        </div>
          </div>
       {/*  */}
        </div>
      </div>
      {/* movies */}
      <div className="w-full min-h-screen bg-gray-950 text-white">
        <h1 className='text-xl font-semibold p-4 sm:p-6 md:p-8 lg:p-10'>Popular Movies</h1>
        {/* scroll movies cards by x */}
        <MoviesData category={"popular"} />
        {/* Top rated movies */}
        <h1 className='text-xl font-semibold p-4 sm:p-6 md:p-8 lg:p-10'>Top Rated</h1>
        <MoviesData category={"top_rated"} />
        {/* scroll movies cards by x */}
          <h1 className='text-xl font-semibold p-4 sm:p-6 md:p-8 lg:p-10'>Up coming</h1>
            <MoviesData category={"upcoming"} />
            {/* Now playing */}
              <h1 className='text-xl font-semibold p-4 sm:p-6 md:p-8 lg:p-10'>Now playing</h1>
                <MoviesData category={"now_playing"} />
      </div>
      <Footer/>
      </>
    )
  }

  export default Home