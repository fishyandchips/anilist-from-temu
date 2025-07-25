import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
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
import AnimeListSidebar from './AnimeListSidebar';

const AnimeList = () => { 
  const animes = [
    "BOCCHI THE ROCK!",
    "DAN DA DAN",
    "Kaguya-sama: Love is War -Ultra Romantic-",
    "Your lie in April",
    "Assassination Classroom 2",
    "Kaguya-sama: Love is War?",
    "My Dress-Up Darling",
    "Rascal Does Not Dream of a Dreaming Girl"
  ];

  const plannedAnimes = [
    "A Certain Scientific Railgun",
    "BAKI",
    "Chainsaw Man - The Movie: Reze Arc",
    "Dr. STONE",
    "Higehiro: After Being Rejected, I Shaved And Took in a High School Runaway",
    "Komi Can't Communicate",
    "MASHLE: MAGIC AND MUSCLES"
  ];

  return (
    <>
      <NavBar currentPage="animeList" />

      <div className="flex flex-row mt-[5rem]">
        <AnimeListSidebar />
        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 p-10 overflow-y-auto ml-[20%] w-[80vw]">          
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-bold text-[2.5rem]">Completed</h1>
            <Table>
              <TableHeader>
                <TableHead className="w-[50%] pl-5">Title</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Progress</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="flex flex-row items-center justify-center"><ReloadIcon /></TableHead>
              </TableHeader>
              <TableBody className="text-white">
                {animes.map((value, index) => (
                  <TableRow key={index} className="w-[50%]">
                    <TableCell className="flex flex-row items-center gap-5">
                      {value.length > 30 && <div className="w-1 h-5 bg-[#7FFFAE] rounded-sm absolute left-1" />}
                      {value.length < 15 && <div className="w-1 h-5 bg-[#FF7F7F] rounded-sm absolute left-1" />}
                      <div className="ml-2 w-10 h-10 bg-[#3C3C3C] rounded-sm hover:cursor-pointer flex-shrink-0" />
                      <span>{value}</span>
                    </TableCell>
                    <TableCell className="text-center">{Math.floor(Math.random() * 10) + 1}</TableCell>
                    <TableCell className="text-center">12/12</TableCell>
                    <TableCell className="text-center">TV</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-white font-bold text-[2.5rem]">Plan to Watch</h1>
            <Table>
              <TableHeader>
                <TableHead className="w-[50%] pl-5">Title</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Progress</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="flex flex-row items-center justify-center"><ReloadIcon /></TableHead>
              </TableHeader>
              <TableBody className="text-white">
                {plannedAnimes.map((value, index) => (
                  <TableRow key={index} className="w-[50%]">
                    <TableCell className="flex flex-row items-center gap-5">
                      {value.length > 30 && <div className="w-1 h-5 bg-[#7FFFAE] rounded-sm absolute left-1" />}
                      {value.length < 15 && <div className="w-1 h-5 bg-[#FF7F7F] rounded-sm absolute left-1" />}
                      <div className="ml-2 w-10 h-10 bg-[#3C3C3C] rounded-sm hover:cursor-pointer flex-shrink-0" />
                      <span>{value}</span>
                    </TableCell>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">0/{Math.floor(Math.random() * 25) + 1}</TableCell>
                    <TableCell className="text-center">TV</TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>



    </>
  )
}

export default AnimeList
