import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../api/auth';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Login = () => {  
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }} = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await signIn({ email, password });
      navigate('/home');
    } catch (err) {
      alert(`Signin failed: ${err.message}`);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-white flex flex-col gap-[3rem] items-center justify-center w-screen h-screen">
          <h1 className="text-[3rem] font-bold">Sign in</h1>

          <div className="flex flex-col gap-[1.5rem] w-[33%] items-center justify-center">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
                type="email" 
                id="email" 
                className={errors.email ? "border-[#FF7F7F]" : ""}
              />
              {errors.email && (
                <p className="text-[#FF7F7F] text-[0.8rem]">{errors.email.message}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-3">
              <Label htmlFor="password">Password</Label>
              <Input 
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                id="password"
                className={errors.password ? "border-[#FF7F7F]" : ""}
              />
              {errors.password && (
                <p className="text-[#FF7F7F] text-[0.8rem]">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 md:flex-row w-full">
              <Button className="relative font-bold rounded-full w-full" type="submit">
                Log in <ArrowRightIcon className="absolute right-4"/>
              </Button>
            </div>

            <Link to="/register" className="text-white underline underline-offset-2 hover:text-white/80 transition-all duration-300 ease-in-out">
              Forgot your password?
            </Link>

            <div className="relative w-[90%] flex justify-center items-center">
              <div className="absolute top-[50%] w-full border-b-2 border-white"></div>
              <span className="bg-[#282828] p-5 z-20">or</span>
            </div>

            <div className="flex items-center justify-center gap-2 md:flex-row w-full">
              <Button variant="outlined" disabled={true} className="relative font-bold rounded-full w-full">
                <FcGoogle className="mr-1" />
                Continue with Google
              </Button>
            </div>

            <div>
              <span className="opacity-50">Don't have an account? </span>
              <Link to="/register" className="text-white underline underline-offset-2 hover:text-white/80 transition-all duration-300 ease-in-out">
                Create one here.
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
