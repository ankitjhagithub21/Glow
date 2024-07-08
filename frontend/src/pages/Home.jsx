import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Left from '../components/Left';
import Right from '../components/Right';
import Profile from '../components/Profile';
import AllPost from '../components/AllPost';
import UploadPost from '../components/UploadPost';
import CurrPost from '../components/CurrPost';
import { useSelector } from 'react-redux';
import Explore from '../components/Explore';

const Home = () => {
  const {isOpen,currPost} = useSelector(state=>state.post)
  return (
    <div className='lg:w-[90%] w-full mx-auto flex h-screen overflow-hidden'>
      <Left />
     
      <div className='lg:w-[50%] border-l w-full lg:border-r  '>
        {
            isOpen && currPost && <CurrPost/>
        }
        <Routes>
          <Route path="/" element={<AllPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/upload" element={<UploadPost />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
      <Right />
    </div>
  );
};

export default Home;
