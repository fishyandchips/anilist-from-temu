import { useState, useEffect } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { ListBulletIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
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

const AnimeListSidebar = () => { 
  const [list, setList] = useState("all");
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("score");
  const [display, setDisplay] = useState("list");

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
          <span className="text-[0.8rem] opacity-50 text-white w-full">Lists</span>
          <ToggleGroupItem value="all" className="w-full">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="completed" className="w-full">
            Completed
          </ToggleGroupItem>
          <ToggleGroupItem value="plan-to-watch" className="w-full">
            Plan to Watch
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] opacity-50 text-white w-full">Filters</span>

          <Select value={format} onValueChange={(value) => {if (value == "any") setFormat(""); else setFormat(value);}}>
            <SelectTrigger className={format ? "bg-primary/40 text-white" : "bg-[#3C3C3C] text-white"}>
              <SelectValue placeholder="Format" />
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

          <Select value={status} onValueChange={(value) => {if (value == "any") setStatus(""); else setStatus(value);}}>
            <SelectTrigger className={status ? "bg-primary/40 text-white" : "bg-[#3C3C3C] text-white"}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
              <SelectItem value="finished">Finished</SelectItem>
              <SelectItem value="releasing">Releasing</SelectItem>
              <SelectItem value="not-yet-released">Not Yet Released</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={genre} onValueChange={(value) => {if (value == "any") setGenre(""); else setGenre(value);}}>
            <SelectTrigger className={genre ? "bg-primary/40 text-white" : "bg-[#3C3C3C] text-white"}>
              <SelectValue placeholder="Genre" />
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

          <Select value={country} onValueChange={(value) => {if (value == "any") setCountry(""); else setCountry(value);}}>
            <SelectTrigger className={country ? "bg-primary/40 text-white" : "bg-[#3C3C3C] text-white"}>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="south-korea">South Korea</SelectItem>
              <SelectItem value="china">China</SelectItem>
              <SelectItem value="taiwan">Taiwan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] opacity-50 text-white w-full">Sort</span>

          <Select value={sort} onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="last-updated">Last Updated</SelectItem>
              <SelectItem value="last-added">Last Added</SelectItem>
              <SelectItem value="start-date">Start Date</SelectItem>
              <SelectItem value="completed-date">Completed Date</SelectItem>
              <SelectItem value="release-date">Release Date</SelectItem>
              <SelectItem value="average-score">Average Score</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
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
            <ToggleGroupItem value="list" className="flex justify-center items-center">
              <ListBulletIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="compact" className="flex justify-center items-center">
              <HamburgerMenuIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </>
  )
}

export default AnimeListSidebar
