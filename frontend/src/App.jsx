import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import useFetchUser from './hooks/useFetchUser';

const App = () => {
  const {currUser} = useSelector(state => state.user);
  const loading = useFetchUser();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      {
        currUser ? 
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Home />} />
          </Routes>
        </BrowserRouter> 
        : <Login />
      }
    </>
  );
}

export default App;
