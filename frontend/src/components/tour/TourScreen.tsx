import React from 'react';
import styled from 'styled-components';

const TourScreen = () => {
  return (
    <TourWrapper>
      <RegionNav>
        <RegionBtn>한경면</RegionBtn>
        <RegionBtn>한립읍</RegionBtn>
        <RegionBtn>애월읍</RegionBtn>
        <RegionBtn>제주시</RegionBtn>
        <RegionBtn>조천읍</RegionBtn>
        <RegionBtn>구좌읍</RegionBtn>
        <RegionBtn>성산읍</RegionBtn>
        <RegionBtn>포선면</RegionBtn>
        <RegionBtn>남원읍</RegionBtn>
        <RegionBtn>서귀포</RegionBtn>
        <RegionBtn>중문</RegionBtn>
        <RegionBtn>안덕면</RegionBtn>
        <RegionBtn>대정면</RegionBtn>
        <RegionBtn>우도면</RegionBtn>
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
`;

const RegionNav = styled.nav`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  gap: 10px;
  margin-bottom: 10px;
`;

const RegionBtn = styled.button``;

const TagNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
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
