import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import supabase from '@/config/supabaseClient';

import RegisterStep0 from './RegisterStep0';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';

const Register = () => {
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      genres: []
    }
  });

  const nextStep = async () => {
    const fieldsToValidate =
      step === 0 ? ["email"] :
      step === 1 ? ["username"] : 
      step === 2 ? ["password", "confirmPassword"] :
      step === 3 ? ["genres"] : [];

    const valid = await methods.trigger(fieldsToValidate);
    if (valid) {
      setStep((prev) => prev + 1);
    }
  }
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async ({ email, username, password, confirmPassword, genres }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert("Signup error: ", error.message);
      return;
    }

    navigate('/home');
  }

  const [step, setStep] = useState(0);
  const steps = [
    <RegisterStep0 nextStep={nextStep} />, 
    <RegisterStep1 nextStep={nextStep} prevStep={prevStep} />, 
    <RegisterStep2 nextStep={nextStep} prevStep={prevStep} />, 
    <RegisterStep3 prevStep={prevStep} onSubmit={onSubmit} />
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {steps[step]}
      </form>
    </FormProvider>
  );
}

export default Register
