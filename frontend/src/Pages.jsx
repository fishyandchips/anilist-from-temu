import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import AnimeList from './components/AnimeList';
import MangaList from './components/MangaList';
import Profile from './components/Profile';
import Info from './components/Info';
import Following from './components/Following';
import Settings from './components/Settings';

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
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/mangalist" element={<MangaList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info" element={<Info />} />
        <Route path="/following" element={<Following />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default Pages
