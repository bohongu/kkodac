import React, { useState } from 'react';
import Map from './Map';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PostModal from '../ui/PostModal';
import { useRecoilState } from 'recoil';
import { postModalState } from '../../recoil/atoms';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sliderVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
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

const ContentVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const offset = 5;

const Jeju = () => {
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useRecoilState(postModalState);
  const [leaving, setLeaving] = useState(false);
  const nextSlide = () => {
    if (leaving) return;
    toggleLeaving();
    const totalData = dummy.length;
    const maxSlide = Math.floor(totalData / offset) - 1;
    setIndex((prev) => (prev === maxSlide ? 0 : prev + 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const showPostModal = () => {
    setModal(true);
  };

  return (
    <MainWrapper>
      <Map />
      <Slider>
        <SliderHeader>
          <h1>맛집</h1>
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
            {dummy.slice(offset * index, offset * index + offset).map((i) => (
              <ThumbNail
                variants={ThumbNailVariants}
                whileHover="hover"
                key={i}
                onClick={showPostModal}
              >
                <Content variants={ContentVariants}>
                  <h1>제목</h1>
                  <h2>작성자</h2>
                  <Tags>
                    <div>애월읍</div>
                    <div>카페</div>
                    <div>바닷가</div>
                  </Tags>
                </Content>
              </ThumbNail>
            ))}
          </Line>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>{modal ? <PostModal id="1" /> : null}</AnimatePresence>
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
  margin-bottom: 300px;
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

const ThumbNail = styled(motion.div)`
  border: 1px solid black;
  height: 300px;
  border-radius: 10px;
  background: white;
`;

const Content = styled(motion.div)`
  position: relative;
  top: 180px;
  height: 120px;
  border-top: 1px solid black;
  opacity: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
