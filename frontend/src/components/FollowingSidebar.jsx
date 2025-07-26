import { useState, useEffect } from 'react';
import { ListBulletIcon, HamburgerMenuIcon, CaretUpIcon, CaretDownIcon } from "@radix-ui/react-icons";
import { SearchBar } from "@/components/ui/searchbar";
import { FaSortDown, FaSortUp } from "react-icons/fa";

import CustomToggle from './CustomToggle';
import CustomLayoutToggle from './CustomLayoutToggle';
import CustomSelect from './CustomSelect';

const FollowingSidebar = () => { 
  const [followStatus, setFollowStatus] = useState("Following");
  const [sort, setSort] = useState("Date Followed");
  const [display, setDisplay] = useState("Card");

  return (
    <>
      <div className="fixed h-[calc(100vh-5rem)] w-[20%] bg-[#232323] flex flex-col gap-6 overflow-y-auto p-6">
        <SearchBar />

        <CustomToggle
          value={followStatus}
          onChange={setFollowStatus}
          label={"Social"}
          options={["Following", "Followers"]}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-row gap-1.5 items-center">
            <span className="text-[0.8rem] opacity-50 text-white">Sort</span>
            <div className="flex flex-col text-white opacity-50 relative">
              <CaretUpIcon className="cursor-pointer absolute bottom-[-0.3rem] h-4 w-4" />
              <CaretDownIcon className="cursor-pointer absolute top-[-0.3rem] h-4 w-4" />
            </div>
          </div>

          <CustomSelect
            value={sort}
            onChange={setSort}
            placeholder={"Sort"}
            optional={false}
            options={["Date Followed", "Username"]}
          />
        </div>

        <div className="w-full flex justify-start">
          <CustomLayoutToggle
            value={display}
            onChange={setDisplay}
            options={[
              { value: "Card", icon: <div className="w-3 h-3 bg-white"></div> },
              { value: "List", icon: <HamburgerMenuIcon /> }
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default FollowingSidebar
