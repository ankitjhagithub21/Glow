import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Left from '../components/Left';
import Right from '../components/Right';
import Profile from '../components/Profile';
import AllPost from '../components/AllPost';
import UploadPost from '../components/UploadPost';

const Home = () => {
  return (
    <div className='container mx-auto flex h-screen overflow-hidden'>
      <Left />
      <div className='lg:w-[50%] border-l w-full lg:border-r '>
        <Routes>
          <Route path="/" element={<AllPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<UploadPost />} />
        </Routes>
      </div>
      <Right />
    </div>
  );
};

export default Home;
