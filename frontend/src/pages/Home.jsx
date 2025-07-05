  import React, { useEffect } from 'react'
  import { useNavigate } from 'react-router-dom';

  const Home = () => {
    const navigate=useNavigate();
      useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
          navigate("/landing");
        }
      },[navigate])
    return (
      <div>Home</div>
    )
  }

  export default Home