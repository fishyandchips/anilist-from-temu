import { useState, useEffect } from 'react';
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
  const renderSelect = ({ value, onChange, placeholder, optional, options }) => (
    <Select value={value} onValueChange={(val) => onChange(val === "any" ? "" : val)}>
      <SelectTrigger className={value && optional ? "bg-primary/40 text-white" : "bg-[#3C3C3C] text-white"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optional && (
          <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
        )}
        {options.map(opt => (
          <SelectItem value={opt}>{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

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
          <ToggleGroupItem value="all" className="w-full">All</ToggleGroupItem>
          <ToggleGroupItem value="completed" className="w-full">Completed</ToggleGroupItem>
          {medium === "anime" ? (
            <ToggleGroupItem value="plan-to-watch" className="w-full">Plan to Watch</ToggleGroupItem>
          ) : (
            <ToggleGroupItem value="plan-to-watch" className="w-full">Plan to Read</ToggleGroupItem>
          )}
        </ToggleGroup>

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] opacity-50 text-white w-full">Filters</span>

          {medium === "anime" ? (
            <>
              {renderSelect({
                value: format,
                onChange: setFormat,
                placeholder: "Format",
                optional: true,
                options: ["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music"]
              })}

              {renderSelect({
                value: status,
                onChange: setStatus,
                placeholder: "Status",
                optional: true,
                options: ["Finished", "Releasing", "Not Yet Released", "Cancelled"]
              })}
            </>
          ) : (
            <>
              {renderSelect({
                value: format,
                onChange: setFormat,
                placeholder: "Format",
                optional: true,
                options: ["Manga", "Light Novel", "One Shot"]
              })}

              {renderSelect({
                value: status,
                onChange: setStatus,
                placeholder: "Status",
                optional: true,
                options: ["Finished", "Releasing", "Hiatus", "Not Yet Released", "Cancelled"]
              })}
            </>
          )}

          {renderSelect({
            value: genre,
            onChange: setGenre,
            placeholder: "Genre",
            optional: true,
            options: [
              "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo",
              "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life",
              "Sports", "Supernatural", "Thriller"
            ]
          })}

          {renderSelect({
            value: country,
            onChange: setCountry,
            placeholder: "Country",
            optional: true,
            options: ["Japan", "South Korea", "China", "Taiwan"]
          })}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] opacity-50 text-white w-full">Sort</span>

          {renderSelect({
            value: sort,
            onChange: setSort,
            placeholder: "Sort",
            optional: false,
            options: [
              "Title", "Score", "Progress", "Last Updated", "Last Added",
              "Start Date", "Completed Date", "Release Date", "Average Score", "Popularity"
            ]
          })}
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

export default FullListSidebar
