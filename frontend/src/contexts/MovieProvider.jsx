import { useState } from "react"
import MovieContext from "./movieContext"
import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'
const MovieProvider = ({children}) => {
  const [movieData,setMovieData]=useState([]);
  const [topRatedMovie,setTopRatedMovie]=useState([]);
  const [video,setVideo]=useState([]);

  const popularMovies = async ()=>{
    try {
      const {data}=await axiosInstance.get("/movie/popular");
      setMovieData(data);
    } catch (error) {
      setMovieData([]);
      toast.error(error?.response?.message || error?.message || "Something went wrong!");
    }
  }
  const topRatedMovies = async ()=>{
    try {
      const {data}=await axiosInstance.get("/movie/top_rated");
      setTopRatedMovie(data);
    } catch (error) {
      setMovieData([]);
      toast.error(error?.response?.message || error?.message || "Something went wrong!"); 
    }
  }
  // watch videos
  const watchMovie = async (id)=>{
    try {
      const {data}=await axiosInstance.get(`/movie/watch/videos/${id}`);
      setVideo(data);
    } catch (error) {
      setVideo([]);
      toast.error(error?.response?.message || error?.message || "Something went wrong!");
    }
  }

  return (
    <>
    <MovieContext.Provider value={{movieData,topRatedMovie,video,popularMovies,topRatedMovies,watchMovie}}>
        {children}
    </MovieContext.Provider>
    </>
  )
}

export default MovieProvider