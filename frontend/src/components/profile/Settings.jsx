import { useState, useEffect } from 'react';

import CustomToggle from '../CustomToggle';
import NavBar from '../main/NavBar';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';

import { useAtom } from 'jotai';
import { profileAtom } from "@/atoms/profileAtom";
import { emailAtom } from "@/atoms/emailAtom";
import { fetchSettings } from '../api/settings';

const Settings = () => { 
  const [settings, setSettings] = useState("Profile");
  const [, setProfile] = useAtom(profileAtom);
  const [, setEmail] = useAtom(emailAtom);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const { data, email } = await fetchSettings();
        setProfile(data);
        setEmail(email);
      } catch (err) {
        alert(err.message);
      }
    };

    handleFetch();
  }, [setProfile, setEmail]);

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
            <ProfileSettings />
          ) : (
            <AccountSettings />
          )}
        </div>
      </div>
    </>
  )
}

export default Settings
