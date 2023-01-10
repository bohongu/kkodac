import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { SlUserUnfollow } from 'react-icons/sl';
import { subscriberModalState } from './../../recoil/atoms';
import { modalVarints } from '../../utils/variants';

const Subscriber = () => {
  /* Recoil */
  const [modal, setModal] = useRecoilState(subscriberModalState);

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
            <Search>
              <label>
                <Input />
                <Glass>
                  <AiOutlineSearch />
                </Glass>
              </label>
            </Search>
            <Lists>
              <List>
                <Img></Img>
                <Nickname>정재홍</Nickname>
                <UnFollow>
                  <SlUserUnfollow />
                </UnFollow>
              </List>
              <List>
                <Img></Img>
                <Nickname>엄지혜</Nickname>
                <UnFollow>
                  <SlUserUnfollow />
                </UnFollow>
              </List>
              <List>
                <Img></Img>
                <Nickname>엄지원</Nickname>
                <UnFollow>
                  <SlUserUnfollow />
                </UnFollow>
              </List>
            </Lists>
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

const Search = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    width: 90%;
    position: relative;
  }
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  padding: 0 15px;
  border: none;
  border-radius: 10px;
  background: white;
  border: 1px solid black;
  color: black;
  margin-bottom: 10px;
`;

const Glass = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  position: absolute;
  top: 0;
  right: 5px;
  border: none;
  background: none;
  font-size: 25px;
  color: black;
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
`;

const Img = styled.div`
  border: 1px solid black;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Nickname = styled.div`
  width: 80%;
  padding-left: 10px;
`;

const UnFollow = styled.button`
  ${(props) => props.theme.flex.flexCenter}
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background: none;
  font-size: 20px;
`;
