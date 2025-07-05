import { Mail } from 'lucide-react'
import AuthContext from '../contexts/authContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
  const {forgotPassword}=useContext(AuthContext);
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    email:''
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await forgotPassword(formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Forgot password failed");
    }
  }
  return (
    <>
     <div className="flex items-center justify-center w-full h-screen bg-image">
      <div className="bg-gray-950 text-white w-full max-w-md p-8 rounded-2xl shadow-lg bg-opacity-90">
        <h1 className="text-center text-4xl font-bold mb-6">Forgot Password</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
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

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-amber-600" />
              Remember me
            </label>
           <p>Need Help?</p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-amber-700 hover:bg-amber-800 transition duration-300 py-3 rounded-lg text-white font-medium"
          >
            Forgot Password
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

export default ForgotPassword