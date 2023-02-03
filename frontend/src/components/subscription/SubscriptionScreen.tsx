import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IFollow, IPost } from './../../utils/interface';
import { getFollows, getUserPost } from './../../api/api';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import LoadingSpinner from '../ui/LoadingSpinner';
import { motion } from 'framer-motion';
import { ContentVariants, HoverDownVariants } from '../../utils/variants';

const SubscriptionScreen = () => {
  const { userId } = useParams();
  const cUser = useRecoilValue(currentUser);
  const navigate = useNavigate();

  const { data: follows, isLoading: followLoading } = useQuery<IFollow>(
    'follows',
    () => getFollows(userId!),
  );

  const [subUser, setSubUser] = useState<string>(userId!);

  const {
    data: posts,
    refetch,
    isLoading: postsLoading,
  } = useQuery<IPost[]>('subGetUserPost', () => getUserPost(subUser!));

  const changeSubUser = (id: string) => {
    setSubUser(id);
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  return (
    <SubscriptionWrapper>
      {followLoading && <LoadingSpinner />}
      {postsLoading && <LoadingSpinner />}
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
          posts.map((post) => (
            <Post
              key={post.postId}
              bgphoto={post.fileMappers[0].file.fileUrl}
              onClick={() => postDetailHandler(post.regionId.name, post.postId)}
              layoutId={post.postId}
            >
              <Content>
                <h1>{post.title}</h1>
                <h4>{post.createdAt.slice(0, 10)}</h4>
                <h2>{post.regionId.name}</h2>
                <h3>
                  <span>❤</span>&nbsp;{post.likes.length}
                </h3>
              </Content>
            </Post>
          ))}
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
  border-bottom: 2px solid ${(props) => props.theme.colors.hardGray};
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 25px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Subscriber = styled.div`
  height: 110px;
  width: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  h1 {
    margin-top: 5px;
    font-size: 12px;
    cursor: pointer;
  }
`;

const Image = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 7px;
  cursor: pointer;
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

const Post = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  z-index: 80;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #f1f3f5;
  h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 10px;
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: end;
    span {
      color: ${(props) => props.theme.colors.red};
    }
  }
  h4 {
    margin-bottom: 10px;
    font-size: 10px;
  }
`;
