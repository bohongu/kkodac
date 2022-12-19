import React from 'react';
import styled from 'styled-components';
import AuthForm from '../components/Auth/AuthForm';

const Auth = () => {
  return (
    <AuthWrapper>
      <AuthForm />
    </AuthWrapper>
  );
};

export default Auth;

const AuthWrapper = styled.div`
  height: 100vh;
  ${(props) => (props) => props.theme.flex.flexCenter}
`;
