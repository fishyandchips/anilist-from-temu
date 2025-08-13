import { useState, useEffect } from 'react';
import supabase from '@/config/supabaseClient';

import CustomToggle from './CustomToggle';
import NavBar from './NavBar';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';

const Settings = () => { 
  const [settings, setSettings] = useState("Profile");
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState({
    about: null,
    avatar: null,
    banner: null,
    created_at: null,
    genre_preferences: [],
    id: null,
    profile_color: null,
    site_theme: null,
    updated_at: null,
    username: null
  });

  const getSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    setEmail(user?.email);

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq('id', userId)
      .single();

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    setProfile(data);

    console.log(data);
  }

  const updateProfile = async (updates) => {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const { error } = await supabase
      .from("profile")
      .update(updates)
      .eq('id', userId);

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    console.log(updates);

    setProfile({ ...profile, ...updates });
  };

  useEffect(() => {
    getSettings();
  }, []);

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
            <ProfileSettings profile={profile} setProfile={setProfile} updateProfile={updateProfile} />
          ) : (
            <AccountSettings profile={profile} updateProfile={updateProfile} email={email} />
          )}  
        </div>
      </div>
    </>
  )
}

export default Settings
