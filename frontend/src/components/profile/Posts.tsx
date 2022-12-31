import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { HoverVariants } from './../../utils/variants';

const PostSection = () => {
  return (
    <PostWrapper>
      <Posts>
        <Post variants={HoverVariants} whileHover="hover">
          1
        </Post>
        <Post>1</Post>
        <Post>1</Post>
        <Post>1</Post>
        <Post>1</Post>
        <Post>1</Post>
        <Post>1</Post>
        <Post>1</Post>
      </Posts>
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
  padding-left: 50px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Post = styled(motion.div)`
  border: 1px solid black;
  height: 300px;
  border-radius: 10px;
  background: white;
`;
