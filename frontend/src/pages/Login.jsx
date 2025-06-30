import { Lock, LogInIcon, Mail } from 'lucide-react';

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-image">
      <div className="bg-gray-950 text-white w-full max-w-md p-8 rounded-2xl shadow-lg bg-opacity-90">
        <h1 className="text-center text-4xl font-bold mb-6">Sign In</h1>
        <form className="space-y-5">
          <div className="flex items-center gap-3 bg-gray-800 w-full p-3 rounded-lg focus-within:ring-2 ring-amber-700">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email"
              className="outline-none bg-transparent w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-800 w-full p-3 rounded-lg focus-within:ring-2 ring-amber-700">
            <Lock size={20} />
            <input
              type="password"
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
            Sign In
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
