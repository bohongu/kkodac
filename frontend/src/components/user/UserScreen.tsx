import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserPost } from '../../api/api';
import styled from 'styled-components';
import { IPost } from './../../utils/interface';
import { motion } from 'framer-motion';

const UserScreen = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { data: posts } = useQuery<IPost[]>('getOtherUserPost', () =>
    getUserPost(userId!),
  );

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  return (
    <UserWrapper>
      <Info>
        <Image></Image>
        <Text>
          <Statistic></Statistic>
          <Personal></Personal>
          <Btn>
            <button>Follow</button>
          </Btn>
        </Text>
      </Info>
      <Posts>
        {posts &&
          posts.map((post) => (
            <Post
              key={post.postId}
              layoutId={post.postId}
              onClick={() => postDetailHandler(post.regionId.name, post.postId)}
            >
              <Thumb bgphoto={post.fileMappers[0].file.fileUrl} />
              <PostInfo>
                <h1>{post.title}</h1>
                <h2>{post.createdAt.slice(0, 10)}</h2>
                <p>
                  {post.description.length < 100
                    ? post.description
                    : post.description.slice(0, 100) + '...'}
                </p>
                <span>❤ 300</span>
              </PostInfo>
            </Post>
          ))}
      </Posts>
    </UserWrapper>
  );
};

export default UserScreen;

const UserWrapper = styled.div`
  margin: 0 30%;
  margin-top: 80px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Info = styled.div`
  border: 1px solid black;
  height: 21rem;
  display: grid;
  grid-template-columns: 21rem auto;
`;

const Image = styled.div`
  border: 1px solid red;
`;

const Text = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 3rem;
`;

const Statistic = styled.div`
  border: 1px solid blue;
`;

const Personal = styled.div`
  border: 1px solid yellow;
`;

const Btn = styled.div`
  border: 1px solid green;
`;

const Posts = styled.div`
  padding: 10px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 10px;
`;

const Post = styled(motion.div)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 15rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: white;
`;

const Thumb = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: 1px solid black;
  height: 15rem;
  width: 15rem;
  margin-right: 20px;
`;

const PostInfo = styled.div`
  padding: 5px;
  height: 15rem;
  h1 {
    font-size: 25px;
  }
  h2 {
    font-size: 12px;
  }
`;
