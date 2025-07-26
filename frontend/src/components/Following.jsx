import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import NavBar from './NavBar';
import FollowingSidebar from './FollowingSidebar';

const followingData = [
  { name: "Cat", followerCount: 177 },
  { name: "Dugong", followerCount: 317 },
  { name: "Shrew", followerCount: 746 },
  { name: "Starfish", followerCount: 418 },
  { name: "Impala", followerCount: 102 },
  { name: "Parrot", followerCount: 237 },
  { name: "Turtle", followerCount: 785 },
  { name: "Chimpanzee", followerCount: 833 },
  { name: "Canary", followerCount: 78 },
  { name: "Puppy", followerCount: 279 },
  { name: "Squirrel", followerCount: 652 }
];

const followersData = [
  { name: "Cat", followerCount: 177 },
  { name: "Dugong", followerCount: 317 },
  { name: "Shrew", followerCount: 746 },
  { name: "Canary", followerCount: 78 },
  { name: "Squirrel", followerCount: 652 },
  { name: "Wolf", followerCount: 871 },
  { name: "Reindeer", followerCount: 306 },
  { name: "Aardvark", followerCount: 840 },
  { name: "Springbok", followerCount: 918 },
  { name: "Owl", followerCount: 53 },
  { name: "Crocodile", followerCount: 657 },
  { name: "Newt", followerCount: 367 },
  { name: "Bison", followerCount: 795 },
  { name: "Stallion", followerCount: 420 }
];

const UserCard = ({ name, followerCount }) => (
  <div className="w-[32%] h-[5rem] bg-[#3C3C3C] rounded-lg py-3 pl-3 pr-5 flex items-center justify-between gap-5 cursor-pointer">
    <div className="flex items-center gap-5 h-full">
      <Skeleton className="aspect-square h-full bg-[#282828] rounded-lg"></Skeleton>
      <div className="flex flex-col text-white">
        <h2 className="text-[1.2rem]">{name}</h2>
        <span className="opacity-50 text-[0.9rem]">{followerCount} followers</span>
      </div>
    </div>

    <DotsHorizontalIcon className="text-white w-6 h-6 cursor-pointer" />
  </div>
);

const UserListItem = ({ name, followerCount }) => (
  <div className="w-full h-[4rem] bg-[#3C3C3C] rounded-lg flex justify-between cursor-pointer">
    <div className="flex flex-row gap-5 h-full items-center">
      <Skeleton className="aspect-square h-full bg-[#282828] rounded-lg" />
      <h2 className="text-[1.2rem] text-white">{name}</h2>
    </div>

    <div className="flex flex-row gap-10 mr-5 h-full items-center">
      <span className="opacity-50 text-white">{followerCount} followers</span>
      <DotsHorizontalIcon className="text-white w-6 h-6 cursor-pointer" />
    </div>
  </div>
);

const UserList = ({ data, followStatus, display }) => (
  <div className="flex flex-col gap-2">
    <h1 className="text-white font-bold text-[2.5rem]">{followStatus}</h1>
    <div className={display === "Card" ? "flex flex-wrap gap-5 w-full" : "flex flex-col gap-2"}>
      {data.map(({ name, followerCount }) => (
        display === "Card" ?
          <UserCard key={name} name={name} followerCount={followerCount} /> :
          <UserListItem key={name} name={name} followerCount={followerCount} />
      ))}
    </div>
  </div>
);

const Following = () => { 
  const [followStatus, setFollowStatus] = useState("Following");
  const [sort, setSort] = useState("Date Followed");
  const [display, setDisplay] = useState("Card");

  return (
    <>
      <NavBar currentPage="following" />

      <div className="flex flex-row mt-[5rem]">
        <FollowingSidebar 
          followStatus={followStatus}
          setFollowStatus={setFollowStatus}
          sort={sort}
          setSort={setSort}
          display={display}
          setDisplay={setDisplay}
        />

        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 p-10 overflow-y-auto ml-[20%] w-[80vw]">
          <UserList 
            data={followStatus === "Following" ? followingData : followersData} 
            followStatus={followStatus} 
            display={display} 
          />
        </div>
      </div>
    </>
  )
}

export default Following
