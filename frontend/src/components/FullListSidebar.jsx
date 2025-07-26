import { useState, useEffect } from 'react';
import { ListBulletIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SearchBar } from "@/components/ui/searchbar";

import CustomToggle from './CustomToggle';
import CustomLayoutToggle from './CustomLayoutToggle';
import CustomSelect from './CustomSelect';

const FullListSidebar = ({
  list, setList,
  format, setFormat,
  status, setStatus,
  genre, setGenre,
  country, setCountry,
  sort, setSort,
  display, setDisplay,
  medium
}) => { 
  return (
    <>
      <div className="fixed h-[calc(100vh-5rem)] w-[20%] bg-[#232323] flex flex-col gap-6 overflow-y-auto p-6">
        <SearchBar />

        <CustomToggle
          value={list}
          onChange={setList}
          label="Lists"
          options={["All", "Completed", medium === "anime" ? "Plan to Watch" : "Plan to Read"]}
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] opacity-50 text-white w-full">Filters</span>

          {medium === "anime" ? (
            <>
              <CustomSelect
                value={format}
                onChange={setFormat}
                placeholder={"Format"}
                optional={true}
                options={["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music"]}
              />

              <CustomSelect
                value={status}
                onChange={setStatus}
                placeholder={"Status"}
                optional={true}
                options={["Finished", "Releasing", "Not Yet Released", "Cancelled"]}
              />
            </>
          ) : (
            <>
              <CustomSelect
                value={format}
                onChange={setFormat}
                placeholder={"Format"}
                optional={true}
                options={["Manga", "Light Novel", "One Shot"]}
              />

              <CustomSelect
                value={status}
                onChange={setStatus}
                placeholder={"Status"}
                optional={true}
                options={["Finished", "Releasing", "Hiatus", "Not Yet Released", "Cancelled"]}
              />
            </>
          )}

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

          <CustomSelect
            value={country}
            onChange={setCountry}
            placeholder={"Country"}
            optional={true}
            options={["Japan", "South Korea", "China", "Taiwan"]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] opacity-50 text-white w-full">Sort</span>

          <CustomSelect
            value={sort}
            onChange={setSort}
            placeholder={"Sort"}
            optional={false}
            options={[
              "Title", "Score", "Progress", "Last Updated", "Last Added",
              "Start Date", "Completed Date", "Release Date", "Average Score", "Popularity"
            ]}
          />
        </div>

        <div className="w-full flex justify-start">
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
    </>
  )
}

export default FullListSidebar
