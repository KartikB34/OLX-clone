import React from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {ImProfile} from 'react-icons/im';
import {BiPurchaseTagAlt} from 'react-icons/bi';
import {RiAdvertisementLine} from 'react-icons/ri';

import { MdOutlineSpaceDashboard, MdLogout, MdInventory } from 'react-icons/md';

import { loadUser, LogoutUser } from "../../../Actions/User";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ option, setOption }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(LogoutUser())
    dispatch(loadUser())
    toast.success("Logged out successfully");
    navigate("/")
  };

  return (
    <div className="col-span-2 border-r font-semibold border-gray-200 min-h-[90vh] w-[90px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full">





        <div
          onClick={() => { setOption("Products") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${option === "Products" && "border-gray-900"
            }`}
        >
          <span>
            <MdInventory className="nav-icon" />
          </span>
          <h1
            className={`${option === "Products"? "text-black font-semibold" : "text-gray-600"} group-hover:text-black xl:flex hidden`}
          >
            Products
          </h1>
        </div>


        <div
          onClick={() => { setOption("My Posts") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${option === "My Posts" && "border-gray-900"
            }`}
        >
          <span>
            <MdOutlineSpaceDashboard className="nav-icon" />
          </span>
          <h1
            className={`${option === "My Posts"? "text-black font-semibold" : "text-gray-600"} group-hover:text-black xl:flex hidden`}
          >
            My posts
          </h1>
        </div>

        <div
          onClick={() => { setOption("Purchases") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${option === "Purchases" && "border-gray-900"
            }`}
        >
          <span>
            <BiPurchaseTagAlt className="nav-icon" />
          </span>
          <h1
            className={`${option === "Purchases"? "text-black font-semibold" : "text-gray-600"}  group-hover:text-black xl:flex hidden`}
          >
            My Purchases
          </h1>
        </div>

        <div
          onClick={() => { setOption("Post ad") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${option === "Post ad" && "border-gray-900"
            }`}
        >
          <span>
            <RiAdvertisementLine className="nav-icon" />
          </span>
          <h1
            className={`${option === "Post ad"? "text-black font-semibold" : "text-gray-600"}  group-hover:text-black xl:flex hidden`}
          >
            Post ad
          </h1>
        </div>


        <div className="w-full border-t border-gray-200" />

        <div
          onClick={() => { setOption("Profile") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${option === "Profile" && "border-gray-900"
            }`}
        >
          <span>
            <ImProfile className="nav-icon" />
          </span>
          <h1
            className={`${option === "Profile"? "text-black font-semibold" : "text-gray-600"}   group-hover:text-black xl:flex hidden`}
          >
            Profile
          </h1>
        </div>

        {/* Only Logout as of now */}

        <div
          onClick={logout}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent`}
        >
          <span>
            <MdLogout className="nav-icon" />
          </span>
          <h1
            className={`text-gray-600  group-hover:text-black xl:flex hidden`}
          >
            Sign out
          </h1>
        </div>

      </div>

    </div>
  );
};

export default Sidebar;
