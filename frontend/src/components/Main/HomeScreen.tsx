import React, { useState } from 'react';
import Map from './Map';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import {
  ContentVariants,
  HoverVariants,
  sliderVariants,
} from '../../utils/variants';
import { useQuery } from 'react-query';
import { getPostTag } from '../../api/api';
import { IRecommendPost } from '../../utils/interface';
import { useNavigate } from 'react-router-dom';

const Jeju = () => {
  const { data: springPosts } = useQuery<IRecommendPost[]>('recommend', () =>
    getPostTag('봄'),
  );
  const navigate = useNavigate();

  const offset = 5;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const nextSlide = () => {
    if (leaving) return;
    toggleLeaving();
    const totalData = springPosts!.length;
    const maxSlide = Math.floor(totalData / offset) - 1;
    setIndex((prev) => (prev === maxSlide ? 0 : prev + 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  return (
    <MainWrapper>
      <Map />
      <Slider>
        <SliderHeader>
          <h1>봄</h1>
          <NextArrow onClick={nextSlide}>
            <BsFillArrowRightCircleFill />
          </NextArrow>
        </SliderHeader>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Line
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {springPosts &&
              springPosts
                .slice(offset * index, offset * index + offset)
                .map((post) => (
                  <ThumbNail
                    variants={HoverVariants}
                    whileHover="hover"
                    key={post.postId}
                    bgphoto={post.fileMappers[0].file.fileUrl}
                    onClick={() =>
                      postDetailHandler(post.regionId.name, post.postId)
                    }
                    layoutId={post.postId}
                  >
                    <Content variants={ContentVariants}>
                      <h1>{post.title}</h1>
                      <h2>{post.authorId.nickname}</h2>
                    </Content>
                  </ThumbNail>
                ))}
          </Line>
        </AnimatePresence>
      </Slider>
      <AnimatePresence></AnimatePresence>
    </MainWrapper>
  );
};

export default Jeju;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const Slider = styled.div`
  position: relative;
  width: 90%;
  margin-top: 30px;
  margin-bottom: 350px;
`;

const SliderHeader = styled.header`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  h1 {
    font-size: 28px;
  }
`;

const NextArrow = styled.button`
  font-size: 28px;
  ${(props) => props.theme.flex.flexCenter}
  border:none;
  background: none;
`;

const Line = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
`;

const ThumbNail = styled(motion.div)<{ bgphoto: string }>`
  height: 300px;
  border-radius: 10px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
`;

const Content = styled(motion.div)`
  position: relative;
  top: 180px;
  height: 120px;
  opacity: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.3);
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const Tags = styled.div`
  display: flex;
  div {
    ${(props) => props.theme.flex.flexCenter}
    border: 1px solid black;
    width: 50px;
    height: 20px;
    font-size: 12px;
    margin-right: 10px;
  }
`;
