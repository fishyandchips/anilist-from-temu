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
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert(`Signup error: ${signUpError.message}`);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      alert("Could not get userId from signup.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profile")
      .upsert({
        id: userId,
        username,
        genre_preferences: genres,
      }, { onConflict: 'id' })

    if (profileError) {
      alert(`Profile error: ${profileError.message}`);
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
