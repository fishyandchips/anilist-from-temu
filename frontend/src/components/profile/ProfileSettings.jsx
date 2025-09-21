import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

import { useAtom } from 'jotai';
import { profileAtom } from "@/atoms/profileAtom";
import { updateSettings, uploadImage, resetImage } from '../api/settings';

//////////////////////////////////////////////////////////////////
//                           CONSTANTS                          //
//////////////////////////////////////////////////////////////////

const PROFILE_COLOR_MAP = {
  blue: "#7FC3FF",
  purple: "#A57FFF",
  green: "#7FFFAE",
  orange: "#FFC17F",
  red: "#FF7F7F",
  pink: "#FF7FCC"
};

const SITE_THEME_MAP = {
  light: {
    bg: "#D9D9D9",
    text: "#3C3C3C"
  },
  dark: {
    bg: "#3C3C3C",
    text: "#D9D9D9"
  },
  high_contrast: {
    bg: "#FFFFFF",
    text: "#000000"
  },
  system: {
    bg: "#3C3C3C",
    text: "#D9D9D9"
  }
};

const ProfileSettings = () => { 
  //////////////////////////////////////////////////////////////////
  //                             STATE                            //
  //////////////////////////////////////////////////////////////////

  const [profile, setProfile] = useAtom(profileAtom);

  //////////////////////////////////////////////////////////////////
  //                           HANDLERS                           //
  //////////////////////////////////////////////////////////////////

  const handleUpdate = async (newSettings) => {
    const prevSettings = { ...profile };
    setProfile({ ...profile, ...newSettings });

    try {
      await updateSettings(newSettings);
    } catch (err) {
      setProfile(prevSettings);
      alert(`Failed to save: ${err.message}`);
    }
  }

  const handleUpload = async ({ e, bucket, maxMBSize, field }) => {
    try {
      const url = await uploadImage({ e, bucket, maxMBSize });
      handleUpdate({ [field]: url });
    } catch (err) {
      alert(err.message);
    }
  }

  const handleReset = async ({ bucket, field, url }) => {
    try {
      await resetImage({ bucket, url });
      handleUpdate({ [field]: null });
    } catch (err) {
      alert(err.message);
    }
  }

  //////////////////////////////////////////////////////////////////
  //                         UI COMPONENTS                        //
  //////////////////////////////////////////////////////////////////

  const ProfileColors = () => (
    <div className="flex flex-row w-full">
      <div className="flex items-center w-[30%]">
        <h2 className="text-white font-bold text-[1.2rem]">Profile Color</h2>
      </div>

      <div className="flex flex-row gap-5 items-center w-[70%]">
        {Object.entries(PROFILE_COLOR_MAP).map(([name, hex]) => (
          <div 
            key={name} 
            className={`aspect-square w-[4rem] rounded-lg cursor-pointer 
            ${profile.profile_color === name && "border-4 border-[#FFFFFF]"}`}
            style={{ backgroundColor: hex }} 
            onClick={() => handleUpdate({ profile_color: name })}
          />
        ))}
      </div>
    </div>
  )

  const SiteThemes = () => (
    <div className="flex flex-row w-full">
      <div className="flex items-center w-[30%]">
        <h2 className="text-white font-bold text-[1.2rem]">Site Theme</h2>
      </div>

      <div className="flex flex-row gap-5 items-center w-[70%]">
        {Object.entries(SITE_THEME_MAP).map(([name, colors]) => (
          <div 
            key={name}
            className={`aspect-square w-[3.5rem] rounded-lg
            cursor-pointer box-border relative
            ${profile.site_theme === name && "border-4 border-[#7FC3FF]"}`}
            style={{
              color: colors.text,
              background: name === "system" ? `linear-gradient(45deg, ${colors.bg} 50%, ${colors.text} 50%)` : colors.bg
            }}
            onClick={() => handleUpdate({ site_theme: name })}
          >
            <span className={`absolute bottom-0 left-0 m-2 ${profile.site_theme === name && "m-[0.25rem]"} font-bold`}>
              A
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  const About = () => (
    <div className="flex flex-row w-full">
      <div className="flex items-center w-[30%]">
        <h2 className="text-white font-bold text-[1.2rem]">About</h2>
      </div>

      <div className="flex flex-row gap-5 items-center w-[70%]">
        <Textarea 
          className="max-h-80"
          placeholder="A little about yourself..." 
          value={profile.about || ""}
          onChange={(e) => setProfile({ ...profile, about: e.target.value })}
          onBlur={() => handleUpdate({ about: profile.about })}
        />
      </div>
    </div>
  )

  const Avatar = () => (
    <div className="flex flex-row w-full">
      <div className="flex flex-col justify-center w-[30%] pr-20">
        <h2 className="text-white font-bold text-[1.2rem]">Avatar</h2>
        <p className="text-white text-[0.85rem] opacity-50">
          Allowed Formats: JPEG, PNG. Max size: 3 MB. Optimal dimensions: 230x230
        </p>
      </div>

      <div className="flex flex-row gap-5 items-center w-[70%]">
        {profile.avatar ? (
          <div className="aspect-square w-[13rem] bg-cover bg-center rounded-sm" style={{backgroundImage: `url(${profile.avatar})`}} />
        ) : (
          <Skeleton className="aspect-square w-[13rem] bg-[#3C3C3C]"/>
        )}
        <div className="flex flex-col gap-3 w-[50%] relative">
          <Label 
            htmlFor="avatar"
            className="font-bold rounded-full w-full flex gap-4 justify-center items-center bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-300 ease-in-out h-10 px-4 py-2 cursor-pointer"
          >
            Upload image <UploadIcon />
          </Label>
          <Input 
            type="file" 
            id="avatar" 
            className="hidden"
            onChange={(e) => handleUpload({ e, bucket: "avatars", maxMBSize: 3, field: "avatar" })}
          />

          <Button 
            variant="outlinedMain" 
            className="relative font-bold rounded-full w-full flex gap-4"
            onClick={() => handleReset({ bucket: "avatars", field: "avatar", url: profile.avatar })}
          >
            Reset <Cross2Icon />
          </Button>
        </div>
      </div>
    </div>
  )

  const Banner = () => (
    <div className="flex flex-row w-full">
      <div className="flex flex-col justify-center w-[30%] pr-20">
        <h2 className="text-white font-bold text-[1.2rem]">Banner</h2>
        <p className="text-white text-[0.85rem] opacity-50">
          Allowed Formats: JPEG, PNG. Max size: 6 MB. Optimal dimensions: 1700x330
        </p>
      </div>

      <div className="flex flex-col gap-5 justify-center w-[70%]">
        {profile.banner ? (
          <div className="w-full h-[10rem] bg-cover bg-center" style={{backgroundImage: `url(${profile.banner})`}} />
        ) : (
          <Skeleton className="w-full h-[10rem] bg-[#3C3C3C]"/>
        )}
        <div className="flex flex-col gap-3">
          <Label 
            htmlFor="banner"
            className="font-bold rounded-full w-full flex gap-4 justify-center items-center bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-300 ease-in-out h-10 px-4 py-2 cursor-pointer"
          >
            Upload image <UploadIcon />
          </Label>
          <Input 
            type="file" 
            id="banner" 
            className="hidden"
            onChange={(e) => handleUpload({ e, bucket: "banners", maxMBSize: 6, field: "banner" })}
          />

          <Button 
            variant="outlinedMain" 
            className="relative font-bold rounded-full w-full flex gap-4"
            onClick={() => handleReset({ bucket: "banners", field: "banner", url: profile.banner })}
          >
            Reset <Cross2Icon />
          </Button>
        </div>
      </div>
    </div>
  )

  //////////////////////////////////////////////////////////////////
  //                           COMPONENT                          //
  //////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="flex flex-col gap-10">
        <ProfileColors />
        <SiteThemes />
        <About />
        <Avatar />
        <Banner />
      </div>
    </>
  )
}

export default ProfileSettings
