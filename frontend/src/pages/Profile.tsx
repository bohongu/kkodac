import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/UI/Modal';

const Profile = () => {
  const { userId } = useParams();
  return (
    <ProfileWrapper>
      <UserInfo>
        <UserImageSection>
          <UserImage />
          <UserImageBtn>O</UserImageBtn>
        </UserImageSection>
        <UserId>{userId}</UserId>
        <Nickname>테스트닉네임</Nickname>
        <Introduce>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          autem aperiam quis fuga omnis quas cumque officia eveniet ratione
          minima necessitatibus illo fugiat sint ad eum esse debitis, ab illum?
        </Introduce>
        <UserInfoBtn>프로필 변경</UserInfoBtn>
        <Followers>구독 : 4</Followers>
        <Modal>하잉</Modal>
      </UserInfo>
      <PostsSection>
        <Posts>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
          <Post>1</Post>
        </Posts>
      </PostsSection>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  padding: 50px;
  height: 100vh;
`;

const UserInfo = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  padding-top: 50px;
`;

const PostsSection = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const UserImageSection = styled.div`
  position: relative;
  margin-bottom: 10%;
`;

const UserImage = styled.img`
  border: 1px solid black;
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 100%;
  border-radius: 50%;
`;

const UserImageBtn = styled.button`
  position: absolute;
  bottom: 50px;
  right: 20px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 0.5px solid black;
`;

const UserId = styled.div`
  font-size: 30px;
`;

const Nickname = styled.div`
  font-size: 20px;
`;

const Introduce = styled.div``;

const UserInfoBtn = styled.button``;

const Followers = styled.div``;

const FollowerPost = styled.button`
  border-bottom: 1px solid black;
  padding: 10px;
  padding-bottom: 5px;
  margin-right: 10px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  padding-left: 50px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Post = styled.div`
  border: 1px solid black;
  height: 300px;
  border-radius: 10px;
`;
