import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";

import { useAtom } from 'jotai';
import { profileAtom } from "@/atoms/profileAtom";
import { emailAtom } from "@/atoms/emailAtom";
import { updateSettings, updateEmail, updatePassword, deleteScores, deleteList } from '../api/settings';

const AccountSettings = () => {
  //////////////////////////////////////////////////////////////////
  //                             STATE                            //
  //////////////////////////////////////////////////////////////////

  const [profile, setProfile] = useAtom(profileAtom);
  const [email, ] = useAtom(emailAtom);

  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const usernameForm = useForm({ defaultValues: { username: profile.username || "" } });
  const emailForm = useForm({ defaultValues: { email: email || "" } });
  const passwordForm = useForm({ defaultValues: { password: "", confirmPassword: "" } });

  //////////////////////////////////////////////////////////////////
  //                           HANDLERS                           //
  //////////////////////////////////////////////////////////////////

  const handleUpdateUsername = async (data) => {
    const prevSettings = { ...profile };
    setProfile({ ...profile, username: data.username });
    setEditingUsername(false);
    usernameForm.reset({ username: data.username });

    try {
      await updateSettings({ username: data.username });
    } catch (err) {
      setProfile(prevSettings);
      alert(`Failed to save changes: ${err.message}`);
    }
  }

  const handleUpdateEmail = async (data) => {
    try {
      await updateEmail(data);
      setEditingEmail(false);
      emailForm.reset({ email: data.email });
    } catch (err) {
      alert(err.message);
    }
  }

  const handleUpdatePassword = async (data) => {
    try {
      await updatePassword(data);
      setEditingPassword(false);
      passwordForm.reset({ password: "", confirmPassword: "" });
    } catch (err) {
      alert(err.message);
    }
  }

  const handleDeleteScores = async (medium) => {
     try {
      await deleteScores(medium);
    } catch (err) {
      alert(err.message);
    }
  }

  const handleDeleteList = async (medium) => {
     try {
      await deleteList(medium);
    } catch (err) {
      alert(err.message);
    }
  }

  //////////////////////////////////////////////////////////////////
  //                         UI COMPONENTS                        //
  //////////////////////////////////////////////////////////////////

  const Username = () => (
    <form onSubmit={usernameForm.handleSubmit(handleUpdateUsername)}>
      <div className="flex flex-row w-full">
        <div className="flex items-center w-[30%]">
          <h2 className="text-white font-bold text-[1.2rem]">Username</h2>
        </div>

        <div className="flex flex-col gap-10 items-center w-[70%]">
          <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
            <span className="text-white text-[1.1rem] opacity-50">{profile.username}</span>
            {!editingUsername && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditingUsername(true)}/>)}
          </div>

          {editingUsername && (
            <div className="flex flex-col w-full gap-4 text-white">
              <Label htmlFor="username">New Username</Label>
              <Input 
                {...usernameForm.register("username", {
                  required: "Username is required"
                })}
                type="username" 
                id="username" 
                className={usernameForm.formState.errors.username ? "border-[#FF7F7F]" : ""}
              />
              {usernameForm.formState.errors.username && (
                <p className="text-[#FF7F7F] text-[0.8rem]">{usernameForm.formState.errors.username.message}</p>
              )}

              <div className="flex flex-row items-center justify-between w-full">
                <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditingUsername(false)}>
                  Cancel
                </Button>

                <Button className="relative font-bold rounded-full w-[48%]" type="submit">
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )

  const Email = () => (
    <form onSubmit={emailForm.handleSubmit(handleUpdateEmail)}>
      <div className="flex flex-row w-full">
        <div className="flex items-center w-[30%]">
          <h2 className="text-white font-bold text-[1.2rem]">Email</h2>
        </div>

        <div className="flex flex-col gap-10 items-center w-[70%]">
          <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
            <span className="text-white text-[1.1rem] opacity-50">{email}</span>
            {!editingEmail && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditingEmail(true)}/>)}
          </div>

          {editingEmail && (
            <div className="flex flex-col w-full gap-4 text-white">
              <Label htmlFor="email">New Email</Label>
              <Input 
                {...emailForm.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
                type="email" 
                id="email" 
                className={emailForm.formState.errors.email ? "border-[#FF7F7F]" : ""}
              />
              {emailForm.formState.errors.email && (
                <p className="text-[#FF7F7F] text-[0.8rem]">{emailForm.formState.errors.email.message}</p>
              )}

              <div className="flex flex-row items-center justify-between w-full">
                <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditingEmail(false)}>
                  Cancel
                </Button>

                <Button className="relative font-bold rounded-full w-[48%]" type="submit">
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )

  const Password = () => (
    <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}>
      <div className="flex flex-row w-full">
        <div className="flex items-center w-[30%]">
          <h2 className="text-white font-bold text-[1.2rem]">Password</h2>
        </div>

        <div className="flex flex-col gap-10 items-center w-[70%]">
          <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
            <div className="flex flex-row gap-1">
              {[...Array(10)]
                .map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white opacity-50 rounded-full"></div>
              ))}
            </div>
            {!editingPassword && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditingPassword(true)}/>)}
          </div>

          {editingPassword && (
            <div className="flex flex-col w-full gap-4 text-white">
              <Label htmlFor="password">New Password</Label>
              <Input 
                {...passwordForm.register("password", {
                  required: "Password is required",
                })}
                type="password"
                id="password"
                className={passwordForm.formState.errors.password ? "border-[#FF7F7F]" : ""}
              />
              {passwordForm.formState.errors.password && (
                <p className="text-[#FF7F7F] text-[0.8rem]">{passwordForm.formState.errors.password.message}</p>
              )}

              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                {...passwordForm.register("confirmPassword", {
                  validate: (value) => {
                    if (value !== passwordForm.getValues("password")) {
                      return "Passwords do not match";
                    }

                    return true;
                  }
                })}
                type="password" 
                id="confirmPassword"
                className={passwordForm.formState.errors.confirmPassword ? "border-[#FF7F7F]" : ""}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-[#FF7F7F] text-[0.8rem]">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}

              <div className="flex flex-row items-center justify-between w-full">
                <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditingPassword(false)}>
                  Cancel
                </Button>

                <Button className="relative font-bold rounded-full w-[48%]" type="submit">
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )

  const ResetListScores = () => (
    <div className="flex flex-row w-full">
      <div className="flex flex-col justify-center w-[30%] pr-20">
        <h2 className="text-white font-bold text-[1.2rem]">Reset List Scores</h2>
        <p className="text-white text-[0.85rem] opacity-50">
          Clear all your anime/manga list scores
        </p>
      </div>

      <div className="flex flex-row items-center justify-between w-[70%]">
        <Button variant="warning" className="relative font-bold rounded-full w-[48%]" onClick={() => handleDeleteScores("anime")}>
          Reset Anime List Scores
        </Button>

        <Button variant="warning" className="relative font-bold rounded-full w-[48%]" onClick={() => handleDeleteScores("manga")}>
          Reset Manga List Scores
        </Button>
      </div>
    </div>
  )

  const DeleteList = () => (
    <div className="flex flex-row w-full">
      <div className="flex flex-col justify-center w-[30%] pr-20">
        <h2 className="text-white font-bold text-[1.2rem]">Delete List</h2>
        <p className="text-white text-[0.85rem] opacity-50">
          Warning! This will permanently delete all your anime or manga list entries
        </p>
      </div>

      <div className="flex flex-row items-center justify-between w-[70%]">
        <Button variant="warning" className="relative font-bold rounded-full w-[48%]" onClick={() => handleDeleteList("anime")}>
          Delete Anime List
        </Button>

        <Button variant="warning" className="relative font-bold rounded-full w-[48%]" onClick={() => handleDeleteList("manga")}>
          Delete Manga List
        </Button>
      </div>
    </div>
  )

  const DeleteAccount = () => (
    <div className="flex flex-row w-full">
      <div className="flex flex-col justify-center w-[30%] pr-20">
        <h2 className="text-white font-bold text-[1.2rem]">Delete Account</h2>
        <p className="text-white text-[0.85rem] opacity-50">
          Warning! This will permanently delete all your account data.
        </p>
      </div>

      <div className="flex flex-row items-center w-[70%]">
        <Button 
          variant="warning" 
          className="relative font-bold rounded-full w-[48%]"
        >
          Delete Account
        </Button>
      </div>
    </div>
  )

  //////////////////////////////////////////////////////////////////
  //                           COMPONENT                          //
  //////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="flex flex-col gap-10">
        <Username />
        <Email />
        <Password />
        <ResetListScores />
        <DeleteList />
        <DeleteAccount />
      </div>
    </>
  );
}

export default AccountSettings