import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth, useAuthChecked, useIsAuthenticated } from '../redux/auth/authHooks'


const ProtectedRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
    const authChecked = useAuthChecked();

    if (!authChecked) {
        return <p>Loading</p>
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoutes