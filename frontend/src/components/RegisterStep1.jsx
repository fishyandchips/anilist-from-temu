import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

const RegisterStep1 = ({ nextStep, prevStep }) => {   
  return (
    <>
      <div className="text-white flex flex-col items-center w-screen h-screen">
        <div className="w-[33%]">
          <Progress value={33} className="mt-5 mb-3"/>
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="w-10 h-10 m-5 hover:cursor-pointer" onClick={prevStep}/>
            <div>
              <h3 className="opacity-50 text-[1.5rem]">Step 1 of 3</h3>
              <h3 className="text-[1.5rem] font-bold">Create a username</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[1.5rem] w-[33%] h-full items-center justify-center">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="username">Username</Label>
            <Input type="username" id="username" />
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

export default RegisterStep1
