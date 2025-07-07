import { ArrowRight, Calendar, Clock } from 'lucide-react'
import AuthNavbar from '../components/AuthNavbar'
import LandingShowing from '../components/LandingShowing'
import Footer from '../components/Footer'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieContext from '../contexts/movieContext'

const Landing = () => {
  const navigate=useNavigate();
  const {movieData,popularMovies} = useContext(MovieContext);

      useEffect(()=>{
        if(localStorage.getItem("accessToken")){
          navigate("/");
        }
      },[navigate])

       useEffect(() => {
         const fetchData =  () => {
            popularMovies();
         };
         fetchData();
       }, [popularMovies]);

  return (
    <>
    <div className="w-full h-screen landing-image text-white">
      <AuthNavbar/>
      <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10">
       <div className="pt-6">
        <img src="./image.png" alt="marvel" />
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
              <button className='flex items-center gap-3 bg-pink-600 px-4 py-2.5 rounded-full shadow-md
              cursor-pointer hover:bg-rose-700 transition duration-300'>Explore Movies
              <ArrowRight size={18} />
            </button>
            </div>
        </div>
       </div>
       
      </div>
      {/* main */}
    </div>
    {/* movie data */}
    <LandingShowing/>
    {/* trailer */}
    <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-4xl h-96 flex items-center justify-center">
        {
          movieData.slice(0,1).map((item,index)=>(
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 mt-16" key={index}>
            <img src={"https://image.tmdb.org/t/p/w500"+item?.poster_path} alt={item.title} className="w-full max-w-sm rounded-lg shadow-lg" />
            <div className="">
              <h1 className='text-2xl font-bold pb-3'>{item.title}</h1>
              <p className='text-sm'>{item.overview}</p>
              <p className='text-sm pt-2'>⭐️⭐️⭐️⭐️⭐️</p>
            </div>
            </div>
          ))
        }
      </div>
    </div>
{/* footer */}
    <Footer/>
    </>
  )
}

export default Landing