import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { Skeleton } from "@/components/ui/skeleton";
import { DesktopIcon, StarFilledIcon, ClockIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { FaPlay } from "react-icons/fa";
import { BsBookmarkStar } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { GoNumber } from "react-icons/go";

import CustomLayoutToggle from '../CustomLayoutToggle';
import CustomMediumToggle from '../CustomMediumToggle';
import NavBar from '../main/NavBar';
import SwipeCarousel from '../SwipeCarousel';
import { HistoryChart } from './HistoryChart';

const Profile = () => {  
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller"
  ];
  
  const [stats, setStats] = useState("Number");
  const [statsMedium, setStatsMedium] = useState("Anime");
  const [favouritesMedium, setFavouritesMedium] = useState("Anime");
  const [historicalMedium, setHistoricalMedium] = useState("Anime");
  const [recentDropdown, setRecentDropdown] = useState(false);
  const meRef = useRef(null);
  const statsRef = useRef(null);
  const favRef = useRef(null);
  const historyRef = useRef(null);
  const medalsRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);

  const genreCard = (count) => {
    return [...Array(count)].map((_, i) => (
      <div className="w-[35rem] h-[20rem] bg-[#3C3C3C] rounded-lg shrink-0 p-[2rem] flex flex-col justify-between gap-3">
        <h2 className="text-white text-[1.6rem] font-bold">{genres[Math.floor(Math.random() * genres.length)]}</h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-white font-bold">{Math.floor(Math.random() * 200) + 1}</span>
            <span className="text-white opacity-50">Count</span>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-bold">{(Math.random() * 100 + 1).toFixed(2)}%</span>
            <span className="text-white opacity-50">Mean Score</span>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-bold">{Math.floor(Math.random() * 50) + 1} days {Math.floor(Math.random() * 24) + 1} hours</span>
            <span className="text-white opacity-50">Time Watched</span>
          </div>
        </div>

        <SwipeCarousel
          elements={seriesDisplay(10, '6rem', '8rem')}
        />
      </div>
    ));
  }

  const seriesDisplay = (count, width, height) => {
    const widthClass = `w-[${width}]`;
    const heightClass = `h-[${height}]`;

    return [...Array(count)].map((_, i) => (
      <Skeleton key={i} className={`bg-[#FFFFFF] rounded-lg shrink-0 ${widthClass} ${heightClass}`} />
    ));
  }

  const scrollTo = (ref, section) => {
    if (ref.current) {
      const navbarHeight = 5 * 16;
      const offset = 6 * window.innerHeight / 100;
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  return (
    <>
      <NavBar />

      <div className='flex flex-col mt-[5rem]'>
        <div className="w-full h-[35vh] px-[12rem] pb-5 bg-[#1E1E1E] flex justify-between items-end">
          <div className="flex flex-row items-end gap-10">
            <Skeleton className="h-[9rem] w-[9rem] bg-[#3C3C3C] rounded-lg" />
            <Skeleton className="h-[2rem] w-[20rem] bg-[#3C3C3C] rounded-lg" />
          </div>
          <Button className="relative font-bold rounded-full w-[8rem]">
            Follow
          </Button>
        </div>

        <div className="z-40 bg-[#282828] w-full h-[6vh] px-[14rem] text-white flex flex-row gap-20 items-center sticky top-[5rem]">
          <button onClick={() => scrollTo(meRef, "me")} className={`text-[1.1rem] ${activeSection === "me" ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>me!</button>
          <button onClick={() => scrollTo(statsRef, "stats")} className={`text-[1.1rem] ${activeSection === "stats" ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>Stats</button>
          <button onClick={() => scrollTo(favRef, "fav")} className={`text-[1.1rem] ${activeSection === "fav" ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>Favourites</button>
          <button onClick={() => scrollTo(historyRef, "history")} className={`text-[1.1rem] ${activeSection === "history" ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>Historical</button>
          <button onClick={() => scrollTo(medalsRef, "medals")} className={`text-[1.1rem] ${activeSection === "medals" ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>Medals</button>
        </div>

        <div className="w-full h-auto bg-[#282828] flex flex-col pt-[1rem] pb-[2rem] px-[5rem] gap-5">
          <h1 ref={meRef} className="w-full text-white font-bold text-[1.5rem] underline decoration-[#7FC3FF] underline-offset-[0.5rem]">me!</h1>

          <div className="flex flex-row gap-[4rem]">
            <div className="w-[30%] flex flex-col gap-10">
              <p className="text-white text-[1.1rem] max-h-[20rem] overflow-y-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <div className="flex flex-col gap-5">
                <h2 className="text-white font-bold text-[1.2rem]">Activity History</h2>

                <div className="w-full h-auto bg-[#3C3C3C] flex flex-row flex-wrap gap-2 justify-center items-center p-[1rem] rounded-lg">
                  {[...Array(15 * 7)].map((_, i) => (
                    <div className="w-[1rem] h-[1rem] bg-[#282828] rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[70%] flex flex-col gap-5 items-center">
              <div className="w-full h-[45vh] flex flex-row flex-wrap justify-center items-center">
                <div className="w-[33%] h-[9rem] flex flex-row gap-[2rem] pl-[5rem] items-center">
                  <DesktopIcon className="text-[#939393] w-[3rem] h-[3rem]"/>
                  <div className="flex flex-col">
                    <span className="text-[#7FC3FF] text-[2rem] font-bold">107</span>
                    <span className="text-white font-bold">Total Anime</span>
                  </div>
                </div>

                <div className="w-[33%] h-[9rem] flex flex-row gap-[2rem] pl-[5rem] items-center">
                  <FaPlay className="text-[#939393] w-[3rem] h-[3rem]"/>
                  <div className="flex flex-col">
                    <span className="text-[#7FC3FF] text-[2rem] font-bold">1891</span>
                    <span className="text-white font-bold">Episodes Watched</span>
                  </div>
                </div>

                <div className="w-[33%] h-[9rem] flex flex-row gap-[2rem] pl-[5rem] items-center">
                  <BsBookmarkStar className="text-[#939393] w-[3rem] h-[3rem]"/>
                  <div className="flex flex-col">
                    <span className="text-[#7FC3FF] text-[2rem] font-bold">80.51%</span>
                    <span className="text-white font-bold">Average Rating</span>
                  </div>
                </div>

                <div className="w-[33%] h-[9rem] flex flex-row gap-[2rem] pl-[5rem] items-center">
                  <IoBookOutline className="text-[#939393] w-[3rem] h-[3rem]"/>
                  <div className="flex flex-col">
                    <span className="text-[#7FC3FF] text-[2rem] font-bold">3</span>
                    <span className="text-white font-bold">Total Manga</span>
                  </div>
                </div>

                <div className="w-[33%] h-[9rem] flex flex-row gap-[2rem] pl-[5rem] items-center">
                  <MdOutlineLibraryBooks className="text-[#939393] w-[3rem] h-[3rem]"/>
                  <div className="flex flex-col">
                    <span className="text-[#7FC3FF] text-[2rem] font-bold">562</span>
                    <span className="text-white font-bold">Chapters Read</span>
                  </div>
                </div>

                <div className="w-[33%] h-[9rem] flex flex-row gap-[2rem] pl-[5rem] items-center">
                  <BsBookmarkStar className="text-[#939393] w-[3rem] h-[3rem]"/>
                  <div className="flex flex-col">
                    <span className="text-[#7FC3FF] text-[2rem] font-bold">93.33%</span>
                    <span className="text-white font-bold">Average Rating</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full">
                <h2 className="text-white font-bold text-[1.2rem]">Genre Overview</h2>

                <div className="w-full h-auto bg-[#3C3C3C] flex flex-col gap-10 justify-center items-center p-[2rem] rounded-lg">
                  <div className="w-full flex flex-row justify-between">
                    <div className="w-[10rem] h-[2.5rem] bg-[#66E588] rounded-lg flex justify-center items-center">
                      <span className="text-white font-bold">Drama</span>
                    </div>

                    <div className="w-[10rem] h-[2.5rem] bg-[#7FF2FF] rounded-lg flex justify-center items-center">
                      <span className="text-white font-bold">Comedy</span>
                    </div>

                    <div className="w-[10rem] h-[2.5rem] bg-[#C37FFF] rounded-lg flex justify-center items-center">
                      <span className="text-white font-bold">Supernatural</span>
                    </div>

                    <div className="w-[10rem] h-[2.5rem] bg-[#FF7FA1] rounded-lg flex justify-center items-center">
                      <span className="text-white font-bold">Action</span>
                    </div>
                  </div>

                  <div className="w-full relative flex items-center">
                    <div className="z-30 w-[50%] h-[1.5rem] bg-[#66E588] rounded-full absolute"></div>
                    <div className="z-20 w-[70%] h-[1.5rem] bg-[#7FF2FF] rounded-full absolute"></div>
                    <div className="z-10 w-[90%] h-[1.5rem] bg-[#C37FFF] rounded-full absolute"></div>
                    <div className="w-full h-[1.5rem] bg-[#FF7FA1] rounded-full absolute"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="w-full h-auto bg-[#282828] flex flex-col pt-[1rem] pb-[2rem] px-[5rem] gap-5">
          <div className="flex justify-between items-center">
            <h1 ref={statsRef} className="text-white font-bold text-[1.5rem] underline decoration-[#7FC3FF] underline-offset-[0.5rem]">Stats</h1>
            <div className="flex flex-row gap-[3rem]">
              <CustomLayoutToggle
                value={stats}
                onChange={setStats}
                options={[
                  { value: "Number", icon: <GoNumber /> },
                  { value: "Time", icon: <StarFilledIcon /> },
                  { value: "Score", icon: <ClockIcon /> }
                ]}
              />

              <CustomMediumToggle
                value={statsMedium}
                onChange={setStatsMedium}
                options={["Anime", "Manga"]}
              />
            </div>
          </div>

          <SwipeCarousel
            elements={genreCard(12)}
          />
        </div>

        <div className="w-full h-auto bg-[#282828] flex flex-col pt-[1rem] pb-[2rem] px-[5rem] gap-5">
          <div className="flex justify-between items-center">
            <h1 ref={favRef} className="text-white font-bold text-[1.5rem] underline decoration-[#7FC3FF] underline-offset-[0.5rem]">Favourites</h1>
            <CustomMediumToggle
              value={favouritesMedium}
              onChange={setFavouritesMedium}
              options={["Anime", "Manga"]}
            />
          </div>

          <SwipeCarousel
            elements={seriesDisplay(10, '12vw', '35vh')}
          />
        </div>

        <div className="w-full h-auto bg-[#282828] flex flex-col pt-[1rem] pb-[2rem] px-[5rem] gap-5">
          <div className="flex justify-between items-center">
            <h1 ref={historyRef} className="text-white font-bold text-[1.5rem] underline decoration-[#7FC3FF] underline-offset-[0.5rem]">Historical</h1>
            <CustomMediumToggle
              value={historicalMedium}
              onChange={setHistoricalMedium}
              options={["Anime", "Manga"]}
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-white font-bold text-[1.2rem]">Watch History</h2>
            <HistoryChart />
            <h2 className="text-white font-bold text-[1.2rem]">Recent (1m)</h2>
            <div className="flex flex-col gap-2">
              {[...Array(10)]
                .filter((_, i) => i < 5 || recentDropdown)
                .map((_, i) => (
                  <div className="w-full flex flex-row justify-between items-center px-5">
                    <div className="flex flex-row h-[4rem] gap-5">
                      <Skeleton className="aspect-square h-full bg-[#3C3C3C] rounded-lg" />
                      <div className="flex flex-col gap-3">
                        <Skeleton className="w-[20rem] h-[1rem] bg-[#3C3C3C]" />
                        <Skeleton className="w-[12rem] h-[1rem] bg-[#3C3C3C]" />
                      </div>
                    </div>
                    <span className="text-white font-bold opacity-50">{Math.floor(Math.random() * 50) + 1} days ago</span>
                  </div>
              ))}
            </div>

            {!recentDropdown && (
              <div className="w-full flex justify-center items-center">
                <ChevronDownIcon className="text-white h-[1.5rem] w-[1.5rem] cursor-pointer" onClick={() => setRecentDropdown(true)}/>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-auto bg-[#282828] flex flex-col pt-[1rem] pb-[2rem] px-[5rem] gap-5">
          <h1 ref={medalsRef} className="text-white font-bold text-[1.5rem] underline decoration-[#7FC3FF] underline-offset-[0.5rem]">Medals</h1>

          <div className="flex flex-col gap-5">
            <h2 className="text-white font-bold text-[1.2rem]">Latest</h2>
            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(14)].map((_, i) => (
                <div
                  className="aspect-square w-[8rem] bg-[#3C3C3C] rotate-90 shrink-0"
                  style={{
                    clipPath:
                      'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                    borderRadius: '0.5rem',
                  }}
                ></div>
              ))}
            </div>
            
            <div className="flex flex-row flex-wrap justify-between">
              <div className="flex flex-col gap-5 w-[50%]">
                <h2 className="text-white font-bold text-[1.2rem]">Studio</h2>
                <div className="flex flex-row flex-wrap gap-3 gap-y-5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      className="aspect-square w-[8rem] bg-[#3C3C3C] rotate-90 shrink-0"
                      style={{
                        clipPath:
                          'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                        borderRadius: '0.5rem',
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-5 w-[50%]">
                <h2 className="text-white font-bold text-[1.2rem]">Dedication</h2>
                <div className="flex flex-row flex-wrap gap-3 gap-y-5">
                  {[...Array(15)].map((_, i) => (
                    <div
                      className="aspect-square w-[8rem] bg-[#3C3C3C] rotate-90 shrink-0"
                      style={{
                        clipPath:
                          'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                        borderRadius: '0.5rem',
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5 w-[50%]">
                <h2 className="text-white font-bold text-[1.2rem]">Secret</h2>
                <div className="flex flex-row flex-wrap gap-3 gap-y-5">
                  {[...Array(15)].map((_, i) => (
                    <div
                      className="aspect-square w-[8rem] bg-[#3C3C3C] rotate-90 shrink-0"
                      style={{
                        clipPath:
                          'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                        borderRadius: '0.5rem',
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  )
}

export default Profile
