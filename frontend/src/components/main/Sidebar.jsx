import { useState, useEffect } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const Sidebar = ({ collapsed, setCollapsed }) => {  
  return (
    <>
      <div className={`transition-all duration-300 ease-in-out fixed h-[calc(100vh-5rem)] bg-[#232323] flex flex-col gap-6 overflow-y-auto p-6`}>
        <div className={`flex pl-2 items-center ${collapsed ? 'pr-2' : 'pr-full'}`}>
          {collapsed ? (
            <GoSidebarCollapse onClick={() => setCollapsed(!collapsed)} className="z-20 bg-[#232323] w-10 h-10 text-white hover:cursor-pointer flex-shrink-0" />
          ) : (
            <>
              <GoSidebarExpand onClick={() => setCollapsed(!collapsed)} className="z-20 bg-[#232323] w-10 h-10 text-white hover:cursor-pointer flex-shrink-0" />
            </>
          )}

          <h2 className={`transition-all duration-300 ease-in-out font-bold text-white absolute ${collapsed ? 'text-opacity-0 text-[0.01rem] w-10' : 'text-[1.2rem] pl-[3.5rem] w-[17rem]'} h-10 flex items-center overflow-hidden`}>
            Your Lists
          </h2>
        </div>

        <div className={`flex pl-2 items-center ${collapsed ? 'pr-2' : 'pr-full'} cursor-pointer`}>
          <div className={`transition-all duration-300 ease-in-out w-10 h-10 z-20 rounded-full bg-[#3C3C3C] text-white flex justify-center items-center text-xl flex-shrink-0`}>
            <span>+</span>
          </div>

          <h2 className={`transition-all duration-300 ease-in-out font-bold text-white bg-[#3C3C3C] rounded-full absolute ${collapsed ? 'text-opacity-0 text-[0.01rem] w-10' : 'text-[1rem] pl-[3.5rem] w-[8rem]'} h-10 flex items-center overflow-hidden`}>
            Create
          </h2>
        </div>

        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-14 flex rounded-sm hover:cursor-pointer flex-shrink-0">
            <div className={`transition-all duration-300 ease-in-out bg-[#2F2F2F] rounded-sm ${collapsed ? 'w-14' : 'w-[17rem]'}`}>
              <div className="w-14 h-14 bg-[#3C3C3C] rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Sidebar
