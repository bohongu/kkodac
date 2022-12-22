import React from 'react';
import styled from 'styled-components';
import Editor from './Editor';

const WriteScreen = () => {
  return (
    <WriteWrapper>
      <Editor />
    </WriteWrapper>
  );
};

export default WriteScreen;

const WriteWrapper = styled.div`
  margin: 10%;
  margin-top: 80px;
`;
