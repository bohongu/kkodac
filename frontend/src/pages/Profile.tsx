import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  return <div>{userId}의 프로필</div>;
};

export default Profile;
