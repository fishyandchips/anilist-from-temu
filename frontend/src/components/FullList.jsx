import { useState, useEffect } from 'react';
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from '@/config/supabaseClient';

import NavBar from './NavBar';
import FullListSidebar from './FullListSidebar';


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
      {data.map(({ id, created_at, updated_at, finished_at, series_id, title, user_id, type, status, rating, progress, re_count }) => (
        <TableRow key={id} className="w-[50%]">
          <TableCell className="flex flex-row items-center gap-5">
            {title.length > 30 && <div className="w-1 h-5 bg-[#7FFFAE] rounded-sm absolute left-1" />}
            {title.length < 15 && <div className="w-1 h-5 bg-[#FF7F7F] rounded-sm absolute left-1" />}
            <div className="ml-2 w-10 h-10 bg-[#3C3C3C] rounded-sm hover:cursor-pointer flex-shrink-0" />
            <span>{title}</span>
          </TableCell>
          <TableCell className="text-center">{rating}</TableCell>
          <TableCell className="text-center">{progress}</TableCell>
          <TableCell className="text-center">{type}</TableCell>
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
      {data.map(({ id, created_at, updated_at, finished_at, series_id, title, user_id, type, status, rating, progress, re_count }) => (
        <TableRow key={id} className="w-[50%]">
          <TableCell className="flex flex-row items-center gap-5">
            {title.length > 30 && <div className="w-1 h-5 bg-[#7FFFAE] rounded-sm absolute left-1" />}
            {title.length < 15 && <div className="w-1 h-5 bg-[#FF7F7F] rounded-sm absolute left-1" />}
            <div className="ml-2 w-10 h-10 bg-[#3C3C3C] rounded-sm hover:cursor-pointer flex-shrink-0" />
            <span>{title}</span>
          </TableCell>
          <TableCell className="text-center">{rating}</TableCell>
          <TableCell className="text-center">150/150</TableCell>
          <TableCell className="text-center">8/8</TableCell>
          <TableCell className="text-center">{type}</TableCell>
          <TableCell className="text-center">{re_count}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const FullList = ({ medium }) => { 
  const [list, setList] = useState("All");
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("Score");
  const [display, setDisplay] = useState("List");
  const [listData, setListData] = useState([{
    id: null,
    created_at: null,
    updated_at: null,
    finished_at: null,
    series_id: null,
    title: "",
    user_id: null,
    type: null,
    status: null,
    rating: null,
    progress: null,
    re_count: null
  }]);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const { data, error } = await supabase
      .from("list_items")
      .select("*")
      .eq('user_id', userId)
      .eq("type", medium)
    ;

    if (error) {
      alert(`Error fetching data: ${error.message}`);
      return;
    }

    console.log(data);

    setListData(data);
  }

  useEffect(() => {
    fetchData();
  }, [medium]);

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
                <AnimeListTable data={listData.filter(data => data.status === "Completed")} /> :
                <MangaListTable data={listData.filter(data => data.status === "Completed")} />
              }
            </div>
          )}

          {(list === "All" || list === "Plan to Watch" || list === "Plan to Read") && (
            <div className="flex flex-col gap-2">
              {medium === "anime" ? (
                <>
                  <h1 className="text-white font-bold text-[2.5rem]">Plan to Watch</h1>
                  <AnimeListTable data={listData.filter(data => data.status === "Plan to Watch")} />
                </>
              ) : (
                <>
                  <h1 className="text-white font-bold text-[2.5rem]">Plan to Read</h1>
                  <MangaListTable data={listData.filter(data => data.status === "Plan to Read")} />
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
