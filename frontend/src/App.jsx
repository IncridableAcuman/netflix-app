import {Route,Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import MyList from './pages/MyList'
import MovieDetails from './pages/MovieDetails'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/landing' element={<Landing/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      <Route>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/tv' element={<TVShows/>} />
        <Route path='/list' element={<MyList/>} />
        <Route path='/movie/:id' element={<MovieDetails/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App