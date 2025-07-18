import { useContext } from 'react';
import MovieContext from '../contexts/movieContext'
import { useNavigate } from 'react-router-dom';

const LandingShowing = () => {
const {movieData}=useContext(MovieContext);
const navigate=useNavigate();

  return (
    <>
    <div className="w-full min-h-screen bg-gray-950 text-white">
       <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10">
         <h1 className='text-xl font-semibold'>Showing Now</h1>
        <p className='text-sm text-gray-400 hover:text-gray-50 transition duration-300 cursor-pointer'>Show All</p>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {
          movieData.map((item,index)=>(
            <div className="" key={index}>
              <div className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
               onClick={()=>navigate(`/movie/${item.id}`)}>
                <img loading='lazy' src={"https://image.tmdb.org/t/p/w500"+item?.poster_path} alt={item.title} className="w-full rounded-md cursor-pointer hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          )).slice(0,8) // Display only first 8 movies
        }
       </div>
    </div>
    </>
  )
}

export default LandingShowing