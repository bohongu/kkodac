import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { ContentVariants, HoverDownVariants } from '../../utils/variants';
import { useQuery } from 'react-query';
import { getUserPost } from '../../api/api';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import { IPost } from './../../utils/interface';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const PostSection = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(currentUser);

  const { data, isLoading } = useQuery<IPost[]>('getUserPost', () =>
    getUserPost(user.userId),
  );

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  return (
    <PostWrapper>
      {isLoading && <LoadingSpinner />}
      {data &&
        data.map((data) => (
          <Posts key={data.postId}>
            <Post
              variants={HoverDownVariants}
              whileHover="hover"
              bgphoto={data.fileMappers[0].file.fileUrl}
              layoutId={data.postId}
              onClick={() => postDetailHandler(data.regionId.name, data.postId)}
            >
              <Content variants={ContentVariants}>
                <h1>{data.title}</h1>
              </Content>
            </Post>
          </Posts>
        ))}
    </PostWrapper>
  );
};

export default PostSection;

const PostWrapper = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  padding: 50px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Post = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
`;

const Content = styled(motion.div)`
  position: relative;
  top: 200px;
  height: 100px;
  border-top: 1px solid black;
  opacity: 0;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: white;
`;
