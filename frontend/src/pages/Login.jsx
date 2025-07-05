import { Lock, LogInIcon, Mail } from 'lucide-react';
import  authContext  from '../contexts/authContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {login}=useContext(authContext);
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    email:'',
    password:''
  });
  const handleChange = (e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await login(formData);
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Login failed");
    }
  }
    useEffect(()=>{
      if(localStorage.getItem("accessToken")){
        navigate("/");
      }
    },[navigate])
  return (
    <div className="flex items-center justify-center w-full h-screen bg-image">
      <div className="bg-gray-950 text-white w-full max-w-md p-8 rounded-2xl shadow-lg bg-opacity-90">
        <h1 className="text-center text-4xl font-bold mb-6">Sign In</h1>
        <form className="space-y-5" onSubmit={handleSubmit} >
          <div className="flex items-center gap-3 bg-gray-800 w-full p-3 rounded-lg focus-within:ring-2 ring-amber-700">
            <Mail size={20} />
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="outline-none bg-transparent w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-800 w-full p-3 rounded-lg focus-within:ring-2 ring-amber-700">
            <Lock size={20} />
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="outline-none bg-transparent w-full placeholder:text-gray-400"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-amber-600" />
              Remember me
            </label>
            <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-amber-700 hover:bg-amber-800 transition duration-300 py-3 rounded-lg text-white font-medium"
          >
            <LogInIcon size={20} />
            Sign In Now
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-amber-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
