import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import './App.css';

const Pages = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth / window.innerHeight > 1);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth / window.innerHeight > 1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default Pages
