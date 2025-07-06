import { useState } from "react"
import MovieContext from "./movieContext"
import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'
const MovieProvider = ({children}) => {
  const [movieData,setMovieData]=useState([]);
  const [topRatedMovie,setTopRatedMovie]=useState([]);
  const [video,setVideo]=useState(null);

  const popularMovies = async ()=>{
    try {
      const {data}=await axiosInstance.get("/movie/popular");
      setMovieData(data);
    } catch (error) {
      console.log(error);
      setMovieData(null);
      toast.error(error?.response?.message || error?.message || "Something went wrong!");
    }
  }
  const topRatedMovies = async ()=>{
    try {
      const {data}=await axiosInstance.get("/movie/top_rated");
      setTopRatedMovie(data);
    } catch (error) {
      console.log(error);
      setMovieData(null);
      toast.error(error?.response?.message || error?.message || "Something went wrong!"); 
    }
  }
  // watch videos
  const watchMovie = async ()=>{
    const {data}=await axiosInstance.get("/movie/watch/video");
  }

  return (
    <>
    <MovieContext.Provider value={{movieData,topRatedMovie,popularMovies,topRatedMovies}}>
        {children}
    </MovieContext.Provider>
    </>
  )
}

export default MovieProvider