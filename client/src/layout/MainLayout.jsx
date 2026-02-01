import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import Footer from '../components/Footer'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <SubNavbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout