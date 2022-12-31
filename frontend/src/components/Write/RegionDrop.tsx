import React from 'react';
import styled from 'styled-components';

const RegionDrop = () => {
  return <DropWrapper></DropWrapper>;
};

export default RegionDrop;

const DropWrapper = styled.div`
  position: absolute;
  border: 1px solid black;
  height: 150px;
  width: 300px;
  top: 35px;
  left: -1px;
  background: white;
`;
