import React, { useState } from 'react';
import Map from './Main/Map';
import styled from 'styled-components';
import Navigation from './Main/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

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

const Jeju = () => {
  const [index, setIndex] = useState(0);
  const [backward, setBackward] = useState(false);
  const offset = 5;
  const totalData = DUMMY.length;
  const maxIndex = Math.ceil(totalData / offset) - 1;
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
      <MainSection>
        <Navigation />
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
              {DUMMY.slice(offset * index, offset * index + offset).map((i) => (
                <Box key={i}>{i}</Box>
              ))}
              <SlideR onClick={increase}>
                <AiOutlineArrowRight />
              </SlideR>
            </Row>
          </AnimatePresence>
        </SliderSection>
      </MainSection>
    </MainWrapper>
  );
};

export default Jeju;

const MainWrapper = styled.div``;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150vh;
`;

const SliderSection = styled.div`
  position: relative;
  margin: 30px;
  width: 95%;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  border: 1px solid black;
  height: 300px;
  background: black;
  color: white;
  font-size: 60px;
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
