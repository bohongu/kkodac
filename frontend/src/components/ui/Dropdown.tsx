import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { BsFillPencilFill } from 'react-icons/bs';
import { GiThreeFriends } from 'react-icons/gi';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/atoms';

const Dropdown = () => {
  /* React-Router-Dom */
  const navigate = useNavigate();

  /* Recoil */
  const logout = useSetRecoilState(loggedInState);

  /* Handlers */
  const logoutHandler = () => {
    logout(false);
    navigate('/');
  };
  return (
    <DropdownWrapper>
      <Menus to="/profile/재홍">
        <CgProfile /> &nbsp; 프로필
      </Menus>
      <Menus to="/write">
        <BsFillPencilFill />
        &nbsp; 글쓰기
      </Menus>
      <Menus to="/subscribe/재홍">
        <GiThreeFriends />
        &nbsp; 구독
      </Menus>
      <Logout onClick={logoutHandler}>
        <AiOutlineLogout />
        &nbsp; 로그아웃
      </Logout>
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
  top: 30px;
  background: white;
  border-radius: 10px;
`;

const Menus = styled(Link)`
  ${(props) => props.theme.flex.flexCenter}
  justify-content: flex-start;
  font-size: 15px;
  width: 100%;
  padding: 8px;
`;

const Logout = styled.div`
  ${(props) => props.theme.flex.flexCenter}
  justify-content: flex-start;
  font-size: 15px;
  width: 100%;
  padding: 8px;
  color: black;
`;
