import React from 'react'
import { useForm } from "react-hook-form"
import Button from './Button';
import { useDispatch } from 'react-redux';
import {loginUser} from '../redux/auth/authThunks'
const LoginForm = () => {
    const dispatch = useDispatch();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    function onSubmit(data) {
        dispatch(loginUser(data));
        console.table(data);
    }

    return (
        <div className='flex flex-col w-md shadow-gray-300 shadow-2xl p-4 rounded-md items-center'>
            <div className='mb-4'>
                <h1 className='text-2xl font-semibold'>Login</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
                    <div>
                        <label className='text-xl mb-2'>Email</label>
                        <input
                            type='email'
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9./+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })
                            }
                            placeholder='Email'
                            className='border-2 rounded-md mt-1 p-2 w-full mb-2'
                        />
                        {errors.email && <p className='text-xl my-1 text-red-600 underline'>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className='text-xl mb-2'>Password</label>
                        <input type='password' 
                        {...register("password", 
                        { 
                            required: "password is required", 
                            minLength: {
                                value:6,
                                message:"password must be at least 6 characters"
                            } })}
                        placeholder='password' 
                        className='border-2 rounded-md mt-1 p-2 w-full mb-2' 
                        />
                        {errors.password && <p className='text-xl my-1 text-red-600 underline'>{errors.password.message}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1 text-xl'>Role</label>
                        <select type {...register("role", { required: "role is required" })} className="p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-blue-500 transition">
                            <option value="" className='border-b'>Select role</option>
                            <option value="user" className='border-b'>User</option>
                            <option value="seller">Seller</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <p className='text-xl my-1 text-red-600 underline'>{errors.role.message}</p>}
                    </div>

                    <div><Button bgcolor="bg-blue-600 text-white w-full" text="Login"/></div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm