import { Search } from "lucide-react"

const MainNavbar = () => {
  return (
    <>
    <div className="fixed top-0 left-0 bg-gray-900 text-white w-full flex items-center justify-between py-6 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* left */}
       <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
         <img src="./logo.png" alt="logo" className="w-24 lg:w-32" />
         <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <a href="/" className='hover:text-gray-400 transition duration-300'>Home</a>
            <a href="/movies" className='hover:text-gray-400 transition duration-300'>Movies</a>
            <a href="/tv" className='hover:text-gray-400 transition duration-300'>TV Shows</a>
            <a href="/list" className='hover:text-gray-400 transition duration-300'>My List</a>
         </nav>
       </div>
       {/* right */}
       <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <Search size={20} className="cursor-pointer" />
        <img src="./profile_img.png" alt="profile" className="w-8 rounded-sm cursor-pointer" />
       </div>
    </div>
    </>
  )
}

export default MainNavbar