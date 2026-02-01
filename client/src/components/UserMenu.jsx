import React, { useEffect, useState, useRef } from 'react'
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/authSlice';
import { useAuthUser } from '../redux/auth/authHooks';
const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useAuthUser();
    console.table("User in menu:", user)

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        window.addEventListener('mousedown', handler);

        return () => {
            window.removeEventListener('mousedown', handler);
        }
    }, [])

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    }


    return (
        <div className='relative'>
            <button onClick={() => setOpen(!open)}>
                <FaUserCircle size={28} />
            </button>

            {open && (
                <div className='flex flex-col bg-gray-200 shadow-2xl absolute top-12 right-0 w-36 rounded-lg p-2 z-10'>
                    {/* <p>{user?.email}</p> */}
                    <button className='hover:cursor-pointer border-b'>Profile</button>
                    <button onClick={handleLogout} className='hover:cursor-pointer relative text-red-500 font-medium'><span>Logout</span><FaSignOutAlt size={20} className='absolute top-2 right-2'/></button>
                </div>


            )}
        </div>
    )
}

export default UserMenu