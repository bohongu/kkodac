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
            <Lists>
              {isLoading && <LoadingSpinner />}
              {data?.map((post) => (
                <List
                  key={post.post.postId}
                  layoutId={post.post.postId}
                  onClick={() =>
                    postDetailHandler(post.post.regionId.name, post.post.postId)
                  }
                >
                  {post.post.title}
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
  background: white;
  z-index: 200;
  top: 5vh;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const Lists = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const List = styled(motion.div)`
  border: 1px solid black;
  height: 300px;
`;
