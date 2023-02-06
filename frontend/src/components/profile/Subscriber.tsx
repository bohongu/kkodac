import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { SlUserUnfollow } from 'react-icons/sl';
import { subscriberModalState } from './../../recoil/atoms';
import { modalVarints } from '../../utils/variants';
import { useQuery, useMutation } from 'react-query';
import { IFollow, IUserId } from './../../utils/interface';
import { deleteFollow, getFollows } from './../../api/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner';

const Subscriber = ({ userId }: IUserId) => {
  /* Recoil */
  const [modal, setModal] = useRecoilState(subscriberModalState);

  const { data: follows, isLoading } = useQuery<IFollow>('follows', () =>
    getFollows(userId!),
  );
  const unFollow = useMutation(deleteFollow);

  const unFollowHandler = (followedUserId: string) => {
    unFollow.mutate(
      {
        userId,
        followedUserId,
      },
      {
        onSuccess: () => {
          alert('언팔로우하였습니다');
        },
      },
    );
  };

  return (
    <AnimatePresence initial={false}>
      {isLoading && <LoadingSpinner />}
      {modal.showModal && (
        <>
          <Overlay
            onClick={() => {
              setModal({ showModal: false, exit: true });
            }}
          />
          <FollowingModal
            variants={modalVarints}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={modal.exit}
          >
            <Lists>
              {follows?.users_followed_by_user.map((user, idx) => (
                <List key={idx}>
                  <Img bgphoto={user.fileId.fileUrl} />
                  <Nickname to={`/user/${user.userId}`}>
                    {user.nickname}
                  </Nickname>
                  <UnFollow>
                    <SlUserUnfollow
                      onClick={() => unFollowHandler(user.userId)}
                    />
                  </UnFollow>
                </List>
              ))}
            </Lists>
          </FollowingModal>
        </>
      )}
    </AnimatePresence>
  );
};

export default Subscriber;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;
const FollowingModal = styled(motion.div)`
  border-radius: 10px;
  width: 400px;
  height: 90vh;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 10px;
  position: fixed;
  top: 5vh;
  left: 5vh;
  background: white;
  z-index: 150;
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
`;

const List = styled.li`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 2.5px;
  border-radius: 10px;
  &:hover {
    transform: scale(1.03);
    transition: transform 0.4s;
  }
`;

const Img = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Nickname = styled(Link)`
  width: 80%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const UnFollow = styled.button`
  ${(props) => props.theme.flex.flexCenter}
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background: none;
  font-size: 20px;
  &:hover {
    color: red;
  }
`;
