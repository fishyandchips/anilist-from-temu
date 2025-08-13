import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import supabase from '@/config/supabaseClient';

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

const ProfileSettings = ({ profile, setProfile, updateProfile }) => { 
  const uploadImage = async ({ e, bucket, maxMBSize, field }) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert("Only JPEG or PNG files are allowed.");
      return;
    }

    if (file.size > maxMBSize * 1024 * 1024) {
      alert(`File exceeds ${maxMBSize} MB limit.`);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(`${userId}_${file.name}`, file, { upsert: true });

    if (error) {
      alert(`Upload failed: ${error.message}`);
      return;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${userId}_${file.name}`);

    await updateProfile({ [field]: data.publicUrl });

    e.target.value = "";
  }

  const resetImage = async ({ bucket, field, url }) => {
    if (!url) {
      return;
    }

    const fileName = url.split('/').pop();

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      alert(`Reset failed: ${error.message}`);
      return;
    }

    await updateProfile({ [field]: null });
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row w-full">
          <div className="flex items-center w-[30%]">
            <h2 className="text-white font-bold text-[1.2rem]">Profile Color</h2>
          </div>

          <div className="flex flex-row gap-5 items-center w-[70%]">
            {Object.entries(PROFILE_COLOR_MAP).map(([name, hex]) => (
              <div 
                key={name} 
                className={`aspect-square w-[4rem] rounded-lg bg-[${hex}] cursor-pointer 
                ${profile.profile_color === name && "border border-4 border-[#FFFFFF]"}`} 
                onClick={() => updateProfile({ profile_color: name })}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row w-full">
          <div className="flex items-center w-[30%]">
            <h2 className="text-white font-bold text-[1.2rem]">Site Theme</h2>
          </div>

          <div className="flex flex-row gap-5 items-center w-[70%]">
            {Object.entries(SITE_THEME_MAP).map(([name, colors]) => (
              <div 
                key={name}
                className={`aspect-square w-[3.5rem] rounded-lg bg-[${colors.bg}] text-[${colors.text}] 
                cursor-pointer box-border relative
                ${profile.site_theme === name && "border-4 border-[#7FC3FF]"}`}
                style={{
                  background: name === "system" && `linear-gradient(45deg, ${colors.bg} 50%, ${colors.text} 50%)`
                }}
                onClick={() => updateProfile({ site_theme: name })}
              >
                <span className={`absolute bottom-0 left-0 m-2 ${profile.site_theme === name && "m-[0.25rem]"} font-bold`}>
                  A
                </span>
              </div>
            ))}
          </div>
        </div>

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
              onBlur={() => updateProfile({ about: profile.about })}
            />
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
            {profile.avatar ? (
              <div className="aspect-square w-[13rem] bg-cover bg-center" style={{backgroundImage: `url(${profile.avatar})`}} />
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
                onChange={(e) => uploadImage({ e, bucket: "avatars", maxMBSize: 3, field: "avatar" })}
              />

              <Button 
                variant="outlinedMain" 
                className="relative font-bold rounded-full w-full flex gap-4"
                onClick={() => resetImage({ bucket: "avatars", field: "avatar", url: profile.avatar })}
              >
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
                onChange={(e) => uploadImage({ e, bucket: "banners", maxMBSize: 6, field: "banner" })}
              />

              <Button 
                variant="outlinedMain" 
                className="relative font-bold rounded-full w-full flex gap-4"
                onClick={() => resetImage({ bucket: "banners", field: "banner", url: profile.banner })}
              >
                Reset <Cross2Icon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileSettings
