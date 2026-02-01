import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import SubNavbar from './components/SubNavbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Featured from './components/Featured'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './redux/auth/authThunks'
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className='bg-gray-200 min-h-screen w-full'>
      {/* <Navbar/> 
       <SubNavbar/> 
      <Featured/> */}

      {/* <Signup/> */}
      {/* <Login/> */}

      {/* <Footer/> */}
      <AppRoutes />
    </div>
  )
}

export default App
