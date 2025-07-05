import { useState } from "react"
import { toast } from 'react-toastify'
import axiosInstance from "../api/axiosInstance";
import AuthContext from "./authContext";
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const register=async (formData)=>{
        try {
          const {data}=await axiosInstance.post("/auth/register",formData);
          setUser(data);
          localStorage.setItem("accessToken",data.accessToken);
          toast.success("Successfully");
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
        }
    }

    const login=async (formData)=>{
        try {
          const {data}=await axiosInstance.post("/auth/login",formData);
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

    const forgotPassword= async(formData)=>{
      try {
        const {data}=await axiosInstance.post("/auth/forgot-password",formData);
        toast.success(data.message || "Sent to email");
      } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
      }
    }
    const resetPassword=async (formData)=>{
      try {
        const {data}=await axiosInstance.put("/auth/reset-password",formData);
        toast.success(data.message || "Updated");
      } catch (error) {
          console.log(error);
          toast.error(error?.response?.message || error.message || "Request failed");
      }
    }

  return (
    <>
    <AuthContext.Provider value={{user,register,login,logout,forgotPassword,resetPassword}}>
        {children}
    </AuthContext.Provider>
    </>
  )
}

export default  AuthProvider