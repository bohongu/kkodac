import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const navVariants = {
  top: { backgroundColor: 'rgba(0,0,0,0)' },
  down: { backgroundColor: 'rgba(0,0,0,1)' },
};

const logVariants = {
  top: { color: 'black' },
  down: { color: 'white' },
};

const Navigation = () => {
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const logAnimation = useAnimation();
  const { scrollY } = useScroll();

  const toggleDropHandler = () => {
    setDrop((prev) => !prev);
  };

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
        꼬닥꼬닥
      </Logo>
      <Nav
        variants={logVariants}
        animate={logAnimation}
        initial="top"
        onClick={toggleDropHandler}
      >
        반가워요, 엄지혜님{drop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
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
  padding: 0 6%;
  width: 100%;
  height: 80px;
  align-items: center;
  top: 0;
  z-index: 100;
`;

const Logo = styled(motion.div)`
  color: white;
  cursor: pointer;
`;

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
`;