import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoIosSend } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { getPostDetail } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { IPostDetail } from '../../utils/interface';

interface IModal {
  id: string;
}

const PostModal = ({ id }: IModal) => {
  /* React-Router-Dom */
  const navigate = useNavigate();

  /* State */
  const [comment, setComment] = useState('');
  const [mainImg, setMainImg] = useState<string>('');
  const [z, setZ] = useState(0);

  /* React-Query */
  const { data } = useQuery<IPostDetail>('getPostDetail', () =>
    getPostDetail(id),
  );
  const createdAt = data?.createdAt.substring(0, 10);

  /* Handlers */
  const commentSubmitHandler = () => {
    console.log(comment);
    /* axios 댓글 */
    setComment('');
  };
  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.currentTarget.value);
  };
  const hideModalHanlder = () => {
    setMainImg('');
    navigate(-1);
  };
  const deleteCommentHandler = () => {
    /* 댓글 삭제  */
  };
  const viewHandler = (url: string) => {
    setMainImg(url);
  };

  return (
    <>
      {data && (
        <>
          <Overlay onClick={hideModalHanlder} />
          <Modal layoutId={id}>
            <Post>
              <TitleAndLike>
                <h1>{data.title}</h1>
                <div>❤</div>
              </TitleAndLike>
              <Tags>
                <h1>{data.regionId.name}</h1>
                <Tag>
                  {data.tagMappers.map((tag) => (
                    <h2 key={tag.tag.name}>{tag.tag.name}</h2>
                  ))}
                </Tag>
              </Tags>
              <AuthorAndDate>
                <h2>{data.authorId.nickname}</h2>
                <h3>{createdAt}</h3>
              </AuthorAndDate>
              <MainContent>
                <ImageSection>
                  <Thumb bgPhoto={data.fileMappers[0].file.fileUrl} />
                  <Image z={z} bgPhoto={mainImg} />
                  <ImageGrid>
                    {data.fileMappers.map((img) => (
                      <Images
                        key={img.file.fileId}
                        bgPhoto={img.file.fileUrl}
                        onClick={() => {
                          viewHandler(img.file.fileUrl);
                          setZ(5);
                        }}
                      />
                    ))}
                  </ImageGrid>
                </ImageSection>
                <Description>{data.description}</Description>
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
                    consectetur quae hic officiis est, culpa nihil modi placeat
                    id, iconsectetur quae hic officiis est, culpa nihil modi
                    placeat id, iconsectetur quae hic officiis est, culpa nihil
                    modi placeat id, iconsectetur quae hic officiis est, culpa
                    nihil modi placeat id, i
                  </CommentText>
                  <CommentNav>
                    <RiDeleteBin6Line onClick={deleteCommentHandler} />
                  </CommentNav>
                </CommentItem>
              </CommentList>
              <InputSection>
                <label>
                  <input
                    type="text"
                    onChange={commentChangeHandler}
                    value={comment}
                    placeholder="댓글"
                  />
                  <button onClick={commentSubmitHandler}>
                    <IoIosSend />
                  </button>
                </label>
              </InputSection>
            </Comment>
          </Modal>
        </>
      )}
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

const Tags = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  h1 {
    font-size: 12px;
    background: teal;
    padding: 5px;
    color: white;
  }
`;

const Tag = styled.div`
  ${(props) => props.theme.flex.flexCenter}
  h2 {
    font-size: 12px;
    margin-left: 5px;
    background: tomato;
    padding: 5px;
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
  height: 80%;
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

const Image = styled.div<{ bgPhoto: string; z: number }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 550px;
  height: 550px;
  z-index: ${(props) => props.z};
`;

const Thumb = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 550px;
  height: 550px;
  position: absolute;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const ImageGrid = styled.div`
  display: grid;
  overflow: scroll;
  height: 550px;
  gap: 10px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Images = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 270px;
  cursor: pointer;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const Description = styled.p`
  margin-top: 10px;
  height: 30px;
  line-height: 22px;
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
