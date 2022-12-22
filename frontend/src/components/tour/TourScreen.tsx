import React from 'react';
import styled from 'styled-components';

const TourScreen = () => {
  return (
    <TourWrapper>
      <RegionNav>
        <RegionBtn>한경면</RegionBtn>
      </RegionNav>
      <TagNav>
        <button>계절</button>
        <button>스타일</button>
      </TagNav>
      <Posts>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </Posts>
    </TourWrapper>
  );
};

export default TourScreen;

const TourWrapper = styled.div`
  ${(props) => props.theme.flex.flexCenterColumn}
  margin: 0 20%;
  margin-top: 80px;
  border: 1px solid black;
`;

const RegionNav = styled.nav`
  border: 1px solid black;
  width: 100%;
  height: 50px;
  display: flex;
`;

const RegionBtn = styled.button`
  border: none;
`;

const TagNav = styled.nav`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: 50px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

const Post = styled.div`
  border: 1px solid black;
  height: 300px;
`;
