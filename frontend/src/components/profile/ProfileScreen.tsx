import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import User from './User';
import Posts from './Posts';
import Subscriber from './Subscriber';

const ProfileScreen = () => {
  const { userId } = useParams();
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
`;
