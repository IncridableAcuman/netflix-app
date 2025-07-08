import { Search, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../contexts/authContext";
import { toast } from "react-toastify";

const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {logout}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully");
    setMenuOpen(false); // Close the mobile menu on logout
    navigate("/landing"); // Redirect to landing page after logout
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Left - Logo */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Netflix Clone Logo"
            className="w-24 lg:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-gray-400 transition duration-300">Home</Link>
          <Link to="/movies" className="hover:text-gray-400 transition duration-300">Movies</Link>
          <Link to="/tv" className="hover:text-gray-400 transition duration-300">TV Shows</Link>
          <Link to="/list" className="hover:text-gray-400 transition duration-300">My List</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Search
            size={20}
            className="cursor-pointer hover:text-gray-400 transition duration-300"
            title="Search"
          />
          <img
            src="/profile_img.png"
            alt="User Profile"
            className="w-8 h-8 rounded-md cursor-pointer hover:ring-2 ring-white transition duration-300"
          />
          <LogOut size={20} onClick={handleLogout} />
          {/* Hamburger menu - Mobile */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start bg-gray-800 px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-400 transition"
          >
            Home
          </Link>
          <Link
            to="/movies"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-400 transition"
          >
            Movies
          </Link>
          <Link
            to="/tv"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-400 transition"
          >
            TV Shows
          </Link>
          <Link
            to="/list"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-400 transition"
          >
            My List
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
