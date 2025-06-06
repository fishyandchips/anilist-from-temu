import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const RegisterStep3 = ({ prevStep }) => {
  const navigate = useNavigate();

  const genres = [
    "Action", 
    "Adventure", 
    "Comedy", 
    "Drama", 
    "Ecchi", 
    "Fantasy",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller"
  ];

  return (
    <>
      <div className="text-white flex flex-col items-center w-screen h-screen">
        <div className="w-[33%]">
          <Progress value={100} className="mt-5 mb-3"/>
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="w-10 h-10 m-5 hover:cursor-pointer" onClick={prevStep}/>
            <div>
              <h3 className="opacity-50 text-[1.5rem]">Step 3 of 3</h3>
              <h3 className="text-[1.5rem] font-bold">What are you interested in?</h3>
              <p className="opacity-50">You can change your preferences later.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[3rem] w-[33%] h-full items-center justify-center">
          <div className="flex flex-row flex-wrap justify-center gap-4 w-full">
            {genres.map((value, index) => (
              <Button key={index} variant="outlined" className="relative rounded-full w-[30%]">
                {value}
              </Button>
            ))}
          </div>
          
          <div className="w-full flex flex-col gap-[1rem]">
            <div className="flex items-center justify-center gap-2 md:flex-row w-full">
              <Button variant="outlinedMain" className="relative font-bold rounded-full w-full" onClick={() => navigate('/home')}>
                Skip for now
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 md:flex-row w-full">
              <Button className="relative font-bold rounded-full w-full" onClick={() => navigate('/home')}>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterStep3
