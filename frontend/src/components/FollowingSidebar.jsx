import { useState, useEffect } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { ListBulletIcon, HamburgerMenuIcon, CaretUpIcon, CaretDownIcon } from "@radix-ui/react-icons";
import { SearchBar } from "@/components/ui/searchbar";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const FollowingSidebar = () => { 
  const [list, setList] = useState("following");
  const [sort, setSort] = useState("date-followed");
  const [display, setDisplay] = useState("card");

  return (
    <>
      <div className="fixed h-[calc(100vh-5rem)] w-[20%] bg-[#232323] flex flex-col gap-6 overflow-y-auto p-6">
        <SearchBar />

        <ToggleGroup
          type="single"
          value={list}
          onValueChange={(newList) => {
            if (newList) {
              setList(newList);
            }
          }}
          className="text-white flex flex-col"
        >
          <span className="text-[0.8rem] opacity-50 text-white w-full">Social</span>
          <ToggleGroupItem value="following" className="w-full">
            Following
          </ToggleGroupItem>
          <ToggleGroupItem value="followers" className="w-full">
            Followers
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-row gap-1.5 items-center">
            <span className="text-[0.8rem] opacity-50 text-white">Sort</span>
            <div className="flex flex-col text-white opacity-50 relative">
              <CaretUpIcon className="cursor-pointer absolute bottom-[-0.3rem] h-4 w-4" />
              <CaretDownIcon className="cursor-pointer absolute top-[-0.3rem] h-4 w-4" />
            </div>
          </div>

          <Select value={sort} onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-followed">Date Followed</SelectItem>
              <SelectItem value="username">Username</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex justify-start">
          <ToggleGroup
            variant="primary"
            type="single"
            value={display}
            onValueChange={(newDisplay) => {
              if (newDisplay) {
                setDisplay(newDisplay);
              }
            }}
            className="text-white bg-[#3C3C3C] rounded-lg"
          >
            <ToggleGroupItem value="card" className="flex justify-center items-center">
              <div className="w-3 h-3 bg-white"></div>
            </ToggleGroupItem>
            <ToggleGroupItem value="list" className="flex justify-center items-center">
              <HamburgerMenuIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </>
  )
}

export default FollowingSidebar
