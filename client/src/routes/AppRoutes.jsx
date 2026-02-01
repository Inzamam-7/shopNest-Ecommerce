import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AuthLayout from '../layout/AuthLayout'
import PublicRoutes from './PublicRoutes'
import ProtectedRoutes from './ProtectedRoutes'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<PublicRoutes />}>
                <Route element={<AuthLayout />}>
                    <Route path='/register' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Route>
            </Route>


            //ProtectedRoutes
            <Route element={<ProtectedRoutes />}>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />

                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes