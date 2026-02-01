import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useIsAuthenticated } from '../redux/auth/authHooks'

const PublicRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
  return (
    isAuthenticated ? <Navigate to="/" replace/>: <Outlet/>
  )
}

export default PublicRoutes