import { useState, useEffect } from 'react';
import RegisterStep0 from './RegisterStep0';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';

const Register = () => {  
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(s => s + 1);
  const prevStep = () => setCurrentStep(s => Math.max(0, s - 1));

  return (
    <>
      {currentStep == 0 && <RegisterStep0 nextStep={nextStep}/>}
      {currentStep == 1 && <RegisterStep1 nextStep={nextStep} prevStep={prevStep} />}
      {currentStep == 2 && <RegisterStep2 nextStep={nextStep} prevStep={prevStep} />}
      {currentStep == 3 && <RegisterStep3 prevStep={prevStep} />}
    </>
  )
}

export default Register
