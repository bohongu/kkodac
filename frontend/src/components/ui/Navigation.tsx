import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { logVariants, navVariants } from '../../utils/variants';
import { useRecoilValue } from 'recoil';
import { currentUser } from './../../recoil/atoms';
import logo from '../../assets/images/logo.png';

const Navigation = () => {
  /* State */
  const [drop, setDrop] = useState(false);

  /* React-Router-Dom */
  const navigate = useNavigate();

  /* Framer-Motion */
  const navAnimation = useAnimation();
  const logAnimation = useAnimation();
  const { scrollY } = useScroll();

  /* Handlers */
  const toggleDropHandler = () => {
    setDrop((prev) => !prev);
  };

  /* Recoil */
  const user = useRecoilValue(currentUser);

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 30) {
        navAnimation.start('down');
        logAnimation.start('down');
      } else {
        navAnimation.start('top');
        logAnimation.start('top');
      }
      setDrop(false);
    });
  }, [logAnimation, navAnimation, scrollY]);

  if (window.location.pathname === '/') {
    return <></>;
  }

  return (
    <NavigationWrapper
      variants={navVariants}
      animate={navAnimation}
      initial="top"
    >
      <Logo
        onClick={() => {
          navigate('/');
        }}
        variants={logVariants}
        animate={logAnimation}
        initial="top"
      >
        <img alt="kkodac_logo" src={logo} />
      </Logo>
      <Nav
        variants={logVariants}
        animate={logAnimation}
        initial="top"
        onClick={toggleDropHandler}
      >
        반가워요, {user.nickname}님
        {drop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        {drop && <Dropdown />}
      </Nav>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8%;
  width: 100%;
  height: 70px;
  align-items: center;
  top: 0;
  z-index: 100;
`;

const Logo = styled(motion.div)`
  cursor: pointer;

  img {
    width: 170px;
    height: 50px;
  }
`;

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
`;
