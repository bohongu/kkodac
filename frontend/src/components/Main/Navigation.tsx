import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { motion, useAnimation, useScroll } from 'framer-motion';

const navVariants = {
  top: { backgroundColor: 'rgba(0,0,0,0)' },
  down: { backgroundColor: 'rgba(0,0,0,1)' },
};

const logVariants = {
  top: { color: 'black' },
  down: { color: 'white' },
};

const Navigation = () => {
  const navAnimation = useAnimation();
  const logAnimation = useAnimation();
  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start('down');
        logAnimation.start('down');
      } else {
        navAnimation.start('top');
        logAnimation.start('top');
      }
    });
  }, [logAnimation, navAnimation, scrollY]);

  return (
    <NavigationWrapper
      variants={navVariants}
      animate={navAnimation}
      initial="top"
    >
      <Logo variants={logVariants} animate={logAnimation} initial="top">
        꼬닥꼬닥
      </Logo>
      <Nav>
        <NavBtn>
          <CgProfile />
        </NavBtn>
        <NavBtn>
          <BsFillPencilFill />
        </NavBtn>
        <NavBtn>
          <FaUserFriends />
        </NavBtn>
        <NavBtn>
          <FiLogOut />
        </NavBtn>
      </Nav>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 6%;
  width: 100%;
  height: 80px;
  align-items: center;
`;

const Logo = styled(motion.div)`
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavBtn = styled.button`
  ${(props) => props.theme.flex.flexCenter}
  font-size: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 25px;
  border: none;
`;
