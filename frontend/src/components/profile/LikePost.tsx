import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { likeModalState } from './../../recoil/atoms';
import { Overlay } from './Subscriber';
import { useQuery } from 'react-query';
import { likePosts } from '../../api/api';
import { IUserId } from '../../utils/interface';
import styled from 'styled-components';
import { ILikePost } from './../../utils/interface';
import { modalVarints } from './../../utils/variants';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner';

const LikePost = ({ userId }: IUserId) => {
  const navigate = useNavigate();

  const [modal, setModal] = useRecoilState(likeModalState);

  const { data, isLoading } = useQuery<ILikePost[]>('likePosts', () =>
    likePosts(userId!),
  );

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  return (
    <AnimatePresence>
      {modal.showModal && (
        <>
          <Overlay
            onClick={() => {
              setModal({ showModal: false, exit: true });
            }}
          />
          <LikeModal
            variants={modalVarints}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={modal.exit}
          >
            <Title>내가 좋아요한 게시물</Title>
            <Lists>
              {isLoading && <LoadingSpinner />}
              {data?.map((post) => (
                <List
                  key={post.post.postId}
                  bgphoto={post.post.fileMappers[0].file.fileUrl}
                  layoutId={post.post.postId}
                  onClick={() =>
                    postDetailHandler(post.post.regionId.name, post.post.postId)
                  }
                >
                  <Content>
                    <h1>{post.post.title}</h1>
                    <h4>{post.post.createdAt.slice(0, 10)}</h4>
                    <h2>{post.post.authorId.nickname}</h2>
                  </Content>
                </List>
              ))}
            </Lists>
          </LikeModal>
        </>
      )}
    </AnimatePresence>
  );
};

export default LikePost;

const LikeModal = styled(motion.div)`
  position: fixed;
  width: 50vw;
  height: 90vh;
  border-radius: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 15px;
  background: #f8f9fa;
  z-index: 200;
  top: 5vh;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const Title = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.colors.hardGray};
  padding: 5px 0;
  margin-bottom: 15px;
`;

const Lists = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const List = styled(motion.div)<{ bgphoto: string }>`
  height: 300px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #f1f3f5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  h4 {
    margin-bottom: 10px;
    font-size: 10px;
  }
`;
