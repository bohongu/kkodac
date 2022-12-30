import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { postModalState } from '../../recoil/atoms';
import { IoIosSend } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import img1 from '../../assets/images/정재홍.jpg';
import img2 from '../../assets/images/테스트.jpg';
import img3 from '../../assets/images/cat.jpg';
import img4 from '../../assets/images/cat2.jpg';

interface IModal {
  id: string;
}

const imgs = [img1, img2, img3, img4];

const PostModal = ({ id }: IModal) => {
  const [current, setCurrent] = useState<string | undefined>(imgs[0]);
  const setModal = useSetRecoilState(postModalState);
  const hideModal = () => {
    setModal(false);
  };
  const deleteCommentHandler = () => {
    /* 댓글 삭제  */
  };
  const viewHandler = (img: string) => {
    if (current) {
      setCurrent(imgs.find((i) => i === img));
    }
  };
  return (
    <>
      <Overlay onClick={hideModal} />
      <Modal layoutId={id}>
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
              {current && <Image photo={current} />}
              <ImageGrid>
                {imgs.map((img) => (
                  <Images
                    onClick={() => viewHandler(img)}
                    key={img}
                    bgPhoto={img}
                  />
                ))}
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
          <CommentList>
            <CommentItem>
              <div></div>
              <h1>엄지혜</h1>
              <CommentText>
                consectetur quae hic officiis est, culpa nihil modi placeat id,
                iconsectetur quae hic officiis est, culpa nihil modi placeat id,
                iconsectetur quae hic officiis est, culpa nihil modi placeat id,
                iconsectetur quae hic officiis est, culpa nihil modi placeat id,
                i
              </CommentText>
              <CommentNav>
                <RiDeleteBin6Line onClick={deleteCommentHandler} />
              </CommentNav>
            </CommentItem>
          </CommentList>
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
  grid-template-rows: 1fr 11fr 1fr;
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

const Image = styled.div<{ photo: string }>`
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
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
`;

const Images = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border: 1px solid black;
  height: 240px;
`;

const Description = styled.p`
  margin-top: 10px;
  height: 30px;
`;

const Me = styled.div`
  border-bottom: 1px solid black;
  padding-left: 5px;
  ${(props) => props.theme.flex.flexCenter}
  justify-content: start;

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
  margin-top: 15px;
  padding: 0 5px;
`;

const CommentItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 8.5fr 0.5fr;
  gap: 3px;
  div {
    border: 1px solid black;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    ${(props) => props.theme.flex.flexCenter}
  }
  h1 {
    font-size: 12px;
    font-weight: bold;
    padding-top: 5px;
    ${(props) => props.theme.flex.flexCenter}
    align-items: flex-start;
  }
`;

const CommentText = styled.p`
  ${(props) => props.theme.flex.flexCenter}
  align-items: flex-start;
  font-size: 12px;
`;

const CommentNav = styled.nav`
  display: flex;
  justify-content: center;
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
