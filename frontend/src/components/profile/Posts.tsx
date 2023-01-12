import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { ContentVariants, HoverDownVariants } from '../../utils/variants';

const PostSection = () => {
  return (
    <PostWrapper>
      <Posts>
        <Post variants={HoverDownVariants} whileHover="hover">
          <Content variants={ContentVariants}>
            <h1>제목</h1>
            <h2>2022-12-31</h2>
            <h3>❤ 300</h3>
          </Content>
        </Post>
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
  padding: 50px;
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

const Content = styled(motion.div)`
  position: relative;
  top: 200px;
  height: 100px;
  border-top: 1px solid black;
  opacity: 0;
  padding: 10px;
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 15px;
  }
  h3 {
    font-size: 12px;
    text-align: right;
  }
`;
