import React from 'react';
import styled from 'styled-components';
import Auth from '../components/Auth';

const Home = () => {
  return (
    <HomeWrapper>
      <Auth />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  height: 100vh;
  ${(props) => (props) => props.theme.flex.flexCenter}
`;
