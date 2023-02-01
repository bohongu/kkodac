import React from 'react';
import styled from 'styled-components';
import User from './User';
import Posts from './Posts';
import Subscriber from './Subscriber';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import LikePost from './LikePost';

const ProfileScreen = () => {
  const cUser = useRecoilValue(currentUser);

  return (
    <ProfileWrapper>
      <User />
      <Posts />
      <Subscriber userId={cUser.userId} />
      <LikePost userId={cUser.userId} />
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
