import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import supabase from '@/config/supabaseClient';

const AccountSettings = ({ profile, updateProfile, email }) => {
  const navigate = useNavigate();

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const usernameForm = useForm({ defaultValues: { username: profile.username || "" } });
  const emailForm = useForm({ defaultValues: { email: email || "" } });
  const passwordForm = useForm({ defaultValues: { password: "", confirmPassword: "" } });

  const submitUsername = (data) => {
    updateProfile({ username: data.username });
    setEditUsername(false);
    usernameForm.reset({ username: data.username });
  };

  const submitEmail = async (data) => {
    const { error } = await supabase.auth.updateUser({ email: data.email });
    if (error) {
      alert(`Error updating email: ${error.message}`);
      return;
    }
    setEditEmail(false);
    emailForm.reset({ email: data.email });
  };

  const submitPassword = async (data) => {
    const { error } = await supabase.auth.updateUser({ password: data.password });
    if (error) {
      alert(`Error updating password: ${error.message}`);
      return;
    }
    setEditPassword(false);
    passwordForm.reset({ password: "", confirmPassword: "" });
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <form onSubmit={usernameForm.handleSubmit(submitUsername)}>
          <div className="flex flex-row w-full">
            <div className="flex items-center w-[30%]">
              <h2 className="text-white font-bold text-[1.2rem]">Username</h2>
            </div>

            <div className="flex flex-col gap-10 items-center w-[70%]">
              <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
                <span className="text-white text-[1.1rem] opacity-50">{profile.username}</span>
                {!editUsername && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditUsername(true)}/>)}
              </div>

              {editUsername && (
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
                    <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditUsername(false)}>
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
        
        <form onSubmit={emailForm.handleSubmit(submitEmail)}>
          <div className="flex flex-row w-full">
            <div className="flex items-center w-[30%]">
              <h2 className="text-white font-bold text-[1.2rem]">Email</h2>
            </div>

            <div className="flex flex-col gap-10 items-center w-[70%]">
              <div className="flex flex-row justify-between items-center rounded-lg p-4 w-full bg-[#3C3C3C] h-[3.5rem]">
                <span className="text-white text-[1.1rem] opacity-50">{email}</span>
                {!editEmail && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditEmail(true)}/>)}
              </div>

              {editEmail && (
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
                    <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditEmail(false)}>
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

        <form onSubmit={passwordForm.handleSubmit(submitPassword)}>
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
                {!editPassword && (<Pencil1Icon className="w-6 h-6 text-white cursor-pointer" onClick={() => setEditPassword(true)}/>)}
              </div>

              {editPassword && (
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
                    <Button variant="outlinedMain" className="relative font-bold rounded-full w-[48%]" onClick={() => setEditPassword(false)}>
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
            <Button 
              variant="warning" 
              className="relative font-bold rounded-full w-[48%]"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSettings