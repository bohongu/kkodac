import { motion } from 'framer-motion';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { REGION_LIST } from '../../utils/jeju';
import { HoverDownVariants, ContentVariants } from '../../utils/variants';

const TourScreen = () => {
  const match = useMatch('/tour/:region');
  const region = match?.params.region;
  return (
    <TourWrapper>
      <RegionNav>
        {REGION_LIST.map((item) => (
          <RegionBtn region={region === item.data}>
            <Link to={`/tour/${item.data}`}>{item.data}</Link>
          </RegionBtn>
        ))}
      </RegionNav>
      <TagNav>
        <button>계절</button>
        <button>스타일</button>
      </TagNav>
      <Posts>
        <Post variants={HoverDownVariants} whileHover="hover">
          <Content variants={ContentVariants}>
            <h1>제목</h1>
            <h2>작성자</h2>
            <Tags>
              <div>애월읍</div>
              <div>카페</div>
              <div>바닷가</div>
            </Tags>
          </Content>
        </Post>
      </Posts>
    </TourWrapper>
  );
};

export default TourScreen;

const TourWrapper = styled.div`
  ${(props) => props.theme.flex.flexCenterColumn}
  margin: 0 15%;
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

const Post = styled(motion.div)`
  border: 1px solid black;
  height: 300px;
  background: white;
  border-radius: 10px;
`;

const Content = styled(motion.div)`
  border-top: 1px solid black;
  position: relative;
  top: 150px;
  height: 150px;
  opacity: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const Tags = styled.div`
  display: flex;
  div {
    ${(props) => props.theme.flex.flexCenter}
    border: 1px solid black;
    width: 50px;
    height: 20px;
    font-size: 12px;
    margin-right: 10px;
  }
`;
