import axios from 'axios';
import { getToken, removeToken } from '../utils/tokenUtils';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})

//it is useful when we want to attach token to every request automatically since we are using cookies for auth we can comment it out
// axiosInstance.interceptors.request.use(
//     (config) =>{
//         const token = getToken();
//         if(token){
//             config.headers['Authorization'] = `Bearer ${token}`
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// )

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) =>{
//         if(error.response && error.response.status === 401){
//             removeToken();
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// )

export default axiosInstance;