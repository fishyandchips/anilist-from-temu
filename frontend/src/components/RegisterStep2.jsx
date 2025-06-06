import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { FaCircleCheck } from "react-icons/fa6";

const RegisterStep2 = ({ nextStep, prevStep }) => {  
  return (
    <>
      <div className="text-white flex flex-col items-center w-screen h-screen">
        <div className="w-[33%]">
          <Progress value={66} className="mt-5 mb-3"/>
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="w-10 h-10 m-5 hover:cursor-pointer" onClick={prevStep}/>
            <div>
              <h3 className="opacity-50 text-[1.5rem]">Step 2 of 3</h3>
              <h3 className="text-[1.5rem] font-bold">Create a password</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[1.5rem] w-[33%] h-full items-center justify-center">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password"></Input>
          </div>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input type="confirm-password" id="confirm-password" />
          </div>

          <div className="w-full">
            <h3 className="font-bold mb-2">Your password must contain at least:</h3>
            <ul className="flex flex-row items-center gap-3 p-2.5 ml-2">
              <FaCircleCheck style={{ color: '#81FFBA' }} className="w-5 h-5"/>
              1 letter
            </ul>
            <ul className="flex flex-row items-center gap-3 p-2.5 ml-2">
              <div className="w-5 h-5 rounded-full border-2 border-white border-opacity-50"></div>
              1 number/special character
            </ul>
            <ul className="flex flex-row items-center gap-3 p-2.5 ml-2">
              <div className="w-5 h-5 rounded-full border-2 border-white border-opacity-50"></div>
              10 characters
            </ul>
          </div>

          <div className="flex items-center justify-center gap-2 md:flex-row w-full">
            <Button className="relative font-bold rounded-full w-full" onClick={nextStep}>
              Next <ArrowRightIcon className="absolute right-4"/>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterStep2
