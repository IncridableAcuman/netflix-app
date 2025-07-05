import { Lock } from 'lucide-react'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import { toast } from 'react-toastify';

const ResetPassword = () => {
   const { resetPassword } = useContext(AuthContext);
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      token:'',
      password: '',
      confirmPassword:''
   });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await resetPassword(formData);
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Reset password failed");
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
        <h1 className="text-center text-4xl font-bold mb-6">Reset Password</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
          <div className="flex items-center gap-3 bg-gray-800 w-full p-3 rounded-lg focus-within:ring-2 ring-amber-700">
            <Lock size={20} />
            <input
              type="password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="outline-none bg-transparent w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-amber-600" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-amber-700 hover:bg-amber-800 transition duration-300 py-3 rounded-lg text-white font-medium"
          >
            Update Password
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          Then go to  {' '}
          <a href="/register" className="text-amber-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default ResetPassword;