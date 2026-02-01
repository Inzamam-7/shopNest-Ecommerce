import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
const Footer = () => {
    return (
        <div className='p-10 bg-slate-700 text-white'>
            <div className='flex gap-4 justify-around'>
                <div className=' text-white'>
                    <h1 className='font-semibold'>ShopNest</h1>
                    <p className='text-sm'>Contact Us</p>
                    <p className='text-sm'>8541887247</p>
                    <p className='text-sm'>wait4inzamam@gmail.com</p>
                </div>
                <div>
                    <ul>
                        <li className='hover:underline hover:cursor-pointer'>Shop</li>
                        <li className='hover:underline hover:cursor-pointer'>Tops</li>
                        <li className='hover:underline hover:cursor-pointer'>ButtomWear</li>
                        <li className='hover:underline hover:cursor-pointer'>Blog</li>
                        <li className='hover:underline hover:cursor-pointer'>About us</li>
                        <li className='hover:underline hover:cursor-pointer'>Contact</li>
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <ul>
                        <li className='hover:cursor-pointer'>Company</li>
                        <li className='hover:cursor-pointer'>privacy policy</li>
                        <li className='hover:cursor-pointer'>terms and conditions</li>
                        <li className='hover:cursor-pointer'>security</li>
                    </ul>

                </div>
                <div className='flex flex-col'>
                    Newsletter
                    be the first to know about new arrivals,
                    <div className='flex items-center mt-2 p-2 gap-2 border-2 justify-between'>
                        <input type='email' placeholder='email' className=' outline-0' />
                        <FaArrowCircleRight size={30} className='text-2xl border-l-2 p-1 cursor-pointer'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer