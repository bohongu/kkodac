import React, { useState } from 'react';
import Map from './Map';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PostModal from '../ui/PostModal';
import { useRecoilState } from 'recoil';
import { postModalState } from '../../recoil/atoms';
import { useQuery } from 'react-query';
import { test } from '../../api/api';

const DUMMY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const sliderVariants = {
  right: (backward: boolean) => ({
    x: backward ? -window.outerWidth : window.outerWidth,
  }),
  center: {
    x: 0,
  },
  left: (backward: boolean) => ({
    x: backward ? window.outerWidth : -window.outerWidth,
  }),
};

const ThumbNailVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    zInedx: 100,
    scale: 1.2,
    y: -100,
    transition: {
      delay: 0.3,
    },
  },
};

const InformationVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

interface ITest {
  postId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  fileMappers: IFileMappers[];
  tagMappers: [];
}

interface IFileMappers {
  file: {
    bucket: string;
    createdAt: string;
    fileId: string;
    originalName: string;
    pathName: string;
  };
}

const Jeju = () => {
  const { data } = useQuery<ITest[]>('hi', test);
  const [index, setIndex] = useState(0);
  const [backward, setBackward] = useState(false);
  const [modal, setModal] = useRecoilState(postModalState);
  const showPostModal = () => {
    setModal(true);
  };
  const offset = 5;
  let maxIndex: number;
  if (data) {
    const totalData = data.length;
    maxIndex = Math.ceil(totalData / offset) - 1;
  }
  const increase = () => {
    setBackward(false);
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const decrease = () => {
    setBackward(true);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  return (
    <MainWrapper>
      <Map />
      <SliderSection>
        <AnimatePresence initial={false} custom={backward}>
          <Title>맛집</Title>
          <Row
            variants={sliderVariants}
            custom={backward}
            initial="right"
            animate="center"
            exit="left"
            key={index}
            transition={{ type: 'tween', duration: 1 }}
          >
            <SlideL onClick={decrease}>
              <AiOutlineArrowLeft />
            </SlideL>
            {data
              ?.slice(offset * index, offset * index + offset)
              .map((test) => (
                <ThumbNail
                  onClick={showPostModal}
                  variants={ThumbNailVariants}
                  initial="initial"
                  whileHover="hover"
                  key={test.postId}
                  layoutId={test + ''}
                  bg={test.fileMappers[0].file.pathName}
                >
                  <Information variants={InformationVariants}>
                    <h1>{test.title}</h1>
                    {/* <h2>작성자닉네임</h2>
                    <h3>❤ 300</h3> */}
                  </Information>
                </ThumbNail>
              ))}
            <SlideR onClick={increase}>
              <AiOutlineArrowRight />
            </SlideR>
          </Row>
        </AnimatePresence>
      </SliderSection>
      <AnimatePresence>{modal ? <PostModal /> : null}</AnimatePresence>
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

const SliderSection = styled.div`
  position: relative;
  margin: 30px;
  width: 95%;
  height: 400px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;

const ThumbNail = styled(motion.div)<{ bg: string }>`
  border: 1px solid black;
  height: 350px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  color: black;
  border-radius: 10px;
  font-size: 60px;
  cursor: pointer;
`;

const Information = styled(motion.div)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: red;
  position: relative;
  top: 254px;
  padding: 10px;
  border-top: 1px solid black;
  opacity: 0;
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h2,
  h3 {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const Slide = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 30px;
  top: 45%;
  background: red;
  color: white;
`;

const SlideL = styled(Slide)`
  left: -15px;
`;

const SlideR = styled(Slide)`
  right: -15px;
`;
