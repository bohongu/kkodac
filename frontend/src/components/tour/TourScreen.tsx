import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { REGION_LIST } from '../../utils/jeju';
import { HoverDownVariants, ContentVariants } from '../../utils/variants';
import { useQuery } from 'react-query';
import { getPostRegion } from './../../api/api';

interface IPostFileMapper {
  file: {
    fileId: string;
    _id: string;
    createdAt: string;
    fileName: string;
    fileUrl: string;
    deployName: string;
  };
}

interface IPostTagMapper {
  tag: {
    name: string;
  };
}

interface IPost {
  postId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  fileMappers: IPostFileMapper[];
  tagMappers: IPostTagMapper[];
  authorId: {
    userId: string;
    userName: string;
    nickname: string;
    user_refresh_token: null;
  };
  regionId: {
    name: string;
  };
}

const TourScreen = () => {
  const match = useMatch('/tour/:region');
  const region = match?.params.region;
  const { data: regionPosts } = useQuery<IPost[]>('getPostRegion', () =>
    getPostRegion(region + ''),
  );

  useEffect(() => {
    if (regionPosts) {
      console.log(regionPosts);
      console.log(region);
    }
  }, [region, regionPosts]);

  return (
    <TourWrapper>
      <RegionNav>
        {REGION_LIST.map((item) => (
          <RegionBtn key={item.id} region={region === item.data}>
            <Link to={`/tour/${item.data}`}>{item.data}</Link>
          </RegionBtn>
        ))}
      </RegionNav>
      <TagNav>
        <button>계절</button>
        <button>스타일</button>
      </TagNav>
      <Posts>
        {regionPosts?.map((post) => (
          <Post
            key={post.postId}
            variants={HoverDownVariants}
            whileHover="hover"
            bgphoto={post.fileMappers[0].file.fileUrl}
          >
            <Content variants={ContentVariants}>
              <h1>{post.title}</h1>
              <h2>{post.authorId.nickname}</h2>

              <Tags>
                {post.tagMappers.map((tag) => (
                  <div key={tag.tag.name}>{tag.tag.name}</div>
                ))}
              </Tags>
            </Content>
          </Post>
        ))}
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

const Post = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: 1px solid black;
  height: 300px;
  border-radius: 10px;
`;

const Content = styled(motion.div)`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  position: relative;
  top: 200px;
  height: 100px;
  opacity: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: white;
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
