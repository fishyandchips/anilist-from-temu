import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListBulletIcon, HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { SearchBar } from "@/components/ui/searchbar";
import { Skeleton } from "@/components/ui/skeleton";
import { FaTags } from "react-icons/fa6";

import NavBar from './NavBar';
import Sidebar from './Sidebar';
import CustomLayoutToggle from '../CustomLayoutToggle';
import CustomSelect from '../CustomSelect';
import SwipeCarousel from '../SwipeCarousel';

import { useAtom } from 'jotai';
import { 
  forYouAtom, 
  trendingNowAtom, 
  popularThisSeasonAtom,
   upcomingNextSeasonAtom, 
   allTimePopularAtom 
} from "@/atoms/homeAtom";
import { fetchHomeSeries } from '../api/home';

const Home = () => { 
  const [collapsed, setCollapsed] = useState(true);
  const [format, setFormat] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [season, setSeason] = useState("");
  const [sort, setSort] = useState("Average Score");
  const [display, setDisplay] = useState("List");

  const [forYou, setForYou] = useAtom(forYouAtom);
  const [trendingNow, setTrendingNow] = useAtom(trendingNowAtom);
  const [popularThisSeason, setPopularThisSeason] = useAtom(popularThisSeasonAtom);
  const [upcomingNextSeason, setUpcomingNextSeason] = useAtom(upcomingNextSeasonAtom);
  const [allTimePopular, setAllTimePopular] = useAtom(allTimePopularAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const data = await fetchHomeSeries();
        setForYou(data.forYou.recommendations.map(r => r.media));
        setTrendingNow(data.trendingNow.media);
        setPopularThisSeason(data.popularThisSeason.media);
        setUpcomingNextSeason(data.upcomingNextSeason.media);
        setAllTimePopular(data.allTimePopular.media);
      } catch (err) {
        alert(err.message);
      }
    };

    handleFetch();
  }, [setForYou, setTrendingNow, setPopularThisSeason, setUpcomingNextSeason, setAllTimePopular]);

  const seriesDisplay = (count) => {
    return [...Array(count)].map((_, i) => (
      <div key={i} className="flex flex-col gap-2">
        <Skeleton className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0" />
        <Skeleton className="w-[60%] h-[1rem] bg-[#3C3C3C] rounded-md shrink-0" />
      </div>
    ));
  }

  const sectionDisplay = (section) => {
    return section.map(({ id, title, coverImage, type }) => (
      <div key={id} className="flex flex-col gap-2 cursor-pointer" onClick={() => navigate(`/${type.toLowerCase()}/${id}/${title.english ? title.english.replaceAll(' ', '-') : title.romaji.replaceAll(' ', '-')}`)}>
        <div className="w-[12vw] h-[35vh] rounded-lg shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${coverImage.large})`}}></div>
        <h2 className="text-white text-[1rem]">{title.english ? title.english : title.romaji}</h2>
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
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-[32%] h-16 bg-[#3C3C3C] rounded-lg" />
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

          <ShowcaseSection heading={"For you"} elements={forYou.length !== 0 ? sectionDisplay(forYou) : seriesDisplay(10)} />
          <ShowcaseSection heading={"Trending Now"} elements={trendingNow.length !== 0 ? sectionDisplay(trendingNow) : seriesDisplay(10)} />
          <ShowcaseSection heading={"Popular This Season"} elements={popularThisSeason.length !== 0 ? sectionDisplay(popularThisSeason) : seriesDisplay(10)} />
          <ShowcaseSection heading={"Upcoming Next Season"} elements={upcomingNextSeason.length !== 0 ? sectionDisplay(upcomingNextSeason) : seriesDisplay(10)} />
          <ShowcaseSection heading={"All Time Popular"} elements={allTimePopular.length !== 0 ? sectionDisplay(allTimePopular) : seriesDisplay(10)} />
        </div>
      </div>
    </>
  )
}

export default Home
