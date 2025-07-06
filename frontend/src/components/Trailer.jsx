import React, { useContext, useEffect } from 'react'
import MovieContext from '../contexts/movieContext'

const Trailer = () => {
    const {movieData,popularMovies}=useContext(MovieContext);

    useEffect(()=>{
        popularMovies();
    }, [popularMovies]);

  return (
    <>
    <div className="flex items-center justify-center bg-gray-900 text-white">
        <h1 className='text-2xl font-bold'>Trailer</h1>
        {
            movieData.map((item, index) => (
                <div key={index} className="p-4">
                    <iframe 
                        width="560" 
                        height="315" 
                        src={`https://www.youtube.com/embed/${item.}`} 
                        title={item.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            )).slice(0, 1) // Display only the first trailer
            }
    </div>
    </>
  )
}

export default Trailer