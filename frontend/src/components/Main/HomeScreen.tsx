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
    </MainWrapper>
  );
};

export default Jeju;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: ${(props) => props.theme.colors.skyblue};
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
