import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Wrapper>
      <div>404</div>
      <span>페이지를 찾을 수 없습니다</span>
      <Home to="/">홈으로 가기</Home>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  height: 100vh;
  ${(props) => props.theme.flex.flexCenterColumn}
  div {
    font-size: 40px;
    margin-bottom: 25px;
  }
  span {
    margin-bottom: 25px;
  }
`;

const Home = styled(Link)`
  border: 1px solid black;
  padding: 10px;
`;
