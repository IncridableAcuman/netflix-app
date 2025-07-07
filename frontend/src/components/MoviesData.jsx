import { useContext, useEffect } from 'react'
import MovieContext from '../contexts/movieContext'
import { Link } from 'react-router-dom';

const MoviesData = () => {
     const { topRatedMovie,topRatedMovies } = useContext(MovieContext);
  useEffect(() => {
    const fetchData =  () => {
       topRatedMovies();
    };
    fetchData();
  }, [topRatedMovies]);

  return (
    <>
    {
        topRatedMovie.map((item,index)=>(
            <div className="" key={index}>
              <Link to={`/movie/${item.id}`}>
                <img src={"https://image.tmdb.org/t/p/w500"+item?.poster_path} alt={item.title} className="w-full rounded-md cursor-pointer hover:scale-105 transition-transform duration-300" />
              </Link>
            </div>
        ))
    }
    </>
  )
}

export default MoviesData