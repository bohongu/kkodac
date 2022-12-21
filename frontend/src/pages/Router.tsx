import React from 'react';
import Home from './Home';
import Auth from './Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../recoil/atoms';
import Profile from './Profile';
import Tour from './Tour';

const Router = () => {
  const isLoggedIn = useRecoilValue(loggedInState);
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/tour/:region" element={<Tour />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
