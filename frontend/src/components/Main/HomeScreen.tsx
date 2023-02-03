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
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import { loggedInState, accessToken } from './../../recoil/atoms';

const Jeju = () => {
  const cUser = useRecoilValue(currentUser);

  const { data: springPosts } = useQuery<IRecommendPost[]>('recommend', () =>
    getPostTag('제발'),
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

  const logout = useSetRecoilState(loggedInState);
  const setCurrentUser = useSetRecoilState(currentUser);
  const setAccessToken = useSetRecoilState(accessToken);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setAccessToken('');
    setCurrentUser({
      createdAt: '',
      googleAccount: '',
      introduce: '',
      kakaoAccount: '',
      nickname: '',
      password: '',
      refreshToken: '',
      updatedAt: '',
      userId: '',
      username: '',
      _id: '',
      fileId: { fileUrl: '', fileId: '' },
    });
    logout(false);
  };

  return (
    <MainWrapper>
      <NavWapper>
        <Nav>
          <Menu to={`/profile/${cUser.userId}`}>프로필</Menu>
          <Menu to="/write">글쓰기</Menu>
          <Menu to={`/subscribes/${cUser.userId}`}>구독</Menu>
          <Logout onClick={logoutHandler}>로그아웃</Logout>
        </Nav>
      </NavWapper>

      <Map />
      <Slider>
        <SliderHeader>
          <h1>연인과 함께 가면 좋은 곳</h1>
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
                      <h4>{post.createdAt.slice(0, 10)}</h4>
                      <h2>{post.regionId.name}</h2>
                      <h3>
                        <span>❤</span>&nbsp;{post.likes.length}
                      </h3>
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
  background: ${(props) => props.theme.colors.skyblue};
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
    color: ${(props) => props.theme.colors.ivory};
    padding-bottom: 10px;
    border-bottom: 3px solid ${(props) => props.theme.colors.ivory};
  }
`;

const NextArrow = styled.button`
  font-size: 28px;
  ${(props) => props.theme.flex.flexCenter}
  border:none;
  background: none;
  color: ${(props) => props.theme.colors.ivory};
  &:hover {
    color: #ffec99;
  }
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
  padding: 10px;
  height: 120px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #f1f3f5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: 0;
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

const NavWapper = styled.div`
  width: 95vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 10px;
`;

const Nav = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled(Link)`
  border-bottom: 1px solid black;
  padding-bottom: 2px;
  &:hover {
    color: ${(props) => props.theme.colors.ivory};
    border-bottom: ${(props) => props.theme.colors.ivory};
  }
`;

const Logout = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 2px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.ivory};
    border-bottom: ${(props) => props.theme.colors.ivory};
  }
`;
