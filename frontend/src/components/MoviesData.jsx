import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

const MoviesData = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/movie/categories/${category}`);
        setMovies(data);
      } catch (error) {
        setMovies([]);
        console.error(error?.response?.message || error?.message || "Something went wrong!");
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="flex overflow-x-auto space-x-4 px-4 py-2 scrollbar-hide">
      {movies.map((item, index) => (
        <div className="flex-shrink-0 w-40" key={index}>
          <Link to={`/movie/${item.id}`}>
            <img
              loading='lazy'
              src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
              alt={item.title}
              className="w-full rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesData;
