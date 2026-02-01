import React from 'react'
import beauty from '../assets/images/beauty.jpeg'
import electronics from '../assets/images/electronics.jpeg'
import fashion from "../assets/images/fashion.jpeg"
import furniture from "../assets/images/furniture.jpeg"
import phone from '../assets/images/phone.jpeg'
const navItems = [
  {name:"Phone",img:phone},
  {name:"Beauty", img:beauty},
  {name:"Fashion",img: fashion},
  {name: "Furniture", img :furniture},
  {name: "Electronics", img: electronics}
]

const SubNavbar = () => {
  return (
    <div className='flex justify-evenly items-end gap-5 my-5 mx-5  bg-white p-2 rounded-xl'>
      {navItems.map((itmes,index) =>{
        return <div key={index}>
          <img src={itmes.img} className='h-16 transition duration-300 transform hover:scale-105'/>
          <p className='text-center font-medium mt-1'>{itmes.name}</p>
        </div>
      })}
    </div>
  )
}

export default SubNavbar