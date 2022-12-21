import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { BsFillPencilFill } from 'react-icons/bs';
import { GiThreeFriends } from 'react-icons/gi';
import { AiOutlineLogout } from 'react-icons/ai';

const Dropdown = () => {
  return (
    <DropdownWrapper>
      <Menus>
        <CgProfile /> &nbsp; 프로필
      </Menus>
      <Menus>
        <BsFillPencilFill />
        &nbsp; 글쓰기
      </Menus>
      <Menus>
        <GiThreeFriends />
        &nbsp; 구독
      </Menus>
      <Menus>
        <AiOutlineLogout />
        &nbsp; 로그아웃
      </Menus>
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  width: 150px;
  top: 20px;
  background: white;
  border-radius: 10px;
`;

const Menus = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  background: none;
  border: none;
  margin: 5px 0;
`;
