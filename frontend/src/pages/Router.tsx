import React from 'react';
import Home from './Home';
import Auth from './Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../recoil/atoms';
import Profile from './Profile';
import Tour from './Tour';
import Navigation from '../components/ui/Navigation';
import Subscription from './Subscription';
import NotFound from './NotFound';
import Write from './Write';
import UserScreen from './../components/user/UserScreen';

const Router = () => {
  /* Recoil */
  const isLoggedIn = useRecoilValue(loggedInState);

  return (
    <BrowserRouter>
      {isLoggedIn ? <Navigation /> : null}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/tour/:region" element={<Tour />} />
            <Route path="/tour/:region/:postId" element={<Tour />} />
            <Route path="/subscribes/:userId" element={<Subscription />} />
            <Route path="/user/:userId" element={<UserScreen />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
