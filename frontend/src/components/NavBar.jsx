import { Link, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PersonIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { MdOutlinePeople } from "react-icons/md";
import { Button } from "@/components/ui/button";
import supabase from '@/config/supabaseClient';

const Navbar = ({ currentPage }) => {  
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(`Signout error: ${error.message}`);
      return;
    }

    navigate('/register');
  }
  
  return (
    <>
      <div className="text-white flex flex-col gap-[3rem] items-center justify-center w-screen h-20 fixed bg-[#282828] z-50 top-0">
        <div className="flex justify-between w-[97%] border-b border-white border-opacity-20 z-20">
          <div className="flex flex-row gap-10 p-3 items-center">
            <Link to="/home" className="text-[2.5rem] font-bold">A<span className="text-[#7FB6FF]">L</span></Link>
            <Link to="/animelist" className={`text-[1.1rem] ${currentPage === 'animeList' ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>Anime List</Link>
            <Link to="/mangalist" className={`text-[1.1rem] ${currentPage === 'mangaList' ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-all duration-300 ease-in-out`}>Manga List</Link>
          </div>

          <div className="flex items-center justify-center p-3">  
            <Popover>
              <PopoverTrigger>
                <div className="w-12 h-12 rounded-full border-2 border-white hover:cursor-pointer"></div>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 bg-white border-0">
                <div className="flex flex-row items-center gap-5 hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => navigate('/profile')}>
                  <PersonIcon className="w-5 h-5" />
                  <span className="text-[1.1rem]">Profile</span>
                </div>

                <div className="flex flex-row items-center gap-5 hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => navigate('/following')}>
                  <MdOutlinePeople className="w-5 h-5" />
                  <span className="text-[1.1rem]">Following</span>
                </div>

                <div className="flex flex-row items-center gap-5 hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => navigate('/settings')}>
                  <GearIcon className="w-5 h-5" />
                  <span className="text-[1.1rem]">Settings</span>
                </div>

                <Button className="relative font-bold rounded-full w-full" onClick={signOut}>
                  Log out <ExitIcon className="w-5 h-5" />
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Navbar
