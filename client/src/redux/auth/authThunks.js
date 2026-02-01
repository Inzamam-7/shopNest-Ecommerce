import {createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

export const loginUser = createAsyncThunk(
    'auth/login', 
    async(formData, {rejectWithValue}) =>{
        try{
            const response = await authService.login(formData);  
            console.log(response.data.user);
                 
            return response.data.user;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }

})


export const registerUser = createAsyncThunk(
    'auth/register',
    async(formData, {rejectWithValue}) =>{
        try{
            const response = await authService.register(formData);
            return response.data.user;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            )
        }
    }
)

export const getUser = createAsyncThunk(
    'auth/getuser',
    async(_, {rejectWithValue}) =>{
        try{
            const response = await authService.getUser();
            console.log(response.data,"response");
            
            return response.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || 'Fetching user failed'
            )
        }
    }
)