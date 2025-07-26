import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon, UploadIcon, Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoSidebarCollapse } from "react-icons/go";
import { Textarea } from "@/components/ui/textarea";

import CustomToggle from './CustomToggle';
import NavBar from './NavBar';

const Settings = () => { 
  const [settings, setSettings] = useState("Profile");
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <>
      <NavBar currentPage="settings" />

      <div className="flex flex-row mt-[5rem]">
        <div className="fixed h-[calc(100vh-5rem)] w-[20%] bg-[#232323] flex flex-col gap-6 overflow-y-auto p-6">
          <CustomToggle
            value={settings}
            onChange={setSettings}
            label={"Settings"}
            options={["Profile", "Account"]}
          />
        </div>

        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 p-10 overflow-y-auto ml-[20%] w-[80vw]"> 
          {settings === "Profile" ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-row w-full">
                <div className="flex items-center w-[30%]">
                  <h2 className="text-white font-bold text-[1.2rem]">Profile Color</h2>
                </div>

                <div className="flex flex-row gap-5 items-center w-[70%]">
                  <div className="aspect-square w-[4rem] rounded-lg bg-[#7FC3FF] cursor-pointer"></div>
                  <div className="aspect-square w-[4rem] rounded-lg bg-[#A57FFF] cursor-pointer"></div>
                  <div className="aspect-square w-[4rem] rounded-lg bg-[#7FFFAE] cursor-pointer"></div>
                  <div className="aspect-square w-[4rem] rounded-lg bg-[#FFC17F] cursor-pointer"></div>
                  <div className="aspect-square w-[4rem] rounded-lg bg-[#FF7F7F] cursor-pointer"></div>
                  <div className="aspect-square w-[4rem] rounded-lg bg-[#FF7FCC] cursor-pointer"></div>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex items-center w-[30%]">
                  <h2 className="text-white font-bold text-[1.2rem]">Site Theme</h2>
                </div>

                <div className="flex flex-row gap-5 items-center w-[70%]">
                  <div className="aspect-square w-[3.5rem] rounded-lg bg-[#D9D9D9] text-[#3C3C3C] font-bold flex flex-col justify-end p-2 cursor-pointer">A</div>
                  <div className="aspect-square w-[3.5rem] rounded-lg bg-[#3C3C3C] text-[#D9D9D9] font-bold flex flex-col justify-end p-2 cursor-pointer">A</div>
                  <div className="aspect-square w-[3.5rem] rounded-lg bg-[#FFFFFF] text-[#000000] font-bold flex flex-col justify-end p-2 cursor-pointer">A</div>
                  <div className="aspect-square w-[3.5rem] rounded-lg bg-[#3C3C3C] text-[#D9D9D9] font-bold flex flex-col justify-end p-2 cursor-pointer">A</div>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex items-center w-[30%]">
                  <h2 className="text-white font-bold text-[1.2rem]">About</h2>
                </div>

                <div className="flex flex-row gap-5 items-center w-[70%]">
                  <Textarea placeholder="A little about yourself..." />
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col justify-center w-[30%] pr-20">
                  <h2 className="text-white font-bold text-[1.2rem]">Avatar</h2>
                  <p className="text-white text-[0.85rem] opacity-50">
                    Allowed Formats: JPEG, PNG. Max size: 3 MB. Optimal dimensions: 230x230
                  </p>
                </div>

                <div className="flex flex-row gap-5 items-center w-[70%]">
                  <Skeleton className="aspect-square w-[13rem] bg-[#3C3C3C]"/>
                  <div className="flex flex-col gap-3 w-[50%]">
                    <Button className="relative font-bold rounded-full w-full flex gap-4">
                      Upload image <UploadIcon />
                    </Button>

                    <Button variant="outlinedMain" className="relative font-bold rounded-full w-full flex gap-4">
                      Reset <Cross2Icon />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col justify-center w-[30%] pr-20">
                  <h2 className="text-white font-bold text-[1.2rem]">Banner</h2>
                  <p className="text-white text-[0.85rem] opacity-50">
                    Allowed Formats: JPEG, PNG. Max size: 6 MB. Optimal dimensions: 1700x330
                  </p>
                </div>

                <div className="flex flex-col gap-5 justify-center w-[70%]">
                  <Skeleton className="w-full h-[10rem] bg-[#3C3C3C]"/>
                  <div className="flex flex-col gap-3">
                    <Button className="relative font-bold rounded-full w-full flex gap-4">
                      Upload image <UploadIcon />
                    </Button>

                    <Button variant="outlinedMain" className="relative font-bold rounded-full w-full flex gap-4">
                      Reset <Cross2Icon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex flex-row w-full">
                <div className="flex items-center w-[30%]">
                  <h2 className="text-white font-bold text-[1.2rem]">Username</h2>
                </div>

                <div className="flex flex-col gap-10 items-center w-[70%]">
                  <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
                    <span className="text-white text-[1.1rem] opacity-50">Axolotl</span>
                    {!editUsername && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditUsername(true)}/>)}
                  </div>

                  {editUsername && (
                    <div className="flex flex-col w-full gap-4 text-white">
                      <Label htmlFor="username">New Username</Label>
                      <Input type="username" id="username" />

                      <div className="flex flex-row items-center justify-between w-full">
                        <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditUsername(false)}>
                          Cancel
                        </Button>

                        <Button className="relative font-bold rounded-full w-[48%]" onClick={() => setEditUsername(false)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex items-center w-[30%]">
                  <h2 className="text-white font-bold text-[1.2rem]">Email</h2>
                </div>

                <div className="flex flex-col gap-10 items-center w-[70%]">
                  <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
                    <span className="text-white text-[1.1rem] opacity-50">axolotl@email.com</span>
                    {!editEmail && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditEmail(true)}/>)}
                  </div>

                  {editEmail && (
                    <div className="flex flex-col w-full gap-4 text-white">
                      <Label htmlFor="email">New Email</Label>
                      <Input type="email" id="email" />

                      <div className="flex flex-row items-center justify-between w-full">
                        <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditEmail(false)}>
                          Cancel
                        </Button>

                        <Button className="relative font-bold rounded-full w-[48%]" onClick={() => setEditEmail(false)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex items-center w-[30%]">
                  <h2 className="text-white font-bold text-[1.2rem]">Password</h2>
                </div>

                <div className="flex flex-col gap-10 items-center w-[70%]">
                  <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
                    <div className="flex flex-row gap-1">
                      {[...Array(10)]
                        .map((_, i) => (
                          <div className="w-1 h-1 bg-white opacity-50 rounded-full"></div>
                      ))}
                    </div>
                    {!editPassword && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditPassword(true)}/>)}
                  </div>

                  {editPassword && (
                    <div className="flex flex-col w-full gap-4 text-white">
                      <Label htmlFor="password">New Password</Label>
                      <Input type="password" id="password" />

                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input type="confirm-password" id="confirm-password" />

                      <div className="flex flex-row items-center justify-between w-full">
                        <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditPassword(false)}>
                          Cancel
                        </Button>

                        <Button className="relative font-bold rounded-full w-[48%]" onClick={() => setEditPassword(false)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col justify-center w-[30%] pr-20">
                  <h2 className="text-white font-bold text-[1.2rem]">Reset List Scores</h2>
                  <p className="text-white text-[0.85rem] opacity-50">
                    Clear all your anime/manga list scores
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between w-[70%]">
                  <Button variant="warning" className="relative font-bold rounded-full w-[48%]">
                    Reset Anime List Scores
                  </Button>

                  <Button variant="warning" className="relative font-bold rounded-full w-[48%]">
                    Reset Manga List Scores
                  </Button>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col justify-center w-[30%] pr-20">
                  <h2 className="text-white font-bold text-[1.2rem]">Delete List</h2>
                  <p className="text-white text-[0.85rem] opacity-50">
                    Warning! This will permanently delete all your anime or manga list entries
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between w-[70%]">
                  <Button variant="warning" className="relative font-bold rounded-full w-[48%]">
                    Delete Anime List
                  </Button>

                  <Button variant="warning" className="relative font-bold rounded-full w-[48%]">
                    Delete Manga List
                  </Button>
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="flex flex-col justify-center w-[30%] pr-20">
                  <h2 className="text-white font-bold text-[1.2rem]">Delete Account</h2>
                  <p className="text-white text-[0.85rem] opacity-50">
                    Warning! This will permanently delete all your account data.
                  </p>
                </div>

                <div className="flex flex-row items-center w-[70%]">
                  <Button variant="warning" className="relative font-bold rounded-full w-[48%]">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}  
        </div>
      </div>



    </>
  )
}

export default Settings
