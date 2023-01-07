import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";

// import Inventory from "./inventory/Inventory";
import Profile from "./profile/Profile";

import Postad from "./postad/Postad";
import Products from "./products/Products";
import Myposts from "./myposts/Myposts";
import Purchases from "./Purchases";
// import { Side } from "@syncfusion/ej2/svg-base";


const Dashboard = ({sidebarOpen}) => {

  const [option, setOption] = useState("Products");

  return (
    <div>
      <div className={` w-full  min-h-[90vh] mt-16 flex flex-row  trantition-all duration-300`}>

        <div className={`${sidebarOpen===false? "hidden" : "block"} `}>
         <Sidebar option={option} setOption={setOption}  />
        </div>

        <div className="w-[100%] ease-in-out duration-300">
          {option === "Products" && <Products />}
          {option === "My Posts" && <Myposts />}
          {option === "Post ad" && <Postad />}
          {option === "Purchases" && <Purchases />}
          {/* {option === "Posted Jobs" && <Yourjobs setOption={setOption}/>} */}
          {/* {option === "Add job" && <Addjob/>} */}
          {option === "Profile" && <Profile />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;