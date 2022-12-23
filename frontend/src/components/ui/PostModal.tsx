import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { postModalState } from '../../recoil/atoms';
import { IoIosSend } from 'react-icons/io';

const PostModal = () => {
  const setModal = useSetRecoilState(postModalState);
  const hideModal = () => {
    setModal(false);
  };
  return (
    <>
      <Overlay onClick={hideModal} />
      <Modal layoutId={'1'}>
        <Post>
          <TitleAndLike>
            <h1>아쿠아리움을 다녀왔어요</h1>
            <div>❤</div>
          </TitleAndLike>
          <AuthorAndDate>
            <h2>엄지혜</h2>
            <h3>2022-12-23</h3>
          </AuthorAndDate>
          <MainContent>
            <ImageSection>
              <Image></Image>
              <ImageGrid>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </ImageGrid>
            </ImageSection>
            <Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              neque soluta deserunt nobis pariatur ex consectetur quae hic
              officiis est, culpa nihil modi placeat id, illo quidem doloribus
              ullam aspernatur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sint, neque soluta deserunt nobis pariatur ex
              consectetur quae hic officiis est, culpa nihil modi placeat id,
              illo quidem doloribus ullam aspernatur! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sint, neque soluta deserunt nobis
              pariatur ex consectetur quae hic officiis est, culpa nihil
              modiLorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              neque soluta deserunt nobis pariatur ex consectetur quae hic
              officiis est, culpa nihil modi placeat id, illo quidem doloribus
              ullam aspernatur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sint, neque soluta deserunt nobis pariatur ex
              consectetur quae hic officiis est, culpa nihil modi placeat id,
              illo quidem doloribus ullam aspernatur! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sint, neque soluta deserunt nobis
              pariatur ex consectetur quae hic officiis est, culpa nihil modi
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              neque soluta deserunt nobis pariatur ex consectetur quae hic
              officiis est, culpa nihil modi placeat id, illo quidem doloribus
              ullam aspernatur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sint, neque soluta deserunt nobis pariatur ex
              consectetur quae hic officiis est, culpa nihil modi placeat id,
              illo quidem doloribus ullam aspernatur! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sint, neque soluta deserunt nobis
              pariatur ex consectetur quae hic officiis est, culpa nihil
              modiLorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              neque soluta deserunt nobis pariatur ex consectetur quae hic
              officiis est, culpa nihil modi placeat id, illo quidem doloribus
              ullam aspernatur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sint, neque soluta deserunt nobis pariatur ex
              consectetur quae hic officiis est, culpa nihil modi placeat id,
              illo quidem doloribus ullam aspernatur! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sint, neque soluta deserunt nobis
              pariatur ex consectetur quae hic officiis est, culpa nihil modi
            </Description>
          </MainContent>
        </Post>
        <Comment>
          <Me>
            <div></div>
            <h1>엄지혜</h1>
          </Me>
          <CommentList></CommentList>
          <InputSection>
            <label>
              <input />
              <button>
                <IoIosSend />
              </button>
            </label>
          </InputSection>
        </Comment>
      </Modal>
    </>
  );
};

export default PostModal;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.85);
  width: 100%;
  height: 100%;
`;

const Modal = styled(motion.div)`
  border-radius: 10px;
  position: fixed;
  background: white;
  width: 70vw;
  height: 90vh;
  left: 0;
  right: 0;
  top: 5vh;
  margin: 0 auto;
  padding: 15px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  z-index: 100;
`;

const Post = styled.div`
  border: 1px solid black;
  padding: 10px;
`;

const Comment = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-rows: 0.7fr 8fr 0.7fr;
`;

const TitleAndLike = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 24px;
  }
  div {
    font-size: 20px;
    color: red;
  }
`;

const AuthorAndDate = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  h2 {
  }
  h3 {
  }
`;

const MainContent = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ImageSection = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr;
  gap: 10px;
`;

const Image = styled.div`
  border: 1px solid black;
  width: 550px;
  height: 550px;
`;

const ImageGrid = styled.div`
  display: grid;
  overflow: scroll;
  height: 550px;
  display: grid;
  gap: 10px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  div {
    border: 1px solid black;
    height: 240px;
  }
`;

const Description = styled.p`
  margin-top: 10px;
  height: 30px;
`;

const Me = styled.div`
  border-bottom: 1px solid black;
  ${(props) => props.theme.flex.flexCenter}
  justify-content: start;
  padding-left: 10px;
  div {
    border: 1px solid black;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const CommentList = styled.ul`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const InputSection = styled.div`
  ${(props) => props.theme.flex.flexCenter}
  align-items: flex-end;
  label {
    position: relative;
  }
  input {
    height: 45px;
    width: 440px;
    padding: 0 15px;
    border: none;
    background: none;
    border-top: 1px solid black;
    color: black;
  }
  button {
    display: flex;
    align-items: center;
    height: 45px;
    position: absolute;
    top: 0;
    right: 5px;
    border: none;
    background: none;
    color: black;
    font-size: 30px;
  }
`;
