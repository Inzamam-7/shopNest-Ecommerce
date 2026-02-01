import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import shopNestLogo1 from '../assets/images/shopNestLogo1.png'
import { CiSearch } from "react-icons/ci";
import UserMenu from "./UserMenu";
const Navbar = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full h-16 flex items-center justify-between bg-white">
      
      {/* Logo */}
      <div className="text-xl font-bold pl-16">
        <img src={shopNestLogo1} alt="ShopNest" className="h-25 w-auto"/>
      </div>
      
      {/* Search Field */}
      <div className="relative flex max-w-sm md:min-w-md mx-10 items-center">
        
        <input
          type="text"
          value={inputValue}
          placeholder="Search..."
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded-lg w-full outline-none bg-gray-200"
        />
        <CiSearch size={25} className="absolute right-3 text-gray-700 hover:text-white cursor-pointer"/>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8 text-lg pr-5">
        <CiShoppingCart size={30}/>
        <div>
          <UserMenu/>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
