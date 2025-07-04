import { useNavigate } from 'react-router-dom'
const AuthNavbar = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10">
        <img src="./logo.png" alt="logo" className='w-34' />
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <button
             className='bg-red-600 px-4 sm:px-6 md:px-8 lg:px-10 py-2 rounded-full shadow-md
              cursor-pointer hover:bg-rose-700 transition duration-300'
              onClick={()=>navigate("/login")}>Login</button>
        </div>
    </div>
    </>
  )
}

export default AuthNavbar