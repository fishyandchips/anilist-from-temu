import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, StarFilledIcon, HeartIcon, HeartFilledIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreChart } from './ScoreChart';

import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Info = () => { 

  return (
    <>
      <NavBar currentPage="info" />

      <div className="flex flex-row flex-wrap mt-[5rem]">
        <div className="w-full relative">
          <div className="z-20 absolute ml-[15rem] mt-[11rem]">
            <Skeleton className="w-[13.5rem] h-[19rem] bg-[#999999] rounded-lg" />
            <div className="mt-5 w-full flex flex-row justify-center items-center gap-5">
              <div className="flex flex-row">
                <div className="bg-[#7FC3FF] w-[7.5rem] h-[2.5rem] rounded-tl-full rounded-bl-full border-r border-[#282828] flex justify-center items-center cursor-pointer">
                  <span className="text-black text-[1rem]">+ Add to List</span>
                </div>
                <div className="bg-[#7FC3FF] w-[2.5rem] h-[2.5rem] rounded-tr-full rounded-br-full flex justify-center items-center cursor-pointer">
                  <ChevronDownIcon className="text-black h-[1rem] w-[1rem]"/>
                </div>
              </div>
              <HeartIcon className="text-white w-[2rem] h-[2rem] cursor-pointer"/>
            </div>
          </div>
          <div className="w-full h-[45vh] bg-[#3C3C3C] pl-[28.5rem] relative">
            <div className="absolute bottom-0 flex flex-col gap-3 ml-10 mb-4">
              <h1 className="text-white text-[1.5rem] font-bold">BOCCHI THE ROCK!</h1>
              <div className="flex flex-row gap-3">
                <Button variant="outlined" size="sm" className="relative rounded-full">Comedy</Button>
                <Button variant="outlined" size="sm" className="relative rounded-full">Music</Button>
                <Button variant="outlined" size="sm" className="relative rounded-full">Slice of Life</Button>
              </div>
            </div>
          </div>

          <div className="w-full h-[40vh] bg-[#1E1E1E] pl-[28.5rem] pr-[15rem]">
            <div className="h-full flex flex-col gap-3 ml-10 mb-4 justify-center">
              <div className="flex flex-row gap-10">
                <div className="flex flex-row gap-3 items-center">
                  <StarFilledIcon className="text-[#E5C366] w-[2.5rem] h-[2.5rem]"/>
                  <div className="flex flex-col">
                    <h2 className="text-white text-[1.7rem] font-bold">87%</h2>
                    <h3 className="text-white text-[0.8rem] opacity-50">#30 Highest Rated All Time</h3>
                  </div>
                </div>

                <div className="flex flex-row gap-3 items-center">
                  <HeartFilledIcon className="text-[#FF7F7F] w-[2.5rem] h-[2.5rem]"/>
                  <div className="flex flex-col">
                    <h2 className="text-white text-[1.7rem] font-bold">205,630</h2>
                    <h3 className="text-white text-[0.8rem] opacity-50">#204 Most Popular All Time</h3>
                  </div>
                </div>
              </div>
              <p className="text-white text-[0.9rem]">
                Hitori Gotou, “Bocchi-chan,” is a girl who's so introverted and shy around people that she'd 
                always start her conversations with “Ah...”
              </p>
              <p className="text-white text-[0.9rem]">
                During her middle school years, she started 
                playing the guitar, wanting to join a band because she thought it could be an opportunity 
                for even someone shy like her to also shine. But because she had no friends, she ended up 
                practicing guitar for six hours every day all by herself. After becoming a skilled guitar player, 
                she uploaded videos of herself playing the guitar to the internet under the name “Guitar Hero” 
                and fantasized about performing at her school's cultural festival concert. But not only could 
                she not find any bandmates, before she knew it, she was in high school an... <span className="opacity-50 cursor-pointer">Read more</span>
              </p>
            </div>
          </div>
        </div>




        <div className="w-[20%] bg-[#232323] flex flex-col gap-6 p-6">
          <div className="text-white opacity-50">
            <h2 className="font-bold">Format</h2>
            <h3>TV</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Episodes</h2>
            <h3>12</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Duration</h2>
            <h3>24 mins per episode</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Status</h2>
            <h3>Finished</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Aired</h2>
            <h3>9 Oct 2022 - 25 Dec 2022</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Season</h2>
            <h3>Fall 2022</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Favourites</h2>
            <h3>23,249</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Romaji</h2>
            <h3>Bocchi the Rock!</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">English</h2>
            <h3>BOCCHI THE ROCK!</h3>
          </div>

          <div className="text-white opacity-50">
            <h2 className="font-bold">Native</h2>
            <h3>ぼっち・ざ・ろっく！</h3>
          </div>

          <div className="text-white opacity-50 flex flex-col gap-2">
            <h2 className="font-bold">Tags</h2>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Band</h3>
              <h3>98%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Female Protagonist</h3>
              <h3>93%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Primarily Female Cast</h3>
              <h3>93%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Primarily Teen Cast</h3>
              <h3>91%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Rock Music</h3>
              <h3>90%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Coming of Age</h3>
              <h3>86%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Cute Girls Doing Cute Things</h3>
              <h3>86%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Hikikomori</h3>
              <h3>85%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Rehabilitation</h3>
              <h3>84%</h3>
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center">
              <h3>Surreal Comedy</h3>
              <h3>80%</h3>
            </div>

            <span className="text-[0.75rem]">Show spoiler tags</span>
          </div>

          <div className="text-white text-opacity-50 flex flex-col gap-2">
            <h2 className="font-bold">External & Streaming</h2>
            
            <div className="flex flex-row gap-3">
              <div className="aspect-square w-5 bg-white opacity-50"></div>
              <div className="flex flex-row gap-1">
                <span className="text-white">Official Site</span>
                <span className="text-[0.7rem] mt-auto">JP</span>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <div className="aspect-square w-5 bg-white opacity-50"></div>
              <div className="flex flex-row gap-1">
                <span className="text-white">Instagram</span>
                <span className="text-[0.7rem] mt-auto">JP</span>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <div className="aspect-square w-5 bg-white opacity-50"></div>
              <div className="flex flex-row gap-1">
                <span className="text-white">Twitter</span>
                <span className="text-[0.7rem] mt-auto">JP</span>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <div className="aspect-square w-5 bg-white opacity-50"></div>
              <span className="text-white">Bilibili TV</span>
            </div>

            <div className="flex flex-row gap-3">
              <div className="aspect-square w-5 bg-white opacity-50"></div>
              <span className="text-white">Crunchyroll</span>
            </div>

            <div className="flex flex-row gap-3">
              <div className="aspect-square w-5 bg-white opacity-50"></div>
              <span className="text-white">Netflix</span>
            </div>
          </div>
        </div>

        <div className="transition-all duration-300 ease-in-out flex flex-col gap-10 p-10 w-[80%]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-white font-bold text-[1.2rem]">Characters</h2>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row flex-wrap justify-between w-full gap-5">
              {[...Array(6)].map((_, i) => (
                <div className="w-[48.5%] h-[6rem] bg-[#3C3C3C] rounded-lg flex justify-between">
                  <div className="flex flex-row gap-5">
                    <div className="w-[5rem] h-full bg-white opacity-50 rounded-lg"></div>
                    <div className="flex flex-col gap-3 mt-3">
                      <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" />
                      <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" />
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-3 mt-3 items-end">
                      <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" />
                      <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" />
                    </div>
                    <div className="w-[5rem] h-full bg-white opacity-50 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-white font-bold text-[1.2rem]">Staff</h2>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row flex-wrap justify-center w-full gap-5">
              {[...Array(4)].map((_, i) => (
                <div className="w-[48.5%] h-[6rem] bg-[#3C3C3C] rounded-lg flex justify-between">
                  <div className="flex flex-row gap-5">
                    <div className="w-[5rem] h-full bg-white opacity-50 rounded-lg"></div>
                    <div className="flex flex-col gap-3 mt-3">
                      <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" />
                      <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" />
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-3 mt-3 items-end">
                      <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" />
                      <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" />
                    </div>
                    <div className="w-[5rem] h-full bg-white opacity-50 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-white font-bold text-[1.2rem]">Recommended</h2>
  
            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(10)].map((_, i) => (
                <Skeleton className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0" />
              ))}
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-[50%] flex flex-col gap-5">
              <h2 className="text-white font-bold text-[1.2rem]">Trailer</h2>
    
              <Skeleton className="w-[35vw] h-[40vh] bg-[#3C3C3C] rounded-lg shrink-0" />
            </div>

            <div className="w-[50%] flex flex-col gap-5">
              <h2 className="text-white font-bold text-[1.2rem]">Following</h2>
    
              <div className="flex flex-col gap-2">
                {[...Array(4)]
                  .map((_, i) => (
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-row h-[4rem] gap-5">
                        <Skeleton className="aspect-square h-full bg-[#3C3C3C] rounded-lg" />
                        <div className="flex flex-col gap-3">
                          <Skeleton className="w-[10rem] h-[1rem] bg-[#3C3C3C]" />
                          <Skeleton className="w-[4rem] h-[1rem] bg-[#3C3C3C]" />
                        </div>
                      </div>

                      <div className="flex flex-row h-[4rem] w-full text-right items-center">
                        <span className="text-white font-bold opacity-50 w-[60%]">Completed</span>
                        <span className="text-white font-bold opacity-50 w-[40%]">{Math.floor(Math.random() * 10) + 1}/10</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-white font-bold text-[1.2rem]">Score Distribution</h2>
  
            <ScoreChart />
          </div>
        </div>
      </div>



    </>
  )
}

export default Info
