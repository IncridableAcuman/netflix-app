import { useState } from "react"
import { CreateContext } from "./CreateContext";
import { toast } from 'react-toastify'
import axiosInstance from "../api/axiosInstance";
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);

    const register=async (username,email,password)=>{
        try {
          const {data}=await axiosInstance.post("/auth/register",{username,email,password});
          setUser(data);
          localStorage.setItem("accessToken",data.accessToken);
          toast.success("Successfully");
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
        }
    }

    const login=async (email,password)=>{
        try {
          const {data}=await axiosInstance.post("/auth/login",{email,password});
          setUser(data);
          localStorage.setItem("accessToken",data.accessToken);
          toast.success("Successfully");
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
        }
    }
    const logout= async()=>{
        try {
          await axiosInstance.post("/auth/logout");
          setUser(null);
          localStorage.removeItem("accessToken");
          toast.success("Successfully");
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
        }
    }

    const forgotPassword= async(email)=>{
      try {
        const {data}=await axiosInstance.post("/auth/forgot-password",{email});
        toast.success(data.message || "Sent to email");
      } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
      }
    }
    const resetPassword=async (token,password)=>{
      try {
        const {data}=await axiosInstance.put("/auth/reset-password",{token,password});
        toast.success(data.message || "Updated");
      } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
      }
    }

  return (
    <>
    <CreateContext.Provider value={{user,register,login,logout,forgotPassword,resetPassword}}>
        {children}
    </CreateContext.Provider>
    </>
  )
}

export default  AuthProvider