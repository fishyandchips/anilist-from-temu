import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoSidebarCollapse } from "react-icons/go";
import { ListBulletIcon, HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { SearchBar } from "@/components/ui/searchbar";
import { FaTags } from "react-icons/fa6";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectTriggerSort,
  SelectValue,
} from "@/components/ui/select";

import NavBar from './NavBar';
import Sidebar from './Sidebar';

// const Component = ({ title, data }) => {
//   return (
// <div className="flex flex-col gap-2">
//             <div className="flex flex-row justify-between items-center">
//               <h1 className="text-white font-bold text-[2.5rem]">For you</h1>
//               <p className="text-white opacity-50 text-[1.1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
//             </div>

//             <div className="flex flex-row gap-3">
//               {[...Array(6)].map((_, i) => (
//                 <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg"></div>
//               ))}
//             </div>
//           </div>
//   )
// }

const Home = () => { 
  const [collapsed, setCollapsed] = useState(true);
  const [format, setFormat] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [season, setSeason] = useState("");
  const [sort, setSort] = useState("average-score");
  const [display, setDisplay] = useState("list");

  const yearsFrom1940 = () => {
    const yearsArray = [];
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1940; year--) {
      yearsArray.push(year.toString());
    }

    return yearsArray;
  }

  return (
    <>
      <NavBar />

      <div className="flex flex-row mt-[5rem]">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className={`transition-all duration-300 ease-in-out h-[calc(100vh-5rem)] flex flex-col gap-10 p-10 overflow-y-auto ${
            collapsed ? 'ml-[6.5rem] w-[calc(100vw-6.5rem)]' : 'ml-[20rem] w-[calc(100vw-20rem)]'
          }`}
        >
          <div className="flex flex-row flex-wrap w-full gap-5">
            {[...Array(5)].map((_, i) => (
              <div className="w-[32%] h-16 bg-[#3C3C3C] rounded-lg"></div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-[1rem]">
            <div className="flex flex-row gap-[2rem] justify-between shrink-0">
              <div className="flex flex-col w-[30%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Search</h2>
                <SearchBar />
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Genres</h2>
                <Select value={genre} onValueChange={(value) => {if (value == "any") setGenre(""); else setGenre(value);}}>
                  <SelectTrigger className={genre ? "bg-primary/40 text-white h-full" : "bg-[#3C3C3C] text-white h-full"}>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="ecchi">Ecchi</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="mahou-shoujo">Mahou Shoujo</SelectItem>
                    <SelectItem value="mecha">Mecha</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="psychological">Psychological</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                    <SelectItem value="slice-of-life">Slice of Life</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="supernatural">Supernatural</SelectItem>
                    <SelectItem value="thriller">Thriller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Year</h2>
                <Select value={year} onValueChange={(value) => {if (value == "any") setYear(""); else setYear(value);}}>
                  <SelectTrigger className={year ? "bg-primary/40 text-white h-full" : "bg-[#3C3C3C] text-white h-full"}>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
                    {yearsFrom1940().map((value, index) => (
                      <SelectItem value={value} key={index}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Season</h2>
                <Select value={season} onValueChange={(value) => {if (value == "any") setSeason(""); else setSeason(value);}}>
                  <SelectTrigger className={season ? "bg-primary/40 text-white h-full" : "bg-[#3C3C3C] text-white h-full"}>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="autumn">Autumn</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Format</h2>
                <Select value={format} onValueChange={(value) => {if (value == "any") setFormat(""); else setFormat(value);}}>
                  <SelectTrigger className={format ? "bg-primary/40 text-white h-full" : "bg-[#3C3C3C] text-white h-full"}>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="tv-short">TV Short</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="special">Special</SelectItem>
                    <SelectItem value="ova">OVA</SelectItem>
                    <SelectItem value="ona">ONA</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(genre.length !== 0 || year.length !== 0 || season.length !== 0 || format.length !== 0) && (
              <div className="flex flex-row w-full gap-[2rem] justify-between shrink-0">
                <div className="flex flex-row gap-4 items-center">
                  <FaTags className="text-white opacity-50 w-5 h-5" />
                  {genre.length !== 0 && (
                    <div className="rounded-full bg-[#7FC3FF] px-3 py-1 flex flex-row items-center gap-2">
                      <span className="text-white font-bold text-[0.8rem]">{genre}</span>
                      <Cross2Icon className="text-white cursor-pointer" onClick={() => {setGenre("")}} />
                    </div>
                  )}
                  {year.length !== 0 && (
                    <div className="rounded-full bg-[#7FC3FF] px-3 py-1 flex flex-row items-center gap-2">
                      <span className="text-white font-bold text-[0.8rem]">{year}</span>
                      <Cross2Icon className="text-white cursor-pointer" onClick={() => {setYear("")}} />
                    </div>
                  )}
                  {season.length !== 0 && (
                    <div className="rounded-full bg-[#7FC3FF] px-3 py-1 flex flex-row items-center gap-2">
                      <span className="text-white font-bold text-[0.8rem]">{season}</span>
                      <Cross2Icon className="text-white cursor-pointer" onClick={() => {setSeason("")}} />
                    </div>
                  )}
                  {format.length !== 0 && (
                    <div className="rounded-full bg-[#7FC3FF] px-3 py-1 flex flex-row items-center gap-2">
                      <span className="text-white font-bold text-[0.8rem]">{format}</span>
                      <Cross2Icon className="text-white cursor-pointer" onClick={() => {setFormat("")}} />
                    </div>
                  )}
                </div>

                <div className="flex flex-row w-[23%] gap-4 items-center">
                  <Select value={sort} onValueChange={(value) => setSort(value)}>
                    <SelectTriggerSort className="w-full h-full">
                      <SelectValue />
                    </SelectTriggerSort>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="average-score">Average Score</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="favourites">Favourites</SelectItem>
                      <SelectItem value="date-added">Date Added</SelectItem>
                      <SelectItem value="release-date">Release Date</SelectItem>
                    </SelectContent>
                  </Select>

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
                    <ToggleGroupItem value="list" className="flex justify-center items-center">
                      <ListBulletIcon />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="compact" className="flex justify-center items-center">
                      <HamburgerMenuIcon />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white font-bold text-[1.5rem]">For you</h1>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(10)].map((_, i) => (
                <div className="flex flex-col gap-2">
                  <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0"></div>
                  <div className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white font-bold text-[1.5rem]">Trending Now</h1>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(10)].map((_, i) => (
                <div className="flex flex-col gap-2">
                  <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0"></div>
                  <div className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white font-bold text-[1.5rem]">Popular This Season</h1>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(10)].map((_, i) => (
                <div className="flex flex-col gap-2">
                  <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0"></div>
                  <div className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white font-bold text-[1.5rem]">Upcoming Next Season</h1>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(10)].map((_, i) => (
                <div className="flex flex-col gap-2">
                  <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0"></div>
                  <div className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-white font-bold text-[1.5rem]">All Time Popular</h1>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            <div className="flex flex-row gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...Array(10)].map((_, i) => (
                <div className="flex flex-col gap-2">
                  <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0"></div>
                  <div className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Home
