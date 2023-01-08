import React from "react";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Dashboard = ({sidebarOpen}) => {

  return (
    <div>
      <div className={` w-full min-h-[90vh] mt-16 flex flex-row  trantition-all duration-300`}>

        <div className={`${sidebarOpen===false? "hidden" : "block"} `}>
         <Sidebar />
        </div>

        <div className="w-[100%] ease-in-out duration-300">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;