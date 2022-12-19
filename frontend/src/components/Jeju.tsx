import React from 'react';
import Map from './Main/Map';
import styled from 'styled-components';
import Navigation from './Main/Navigation';
import Slider from './Main/Slider';
import Header from './Main/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Jeju = () => {
  return (
    <MainWrapper>
      <Navigation />
      <MainSection>
        <Header />
        <Map />
        <SliderSection>
          <AnimatePresence>
            <Title>맛집</Title>
            <Row>
              <SlideL>
                <AiOutlineArrowLeft />
              </SlideL>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <SlideR>
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
  border: 1px solid blue;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150vh;
`;

const SliderSection = styled.div`
  position: relative;
  margin-top: 30px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
`;

const Box = styled(motion.div)`
  border: 1px solid black;
  height: 300px;
  width: 400px;
`;

const Slide = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 30px;
  top: 50%;
  background: black;
  color: white;
`;

const SlideL = styled(Slide)`
  left: -15px;
`;

const SlideR = styled(Slide)`
  right: -15px;
`;
