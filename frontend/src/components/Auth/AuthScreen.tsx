import React from 'react';
import styled from 'styled-components';
import AuthForm from './AuthForm';

const AuthScreen = () => {
  return (
    <AuthWrapper>
      <AuthForm />
    </AuthWrapper>
  );
};

export default AuthScreen;

const AuthWrapper = styled.div`
  height: 100vh;
  ${(props) => (props) => props.theme.flex.flexCenter}
`;
