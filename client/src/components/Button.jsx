import React from 'react'

const Button = ({ bgcolor, text }) => {
    return (
        <button 
        type="submit"
        className={`${bgcolor} py-2 px-5 mt-4 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-101 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}>{text}</button>
    )
}

export default Button