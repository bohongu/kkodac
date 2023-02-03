import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { REGION_LIST } from '../../utils/jeju';
import { HoverDownVariants, ContentVariants } from '../../utils/variants';
import { useQuery } from 'react-query';
import { getPostRegion, getTags } from './../../api/api';
import PostModal from '../ui/PostModal';
import { IPost } from '../../utils/interface';
import LoadingSpinner from '../ui/LoadingSpinner';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
const TourScreen = () => {
  /* State */
  const [showSearch, setShowSearch] = useState(false);
  const [tag, setTag] = useState('');

  /* React-Router-Dom */
  const navigate = useNavigate();
  const regionMatch = useMatch('/tour/:region/');
  const postMatch = useMatch('/tour/:region/:postId');
  const region = regionMatch?.params.region;

  /* Recoil */

  /* React-Query */
  const {
    data: regionPosts,
    isLoading,
    refetch,
  } = useQuery<IPost[]>('getPostRegion', () => getPostRegion(region + '', tag));

  const {
    data: tagDatas,
    refetch: tagRefetch,
    isLoading: tagLoading,
  } = useQuery<{ tagId: string }[]>('getTags', getTags);

  /* Handlers */
  const postDetailHandler = (postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };
  const closeSearch = () => {
    setTag('');
    tagRefetch();
    setTimeout(() => {
      refetch();
    }, 100);
    setShowSearch(false);
  };

  const openSearch = () => {
    setShowSearch(true);
  };

  const chooseTag = (tagId: string) => {
    setTag(tagId);
    setTimeout(() => {
      refetch();
    }, 100);
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
      {showSearch && (
        <Tags>
          {tagDatas &&
            tagDatas.map((data) => (
              <Tag
                check={tag === data.tagId ? true : false}
                key={data.tagId}
                onClick={() => chooseTag(data.tagId)}
              >
                {data.tagId}
              </Tag>
            ))}
        </Tags>
      )}
      <div>
        {showSearch ? (
          <ToggleWrapper>
            <MdOutlineArrowDropUp
              onClick={closeSearch}
              style={{
                fontSize: '30px',
                cursor: 'pointer',
              }}
            />
            <span>검색 초기화하기!</span>
          </ToggleWrapper>
        ) : (
          <ToggleWrapper>
            <MdOutlineArrowDropDown
              onClick={openSearch}
              style={{ fontSize: '30px', cursor: 'pointer' }}
            />
            <span>태그로 검색하기!</span>
          </ToggleWrapper>
        )}
      </div>
      <Posts>
        {tagLoading && <LoadingSpinner />}
        {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : regionPosts?.length !== 0 ? (
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
                <h3>
                  <span>❤</span>&nbsp;{post.likes.length}
                </h3>
              </Content>
            </Post>
          ))
        ) : (
          <div>게시물이 없습니다.</div>
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
  padding-bottom: 40px;
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
  background: ${(props) => (props.region ? props.theme.colors.green : 'none')};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  font-family: Neo;
  font-weight: 600;
  font-size: 16px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  ${(props) => props.theme.flex.flexCenterColumn}
  span {
    font-size: 12px;
    margin-bottom: 8px;
  }
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
  background: #f1f3f5;
  h1 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 10px;
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: end;
    span {
      color: ${(props) => props.theme.colors.red};
    }
  }
`;

const Tags = styled.div`
  margin-top: 18px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 100px;
  padding: 10px;
  border-bottom: 3px solid ${(props) => props.theme.colors.gray};
`;

const Tag = styled.div<{ check: boolean }>`
  border-bottom: 1px solid black;
  display: flex;
  margin: 5px 20px;
  cursor: pointer;
  height: 20px;
  color: ${(props) => (props.check ? props.theme.colors.harderGreen : 'black')};
  border-color: ${(props) =>
    props.check ? props.theme.colors.harderGreen : 'black'};
  &:hover {
    color: ${(props) => props.theme.colors.hardGreen};
    border-bottom: 1px solid ${(props) => props.theme.colors.hardGreen};
  }
`;
