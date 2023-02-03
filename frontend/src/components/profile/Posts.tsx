import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { ContentVariants, HoverDownVariants } from '../../utils/variants';
import { useQuery, useMutation } from 'react-query';
import { getUserPost } from '../../api/api';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import { IPost } from './../../utils/interface';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { deletePost } from './../../api/api';

const PostSection = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(currentUser);

  const { data, isLoading, refetch } = useQuery<IPost[]>('getUserPost', () =>
    getUserPost(user.userId),
  );

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  const removePost = useMutation(deletePost);

  const removeHandler = (id: string) => {
    removePost.mutate(id, {
      onSuccess: () => {
        setTimeout(() => {
          refetch();
        }, 200);
      },
    });
  };

  return (
    <PostWrapper>
      {isLoading && <LoadingSpinner />}
      <Posts>
        {data && data.length > 0 ? (
          data.map((data) => (
            <Post
              variants={HoverDownVariants}
              whileHover="hover"
              bgphoto={data.fileMappers[0].file.fileUrl}
              layoutId={data.postId}
              onClick={() => postDetailHandler(data.regionId.name, data.postId)}
              key={data.postId}
            >
              <Delete onClick={() => removeHandler(data.postId)}>
                <ImCancelCircle />
              </Delete>
              <Content variants={ContentVariants}>
                <h1>{data.title}</h1>
                <h4>{data.createdAt.slice(0, 10)}</h4>
                <h2>{data.regionId.name}</h2>
                <h3>
                  <span>❤</span>&nbsp;{data.likes.length}
                </h3>
              </Content>
            </Post>
          ))
        ) : (
          <span>게시물이 없습니다.</span>
        )}
      </Posts>
    </PostWrapper>
  );
};

export default PostSection;

const PostWrapper = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin-right: 100px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  padding: 50px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Delete = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: white;
  &:hover {
    color: red;
  }
`;

const Post = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  z-index: 80;
  position: relative;
`;

const Content = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px;
  opacity: 0;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #f1f3f5;
  h1 {
    font-size: 18px;
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

  h4 {
    margin-bottom: 10px;
    font-size: 12px;
  }
`;
