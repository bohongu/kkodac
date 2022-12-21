import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { modalState } from './../../recoil/atoms';

const modalVarints = {
  hidden: (exit: boolean) => ({
    x: exit ? window.outerWidth : -window.outerWidth,
  }),
  visible: { x: 0 },
  exit: {
    x: -window.outerWidth,
  },
};

const Subscriber = () => {
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <AnimatePresence initial={false}>
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
            ㅎㅇ
          </FollowingModal>
        </>
      )}
    </AnimatePresence>
  );
};

export default Subscriber;

const Overlay = styled(motion.div)`
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
  z-index: 30;
`;
