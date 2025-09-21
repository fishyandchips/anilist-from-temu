import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import NavBar from '../main/NavBar';
import FullListSidebar from './FullListSidebar';

import { useAtom } from 'jotai';
import { animeListAtom, mangaListAtom } from "@/atoms/listAtom";
import { visitedAtom } from '@/atoms/visitedAtom';
import { fetchListItems } from '../api/list';
import { fetchSeriesData } from '../api/info';

const FullList = ({ medium }) => { 
  const [list, setList] = useState("All");
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("Score");
  const [display, setDisplay] = useState("List");
  const [animeList, setAnimeList] = useAtom(animeListAtom);
  const [mangaList, setMangaList] = useAtom(mangaListAtom);
  const [visited, setVisited] = useAtom(visitedAtom);

  const navigate = useNavigate();

  const AnimeListTable = ({ data }) => (
    <Table>
      <TableHeader>
        <TableHead className="w-[50%] pl-5">Title</TableHead>
        <TableHead className="text-center">Score</TableHead>
        <TableHead className="text-center">Progress</TableHead>
        <TableHead className="text-center">Type</TableHead>
        <TableHead className="flex flex-row items-center justify-center"><ReloadIcon /></TableHead>
      </TableHeader>
      <TableBody className="text-white">
        {data.map(({ id, series_id, title, medium, rating, progress, re_count, coverImage, seriesFormat, seriesStatus }) => (
          <TableRow key={id} className="w-[50%] hover:cursor-pointer" onClick={() => navigate(`/${medium.toLowerCase()}/${series_id}/${title.english ? title.english.replaceAll(' ', '-') : title.romaji.replaceAll(' ', '-')}`)}>
            <TableCell className="flex flex-row items-center gap-5">
              {seriesStatus === "RELEASING" && <div className="w-1 h-5 bg-[#7FFFAE] rounded-sm absolute left-1" />}
              {seriesStatus === "NOT_YET_RELEASED" && <div className="w-1 h-5 bg-[#FF7F7F] rounded-sm absolute left-1" />}
              <div className="ml-2 w-10 h-10 bg-[#3C3C3C] rounded-sm flex-shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${coverImage.extraLarge})`}} />
              <span>{title.english ? title.english : title.romaji}</span>
            </TableCell>
            <TableCell className="text-center">{rating}</TableCell>
            <TableCell className="text-center">{progress}</TableCell>
            <TableCell className="text-center">{seriesFormat === "TV" ? seriesFormat : seriesFormat = seriesFormat.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}</TableCell>
            <TableCell className="text-center">{re_count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const MangaListTable = ({ data }) => (
    <Table>
      <TableHeader>
        <TableHead className="w-[50%] pl-5">Title</TableHead>
        <TableHead className="text-center">Score</TableHead>
        <TableHead className="text-center">Chapters</TableHead>
        <TableHead className="text-center">Volumes</TableHead>
        <TableHead className="text-center">Type</TableHead>
        <TableHead className="flex flex-row items-center justify-center"><ReloadIcon /></TableHead>
      </TableHeader>
      <TableBody className="text-white">
        {data.map(({ id, series_id, title, medium, rating, re_count, coverImage, seriesFormat, seriesStatus }) => (
          <TableRow key={id} className="w-[50%]">
            <TableCell className="flex flex-row items-center gap-5 hover:cursor-pointer" onClick={() => navigate(`/${medium.toLowerCase()}/${series_id}/${title.english ? title.english.replaceAll(' ', '-') : title.romaji.replaceAll(' ', '-')}`)}>
              {seriesStatus === "RELEASING" && <div className="w-1 h-5 bg-[#7FFFAE] rounded-sm absolute left-1" />}
              {seriesStatus === "NOT_YET_RELEASED" && <div className="w-1 h-5 bg-[#FF7F7F] rounded-sm absolute left-1" />}
              <div className="ml-2 w-10 h-10 bg-[#3C3C3C] rounded-sm flex-shrink-0" style={{backgroundImage: `url(${coverImage.extraLarge})`}} />
              <span>{title.english ? title.english : title.romaji}</span>
            </TableCell>
            <TableCell className="text-center">{rating}</TableCell>
            <TableCell className="text-center">150/150</TableCell>
            <TableCell className="text-center">8/8</TableCell>
            <TableCell className="text-center">{seriesFormat === "TV" ? seriesFormat : seriesFormat = seriesFormat.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}</TableCell>
            <TableCell className="text-center">{re_count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const data = await fetchListItems(medium);

        const newList = await Promise.all(
          data.map(async (item) => {
            let series;
            if (visited.has(item.series_id)) {
              series = visited.get(item.series_id);
            } else {
              try {
                series = await fetchSeriesData(item.series_id);
                console.log("Called API");
                setVisited(prev => new Map(prev).set(item.series_id, series));
              } catch (err) {
                alert(err.message);
                return null;
              }
            }

            console.log(series);

            const { title, coverImage, format, status, genres, startDate, endDate, averageScore, popularity, countryOfOrigin } = series;
            return { ...item, title, coverImage, seriesFormat: format, seriesStatus: status, genres, startDate, endDate, averageScore, popularity, countryOfOrigin };
          })
        );

        console.log(newList);

        if (medium === "anime") {
          setAnimeList(newList.filter(Boolean));
        } else {
          setMangaList(newList.filter(Boolean));
        }
      } catch (err) {
        alert(err.message);
      }
    }

    handleFetch();
  }, [setAnimeList, setMangaList, medium, setVisited]);

  useEffect(() => {
    const resetState = () => {
      setList("All");
      setFormat("");
      setStatus("");
      setGenre("");
      setCountry("");
      setSort("Score");
      setDisplay("List");
    }

    resetState();
  }, [medium]);

  const passesFilters = (data) => {
    const passesFormat = format === "" || data.seriesFormat === format.toUpperCase();
    const passesStatus = status === "" || data.seriesStatus.replaceAll("_", " ") === status.toUpperCase();
    const passesGenre = genre === "" || data.genres.some(g => g === genre);
    const countryMap = {
      JP: "Japan",
      CN: "China",
      KR: "South Korea",
      TW: "Taiwan",
    };
    const passesCountry = country === "" || countryMap[data.countryOfOrigin] === country;

    return passesFormat && passesStatus && passesGenre && passesCountry;
  }

  const handleSort = (a, b) => {
    switch (sort) {
      case "Title": {
        const a_title = a.title.english ? a.title.english : a.title.romaji;
        const b_title = b.title.english ? b.title.english : b.title.romaji;
        return a_title.localeCompare(b_title);
      }
      case "Score":
        return a.rating - b.rating;
      case "Progress":
        return a.progress - b.progress;
      case "Last Updated":
        return a.updated_at - b.updated_at;
      case "Last Added":
        return a.created_at - b.created_at;
      case "Start Date":
        return new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day) - new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day);
      case "Completed Date":
        return new Date(a.endDate.year, a.endDate.month - 1, a.endDate.day) - new Date(b.endDate.year, b.endDate.month - 1, b.endDate.day);
      case "Average Score":
        return a.averageScore - b.averageScore;
      case "Popularity":
        return a.popularity - b.popularity;
      default:
        break;
    }
  }

  return (
    <>
      <NavBar currentPage={`${medium === "anime" ? "animeList" : "mangaList"}`} />

      <div className="flex flex-row mt-[5rem]">
        <FullListSidebar
          list={list}
          setList={setList}
          format={format}
          setFormat={setFormat}
          status={status}
          setStatus={setStatus}
          genre={genre}
          setGenre={setGenre}
          country={country}
          setCountry={setCountry}
          sort={sort}
          setSort={setSort}
          display={display}
          setDisplay={setDisplay}
          medium={medium}
        />

        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 p-10 overflow-y-auto ml-[20%] w-[80vw]">
          {(list === "All" || list === "Completed") && (
            <div className="flex flex-col gap-2">
              <h1 className="text-white font-bold text-[2.5rem]">Completed</h1>
              {medium === "anime" ? 
                <AnimeListTable data={
                  animeList
                    .filter(data => passesFilters(data) && data.status === "Completed")
                    .sort((a, b) => handleSort(a, b))
                  } 
                /> :
                <MangaListTable data={
                  mangaList
                    .filter(data => passesFilters(data) && data.status === "Completed")
                    .sort((a, b) => handleSort(a, b))
                  } 
                />
              }
            </div>
          )}

          {(list === "All" || list === "Plan to Watch" || list === "Plan to Read") && (
            <div className="flex flex-col gap-2">
              {medium === "anime" ? (
                <>
                  <h1 className="text-white font-bold text-[2.5rem]">Plan to Watch</h1>
                  <AnimeListTable data={
                    animeList
                      .filter(data => passesFilters(data) && data.status === "Plan to Watch")
                      .sort((a, b) => handleSort(a, b))
                    } 
                  />
                </>
              ) : (
                <>
                  <h1 className="text-white font-bold text-[2.5rem]">Plan to Read</h1>
                  <MangaListTable data={
                    mangaList
                      .filter(data => passesFilters(data) && data.status === "Plan to Read")
                      .sort((a, b) => handleSort(a, b))
                    }
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FullList
