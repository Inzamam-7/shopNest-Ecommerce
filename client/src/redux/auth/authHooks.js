import {useSelector} from 'react-redux'

export const useAuth = () => {
    return useSelector((state) => state.auth);
}

export const useIsAuthenticated = () =>{
    return useSelector((state) => state.auth.isAuthenticated);
}

export const useAuthUser = () =>{
    return useSelector((state) => state.auth.user);
}

export const useAuthStatus = () =>{
    return useSelector((state) => state.auth.status);
}

export const useAuthError = () => {
    return useSelector((state) => state.auth.error)
}

export const useAuthChecked = () => {
    return useSelector((state) => state.auth.authChecked)
}