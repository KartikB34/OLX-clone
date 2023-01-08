import React from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {ImProfile} from 'react-icons/im';
import {BiPurchaseTagAlt} from 'react-icons/bi';
import {RiAdvertisementLine} from 'react-icons/ri';

import { MdOutlineSpaceDashboard, MdLogout, MdInventory } from 'react-icons/md';

import { loadUser, LogoutUser } from "../../../Actions/User";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate, useParams} from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const {id} = useParams();


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
          onClick={() => {navigate("/dashboard/products") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${ (location.pathname === "/dashboard/products" || location.pathname === `/dashboard/products/${id}`) && "border-gray-900"
            }`}
        >
          <span>
            <MdInventory className="nav-icon" />
          </span>
          <h1
            className={`${ (location.pathname === "/dashboard/products" || location.pathname === `/dashboard/products/${id}`) ? "text-black font-semibold" : "text-gray-600"} group-hover:text-black xl:flex hidden`}
          >
            Products
          </h1>
        </div>


        <div
          onClick={() => {navigate("/dashboard/myposts") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${(location.pathname === "/dashboard/myposts" || location.pathname === `/dashboard/myposts/${id}`) && "border-gray-900"
            }`}
        >
          <span>
            <MdOutlineSpaceDashboard className="nav-icon" />
          </span>
          <h1
            className={`${(location.pathname === "/dashboard/myposts" || location.pathname === `/dashboard/myposts/${id}`)? "text-black font-semibold" : "text-gray-600"} group-hover:text-black xl:flex hidden`}
          >
            My posts
          </h1>
        </div>

        <div
          onClick={() => { navigate("/dashboard/mypurchases") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${location.pathname === "/dashboard/mypurchases" && "border-gray-900"
            }`}
        >
          <span>
            <BiPurchaseTagAlt className="nav-icon" />
          </span>
          <h1
            className={`${location.pathname === "/dashboard/mypurchases"? "text-black font-semibold" : "text-gray-600"}  group-hover:text-black xl:flex hidden`}
          >
            My Purchases
          </h1>
        </div>

        <div
          onClick={() => {navigate("/dashboard/postad") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${location.pathname === "/dashboard/postad" && "border-gray-900"
            }`}
        >
          <span>
            <RiAdvertisementLine className="nav-icon" />
          </span>
          <h1
            className={`${location.pathname === "/dashboard/postad"? "text-black font-semibold" : "text-gray-600"}  group-hover:text-black xl:flex hidden`}
          >
            Post ad
          </h1>
        </div>


        <div className="w-full border-t border-gray-200" />

        <div
          onClick={() => {navigate("/dashboard/profile") }}
          className={`w-full flex items-center justify-start space-x-8 px-4 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${location.pathname === "/dashboard/profile" && "border-gray-900"
            }`}
        >
          <span>
            <ImProfile className="nav-icon" />
          </span>
          <h1
            className={`${location.pathname === "/dashboard/profile"? "text-black font-semibold" : "text-gray-600"}   group-hover:text-black xl:flex hidden`}
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
