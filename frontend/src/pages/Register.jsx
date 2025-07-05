import { Lock, LogInIcon, Mail, User } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import authContext from '../contexts/authContext';

const Register = () => {
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  });
  const {register}=useContext(authContext);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Registrantion failed");
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      navigate("/");
    }
  },[navigate])
  return (
    <>
    <div className="flex items-center justify-center w-full h-screen bg-image">
      <div className="bg-gray-950 text-white w-full max-w-md p-8 rounded-2xl shadow-lg bg-opacity-90">
        <h1 className="text-center text-4xl font-bold mb-6">Sign Up</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 bg-gray-800 w-full p-3 rounded-lg focus-within:ring-2 ring-amber-700">
            <User size={20} />
            <input
              type="text"
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="outline-none bg-transparent w-full placeholder:text-gray-400"
            />
          </div>
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
            Sign Up Now
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-amber-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default Register