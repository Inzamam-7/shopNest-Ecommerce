import axiosInstance from "../../api/axios";

const login = async(formData) =>{
    const response = await axiosInstance.post('/auth/login', formData);
    return response.data;
}

const register = async(formData) =>{
    const response = await axiosInstance.post('/auth/register', formData);
    return response.data;
}

const getUser = async() => {
    const response = await axiosInstance.get('/auth/get-user')
    return response.data;
}

const authService = {
    login,
    register,
    getUser
}

export default authService;