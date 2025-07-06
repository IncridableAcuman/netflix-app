import { useParams } from 'react-router-dom';
import MovieContext from '../contexts/movieContext'
import { useContext, useEffect } from 'react';

const Trailer = () => {
const { id } = useParams();
const { video, watchMovie } = useContext(MovieContext);

    const fetchData = async () => {
        try {
            await watchMovie(id);
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };
 useEffect(() => {
    fetchData();
    }, []);
  return (
    <>
        <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                {
                    video.map((ite,index)=>(
                        <iframe 
                            key={index} 
                            className="w-full h-full" 
                            src={`https://www.youtube.com/embed/${ite.key}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    )).slice(0,1)
                    
                }
            </div>

        </div>
    </>
  )
}

export default Trailer