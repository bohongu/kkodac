import React from 'react';
import styled from 'styled-components';
import User from './User';
import Posts from './Posts';
import Subscriber from './Subscriber';

const ProfileScreen = () => {
  return (
    <ProfileWrapper>
      <User />
      <Posts />
      <Subscriber />
    </ProfileWrapper>
  );
};

export default ProfileScreen;

const ProfileWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  margin-top: 80px;
`;
