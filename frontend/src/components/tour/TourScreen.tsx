import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const TourScreen = () => {
  const match = useMatch('/tour/:region');
  const region = match?.params.region;
  return (
    <TourWrapper>
      <RegionNav>
        <RegionBtn region={region === '한경면'}>
          <Link to="/tour/한경면"> 한경면</Link>
        </RegionBtn>
        <RegionBtn region={region === '한립읍'}>
          <Link to="/tour/한립읍"> 한립읍</Link>
        </RegionBtn>
        <RegionBtn region={region === '애월읍'}>
          <Link to="/tour/애월읍"> 애월읍</Link>
        </RegionBtn>
        <RegionBtn region={region === '제주시'}>
          <Link to="/tour/제주시"> 제주시</Link>
        </RegionBtn>
        <RegionBtn region={region === '조천읍'}>
          <Link to="/tour/조천읍"> 조천읍</Link>
        </RegionBtn>
        <RegionBtn region={region === '구좌읍'}>
          <Link to="/tour/구좌읍"> 구좌읍</Link>
        </RegionBtn>
        <RegionBtn region={region === '성산읍'}>
          <Link to="/tour/성산읍"> 성산읍</Link>
        </RegionBtn>
        <RegionBtn region={region === '포선면'}>
          <Link to="/tour/포선면"> 포선면</Link>
        </RegionBtn>
        <RegionBtn region={region === '남원읍'}>
          <Link to="/tour/남원읍"> 남원읍</Link>
        </RegionBtn>
        <RegionBtn region={region === '서귀포'}>
          <Link to="/tour/서귀포"> 서귀포</Link>
        </RegionBtn>
        <RegionBtn region={region === '중문'}>
          <Link to="/tour/중문"> 중문</Link>
        </RegionBtn>
        <RegionBtn region={region === '안덕면'}>
          <Link to="/tour/안덕면"> 안덕면</Link>
        </RegionBtn>
        <RegionBtn region={region === '대정면'}>
          <Link to="/tour/대정면"> 대정면</Link>
        </RegionBtn>
        <RegionBtn region={region === '우도면'}>
          <Link to="/tour/우도면"> 우도면</Link>
        </RegionBtn>
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

const RegionBtn = styled.button<{ region: boolean }>`
  border: none;
  background: none;
  border-bottom: ${(props) => (props.region ? '2px solid tomato' : 'none')};
`;

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
