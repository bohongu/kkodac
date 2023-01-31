import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IFollow, IPost } from './../../utils/interface';
import { getFollows, getUserPost } from './../../api/api';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';

const SubscriptionScreen = () => {
  const { userId } = useParams();
  const cUser = useRecoilValue(currentUser);

  const { data: follows } = useQuery<IFollow>('follows', () =>
    getFollows(userId!),
  );

  const [subUser, setSubUser] = useState<string>(userId!);

  const { data: posts, refetch } = useQuery<IPost[]>('subGetUserPost', () =>
    getUserPost(subUser!),
  );

  const changeSubUser = (id: string) => {
    setSubUser(id);
    setTimeout(() => {
      refetch();
    }, 300);
  };

  return (
    <SubscriptionWrapper>
      <Subscribers>
        <Subscriber onClick={() => changeSubUser(cUser.userId)}>
          <Image bgphoto={cUser.fileId.fileUrl} />
          <h1>{cUser.nickname}</h1>
        </Subscriber>
        {follows?.users_followed_by_user.map((user, idx) => (
          <Subscriber onClick={() => changeSubUser(user.userId)} key={idx}>
            <Image bgphoto={user.fileId.fileUrl} />
            <h1>{user.nickname}</h1>
          </Subscriber>
        ))}
      </Subscribers>
      <Posts>
        {posts &&
          posts.map((post) => <Post key={post.postId}>{post.title}</Post>)}
      </Posts>
    </SubscriptionWrapper>
  );
};

export default SubscriptionScreen;

const SubscriptionWrapper = styled.div`
  height: 100vh;
  padding-top: 80px;
  margin: 0 auto;
  width: 70%;
`;

const Subscribers = styled.div`
  display: flex;
  overflow: scroll;
  border: 1px solid black;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Subscriber = styled.div`
  height: 100px;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  h1 {
    margin-top: 5px;
    font-size: 12px;
  }
`;

const Image = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: 1px solid black;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Posts = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Post = styled.div`
  border: 1px solid black;
  height: 300px;
`;
