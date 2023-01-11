import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { REGION_LIST, TAG_LIST } from '../../utils/jeju';
import { HoverDownVariants, ContentVariants } from '../../utils/variants';
import { useQuery } from 'react-query';
import { getPostRegion } from './../../api/api';
import PostModal from '../ui/PostModal';
import { IPost } from '../../utils/interface';

const TourScreen = () => {
  /* State */
  const [tags, setTags] = useState<string[]>([]);

  /* React-Router-Dom */
  const navigate = useNavigate();
  const regionMatch = useMatch('/tour/:region/');
  const postMatch = useMatch('/tour/:region/:postId');
  const region = regionMatch?.params.region;

  /* React-Query */
  const {
    data: regionPosts,
    isLoading,
    refetch,
  } = useQuery<IPost[]>('getPostRegion', () => getPostRegion(region + ''));

  /* Handlers */
  const postDetailHandler = (postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;
    console.log(value, checked);

    if (checked) {
      setTags([...tags, value]);
    } else {
      setTags(tags.filter((tag) => tag !== value));
    }
    /* 태그 검색 API */
  };

  return (
    <TourWrapper>
      <RegionNav>
        {REGION_LIST.map((item) => (
          <RegionBtn key={item.id} region={region === item.data}>
            <div
              onClick={() => {
                navigate(`/tour/${item.data}`);
                setTimeout(() => {
                  refetch();
                }, 100);
              }}
            >
              {item.data}
            </div>
          </RegionBtn>
        ))}
      </RegionNav>
      <TagNav>
        {TAG_LIST.map((list) => (
          <TagWrapper key={list.id}>
            <Label check={tags.includes(list.data) ? true : false}>
              {list.data}
              <input
                type="checkbox"
                value={list.data}
                onChange={tagChangeHandler}
              />
            </Label>
          </TagWrapper>
        ))}
      </TagNav>
      <Posts>
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          regionPosts?.map((post) => (
            <Post
              key={post.postId}
              variants={HoverDownVariants}
              whileHover="hover"
              bgphoto={post.fileMappers[0].file.fileUrl}
              onClick={() => postDetailHandler(post.postId)}
              layoutId={post.postId}
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
          ))
        )}
      </Posts>
      <AnimatePresence>
        {postMatch ? <PostModal id={postMatch.params.postId + ''} /> : null}
      </AnimatePresence>
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
`;

const RegionBtn = styled.button<{ region: boolean }>`
  border: none;
  background: none;
  border-bottom: ${(props) => (props.region ? '2px solid tomato' : 'none')};
`;

const TagNav = styled.nav`
  display: grid;
  margin: 20px 0;
  grid-template-columns: repeat(9, 1fr);
  gap: 5px;
  width: 100%;
  height: 100px;
`;

const TagWrapper = styled.div`
  input {
    display: none;
  }
`;

const Label = styled.label<{ check: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  background: ${(props) => (props.check ? 'tomato' : 'white')};
  cursor: pointer;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 15px;
`;

const Post = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
`;

const Content = styled(motion.div)`
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
