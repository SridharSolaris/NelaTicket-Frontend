import React from "react";
import Sidebar from "../admin/components/Sidebar";
import Topbar from "../admin/components/Topbar";

const AdminLayout = (props) => {
  return (
    <>
    <Topbar />
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col h-screen">
          
        <div class="p-4 sm:ml-64">
            <div class="p-4  rounded-lg  mt-14">
            {props.children}
            </div>
        </div>
        </div>
     </div>
      
    </div>
    </>
  );
};

export default AdminLayout;
