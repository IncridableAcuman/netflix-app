import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieContext from '../contexts/movieContext';
import { Clock } from 'lucide-react';
import Footer from '../components/Footer';

const MovieDetails = () => {
  const { id } = useParams();
  const { movieData, popularMovies } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await popularMovies();
    };
    fetchData();
  }, [popularMovies]);

  return (
    <>
      <div className="bg-gray-950 text-white min-h-screen px-6 py-10">
        {
          movieData.map((item, index) => (
            item.id == id && (
              <div key={index} className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 mt-16">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                  alt={item.title}
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />

                <div className="flex-1">
                  <p className="text-sm uppercase text-rose-500 font-semibold mb-2">English</p>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">{item.title}</h1>

                  <p className="text-gray-300 mb-6 max-w-2xl">{item.overview}</p>

                  <div className="flex items-center gap-3 text-gray-400 mb-4">
                    <Clock className="w-5 h-5" />
                    <span>{item.release_date}</span>
                  </div>

                  <div className="text-sm text-gray-400 mb-4">
                    <span className="px-3 py-1 bg-gray-800 rounded-full mr-2">Crime</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full mr-2">Thriller</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full mr-2">Action</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full">2025</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="bg-gray-800 text-white rounded-md px-5 py-2.5 hover:bg-gray-700 transition duration-300" onClick={() => navigate(`/trailer/${item.id}`)}>
                      Watch Trailer
                    </button>
                    <button className="bg-rose-600 text-white rounded-md px-5 py-2.5 hover:bg-rose-700 transition duration-300">
                      Buy Tickets
                    </button>
                    <button className="bg-transparent border border-gray-600 text-white rounded-md px-4 py-2.5 hover:bg-gray-800 transition duration-300">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        }
      </div>
      <div className="bg-gray-900 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          movieData.map((item, index) => (
            <div key={index} onClick={() => navigate(`/movie/${item.id}`)} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                alt={item.title}
                className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </div>
          )).slice(0, 4) // Display only 4 movies
        }
      </div>
      </div>
      {/* footer */}
      <div className="pt-12 bg-gray-900 text-white">
      <Footer/>        
      </div>
    </>
  );
};

export default MovieDetails;
