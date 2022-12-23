import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { postModalState } from '../../recoil/atoms';

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
              <ImageGrid></ImageGrid>
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
        <Comment></Comment>
      </Modal>
    </>
  );
};

export default PostModal;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
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
  grid-template-columns: 2.5fr 1fr;
  margin-bottom: 20px;
`;

const Image = styled.div`
  border: 1px solid black;
  width: 550px;
  height: 550px;
`;

const ImageGrid = styled.div`
  border: 1px solid black;
`;

const Description = styled.p`
  height: 30px;
`;
