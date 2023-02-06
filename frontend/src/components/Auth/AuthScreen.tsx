import React from 'react';
import styled from 'styled-components';
import AuthForm from './AuthForm';
import background from '../../assets/images/auth_background.png';

const AuthScreen = () => {
  return (
    <AuthWrapper>
      <AuthForm />
    </AuthWrapper>
  );
};

export default AuthScreen;

const AuthWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
  ${(props) => (props) => props.theme.flex.flexCenter}
`;
