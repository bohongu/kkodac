import React from 'react';
import styled from 'styled-components';
import { BsFillPencilFill, BsFillMoonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <NavigationWrapper>
      <div>프로필</div>
      <div>
        <BsFillPencilFill />
      </div>
      <div>
        <BsFillMoonFill />
      </div>
      <div>
        <FiLogOut />
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  position: fixed;
  border: 1px solid red;
  height: 100vh;
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  div {
    margin: 20px 0;
  }
`;
