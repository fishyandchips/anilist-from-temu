import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Login = () => {  
  return (
    <>
      <div className="text-white flex flex-col gap-[3rem] items-center justify-center w-screen h-screen">
        <h1 className="text-[3rem] font-bold">Sign in</h1>

        <div className="flex flex-col gap-[1.5rem] w-[33%] items-center justify-center">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" id="email" />
          </div>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>

          <div className="flex items-center justify-center gap-2 md:flex-row w-full">
            <Button className="relative font-bold rounded-full w-full">
              Log in <ArrowRightIcon className="absolute right-4"/>
            </Button>
          </div>

          <Link to="/register" className="text-white underline underline-offset-2 hover:text-white/80 transition-all duration-300 ease-in-out">Forgot your password?</Link>

          <div className="relative w-[90%] flex justify-center items-center">
            <div className="absolute top-[50%] w-full border-b-2 border-white"></div>
            <span className="bg-[#282828] p-5 z-20">or</span>
          </div>

          <div className="flex items-center justify-center gap-2 md:flex-row w-full">
            <Button variant="outlined" className="relative font-bold rounded-full w-full">
              <FcGoogle className="mr-1" />
              Continue with Google
            </Button>
          </div>

          <div>
            <span className="opacity-50">Don't have an account? </span>
            <Link to="/register" className="text-white underline underline-offset-2 hover:text-white/80 transition-all duration-300 ease-in-out">Create one here.</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
