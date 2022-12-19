import React from 'react';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <NavigationWrapper>
      <div>글쓰기</div>
      <div>프로필</div>
      <div>다크모드</div>
      <div>로그아웃</div>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  position: fixed;
  border: 1px solid red;
  height: 100vh;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  div {
    margin: 20px 0;
  }
`;
