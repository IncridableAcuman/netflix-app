import { useContext, useEffect } from 'react'
import MovieContext from '../contexts/movieContext'
import { Link } from 'react-router-dom';

const MoviesData = ({category}) => {
  const { getItem,getMovies,  } = useContext(MovieContext);

  useEffect(() => {
    getMovies(category);
  }, [category,getMovies]);

  return (
    <div className="flex overflow-x-auto space-x-4 px-4 py-2 scrollbar-hide">
      {
        getItem.map((item, index) => (
          <div className="flex-shrink-0 w-40" key={index}>
            <Link to={`/movie/${item.id}`}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + item?.poster_path}
                alt={item.title}
                className="w-full rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default MoviesData;
