import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon, ReloadIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoSidebarCollapse } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import NavBar from './NavBar';
import FollowingSidebar from './FollowingSidebar';

const Following = () => { 
  return (
    <>
      <NavBar currentPage="following" />

      <div className="flex flex-row mt-[5rem]">
        <FollowingSidebar />
        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 p-10 overflow-y-auto ml-[20%] w-[80vw]">          
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-bold text-[2.5rem]">Following</h1>
            <div className="flex flex-row flex-wrap gap-5 w-full">
              {[...Array(10)]
                .map((_, i) => (
                  <div className="w-[32%] h-[5rem] bg-[#3C3C3C] rounded-lg py-3 pl-3 pr-5 flex items-center justify-between gap-5 cursor-pointer">
                    <div className="flex items-center gap-5 h-full">
                      <Skeleton className="aspect-square h-full bg-[#282828] rounded-lg"></Skeleton>
                      <div className="flex flex-col text-white">
                        <h2 className="text-[1.2rem]">Axolotl</h2>
                        <span className="opacity-50 text-[0.9rem]">20 followers</span>
                      </div>
                    </div>

                    <DotsHorizontalIcon className="text-white w-6 h-6 cursor-pointer" />
                  </div>
              ))}
            </div>

            {/* <div className="flex flex-col gap-2">
              {[...Array(10)]
                .map((_, i) => (
                  <div className="w-full h-[4rem] bg-[#3C3C3C] rounded-lg flex justify-between cursor-pointer">
                    <div className="flex flex-row gap-5 h-full items-center">
                      <Skeleton className="aspect-square h-full bg-[#282828] rounded-lg" />
                      <h2 className="text-[1.2rem] text-white">Axolotl</h2>
                    </div>
                    <div className="flex flex-row gap-10 mr-5 h-full items-center">
                      <span className="opacity-50 text-white">20 followers</span>
                      <DotsHorizontalIcon className="text-white w-6 h-6 cursor-pointer" />
                    </div>
                  </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>



    </>
  )
}

export default Following
