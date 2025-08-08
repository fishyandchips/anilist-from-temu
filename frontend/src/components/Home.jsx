import { useState, useEffect } from 'react';
import { ListBulletIcon, HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { SearchBar } from "@/components/ui/searchbar";
import { FaTags } from "react-icons/fa6";

import NavBar from './NavBar';
import Sidebar from './Sidebar';
import CustomLayoutToggle from './CustomLayoutToggle';
import CustomSelect from './CustomSelect';
import SwipeCarousel from './SwipeCarousel';

const Home = () => { 
  const [collapsed, setCollapsed] = useState(true);
  const [format, setFormat] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [season, setSeason] = useState("");
  const [sort, setSort] = useState("Average Score");
  const [display, setDisplay] = useState("List");

  const seriesDisplay = (count) => {
    return [...Array(count)].map((_, i) => (
      <div key={i} className="flex flex-col gap-2">
        <div className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0"></div>
        <div className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0"></div>
      </div>
    ));
  }

  const ShowcaseSection = ({ heading, elements }) => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-white font-bold text-[1.5rem]">{heading}</h1>
        <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">
          View all
        </p>
      </div>

      <SwipeCarousel elements={elements}/>
    </div>
  );

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
                <CustomSelect
                  value={genre}
                  onChange={setGenre}
                  placeholder={"Genre"}
                  optional={true}
                  options={[
                    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo",
                    "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life",
                    "Sports", "Supernatural", "Thriller"
                  ]}
                />
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Year</h2>
                <CustomSelect
                  value={year}
                  onChange={setYear}
                  placeholder={"Year"}
                  optional={true}
                  options={yearsFrom1940()}
                />
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Season</h2>
                <CustomSelect
                  value={season}
                  onChange={setSeason}
                  placeholder={"Season"}
                  optional={true}
                  options={["Summer", "Autumn", "Winter", "Spring"]}
                />
              </div>

              <div className="flex flex-col w-[15%] gap-2">
                <h2 className="text-white font-bold text-[1.2rem]">Format</h2>
                <CustomSelect
                  value={format}
                  onChange={setFormat}
                  placeholder={"Format"}
                  optional={true}
                  options={["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music"]}
                />
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
                  <CustomSelect
                    value={sort}
                    onChange={setSort}
                    placeholder={"Sort"}
                    optional={false}
                    options={[
                      "Title", "Popularity", "Average Score", "Trending", "Favourites",
                      "Date Added", "Release Date"
                    ]}
                  />

                  <CustomLayoutToggle
                    value={display}
                    onChange={setDisplay}
                    options={[
                      { value: "List", icon: <ListBulletIcon /> },
                      { value: "Compact", icon: <HamburgerMenuIcon /> }
                    ]}
                  />
                </div>
              </div>
            )}
          </div>

          <ShowcaseSection heading={"For you"} elements={seriesDisplay(10)} />
          <ShowcaseSection heading={"Trending Now"} elements={seriesDisplay(10)} />
          <ShowcaseSection heading={"Popular This Season"} elements={seriesDisplay(10)} />
          <ShowcaseSection heading={"Upcoming Next Season"} elements={seriesDisplay(10)} />
          <ShowcaseSection heading={"All Time Popular"} elements={seriesDisplay(10)} />
        </div>
      </div>
    </>
  )
}

export default Home
