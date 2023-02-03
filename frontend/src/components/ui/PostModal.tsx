import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TbSend } from 'react-icons/tb';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteComment, deleteLike, getPostDetail } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { IPostDetail } from '../../utils/interface';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import { createComments, createLike } from './../../api/api';
import LoadingSpinner from './LoadingSpinner';

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
  const [like, setLike] = useState(false);

  /* React-Query */
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<IPostDetail>('getPostDetail', () =>
    getPostDetail(id),
  );
  const sendComment = useMutation(createComments);
  const removeComment = useMutation(deleteComment);
  const likeMutation = useMutation(createLike);
  const unlikeMutation = useMutation(deleteLike);

  /* Recoil */
  const cUser = useRecoilValue(currentUser);

  /* Handlers */
  const commentSubmitHandler = () => {
    sendComment.mutate(
      {
        description: comment,
        authorId: cUser.userId,
        postId: id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('getPostDetail');
          setComment('');
        },
      },
    );
  };
  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.currentTarget.value);
  };
  const hideModalHanlder = () => {
    setMainImg('');
    navigate(-1);
  };
  const deleteCommentHandler = (id: string) => {
    removeComment.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('getPostDetail');
      },
    });
  };
  const viewHandler = (url: string) => {
    setMainImg(url);
  };

  useEffect(() => {
    const checkLike = () => {
      if (data) {
        if (data.likes.find((user) => user.user.userId === cUser.userId)) {
          setLike(true);
        } else {
          setLike(false);
        }
      }
    };

    checkLike();
  }, [cUser.userId, data, like]);

  const onLike = () => {
    likeMutation.mutate(
      { postId: data!.postId, userId: cUser.userId },
      {
        onSuccess: () => {
          setLike(true);
          queryClient.invalidateQueries('getPostDetail');
        },
      },
    );
  };

  const onUnLike = () => {
    unlikeMutation.mutate(
      { postId: data!.postId, userId: cUser.userId },
      {
        onSuccess: () => {
          setLike(false);
          queryClient.invalidateQueries('getPostDetail');
        },
      },
    );
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <>
          <Overlay onClick={hideModalHanlder} />
          <Modal layoutId={id}>
            <Post>
              <TitleAndLike>
                <h1>{data.title}</h1>
                <Like>
                  {like ? (
                    <FaHeart
                      onClick={onUnLike}
                      style={{ fontSize: '20px', color: 'red' }}
                    />
                  ) : (
                    <FaRegHeart
                      onClick={onLike}
                      style={{ fontSize: '20px', color: 'red' }}
                    />
                  )}
                  <LikeCount>{data.likes.length}</LikeCount>
                </Like>
              </TitleAndLike>
              <Tags>
                <h1>{data.regionId.name}</h1>
                <Tag>
                  {data.tagMappers.map((tag, idx) => (
                    <h2 key={idx}>{tag.tag.tagId}</h2>
                  ))}
                </Tag>
              </Tags>
              <AuthorAndDate>
                <Author
                  to={
                    cUser.userId === data.authorId.userId
                      ? `/profile/${cUser.userId}`
                      : `/user/${data.authorId.userId}`
                  }
                >
                  {data.authorId.nickname}
                </Author>
                <h3>{data.createdAt.slice(0, 10)}</h3>
              </AuthorAndDate>
              <MainContent>
                <ImageSection>
                  <Thumb bgPhoto={data.fileMappers[0].file.fileUrl} />
                  <Image z={z} bgPhoto={mainImg} />
                  <ImageGrid>
                    {data.fileMappers.map((img) => (
                      <Images
                        key={img.file.fileUrl}
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
                <Profile photo={cUser.fileId.fileUrl} />
                <h1>{cUser.nickname}</h1>
              </Me>
              <CommentList>
                {data.commentMappers.map((comment) => (
                  <CommentItem key={comment.comment.commentId}>
                    <CommentAuthorNick
                      to={
                        cUser.userId === comment.comment.authorId.userId
                          ? `/profile/${cUser.userId} `
                          : `/user/${comment.comment.authorId.userId}`
                      }
                    >
                      {comment.comment.authorId.nickname}
                    </CommentAuthorNick>
                    <section>
                      <AuthorProfile
                        bgphoto={comment.comment.authorId.fileId.fileUrl}
                        to={
                          cUser.userId === comment.comment.authorId.userId
                            ? `/profile/${cUser.userId} `
                            : `/user/${comment.comment.authorId.userId}`
                        }
                      />
                      <CommentText>{comment.comment.description}</CommentText>
                      <CommentNav>
                        {comment.comment.authorId.userId === cUser.userId ? (
                          <TiDeleteOutline
                            onClick={() =>
                              deleteCommentHandler(comment.comment.commentId)
                            }
                          />
                        ) : null}
                      </CommentNav>
                    </section>
                  </CommentItem>
                ))}
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
                    <TbSend />
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
  padding: 10px;
`;

const Comment = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.3);
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
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  h1 {
    font-size: 12px;
    background: ${(props) => props.theme.colors.hardGreen};
    padding: 5px;
    color: white;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 12px;
    background: orange;
    padding: 5px;
    color: white;
    margin-left: 5px;
  }
`;

const AuthorAndDate = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  h3 {
    font-size: 14px;
  }
`;

const Author = styled(Link)``;

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
  border: 0.5px solid ${(props) => props.theme.colors.gray};
`;

const Thumb = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 550px;
  height: 550px;
  position: absolute;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
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
  border: 0.5px solid ${(props) => props.theme.colors.gray};
`;

const Description = styled.p`
  margin-top: 10px;
  height: 30px;
  line-height: 22px;
`;

const Me = styled.div`
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  padding-left: 5px;
  ${(props) => props.theme.flex.flexCenter}
  justify-content: start;
`;

const Profile = styled.img<{ photo: string }>`
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 5px 0;
  section {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const CommentAuthorNick = styled(Link)`
  padding-left: 3px;
  margin-bottom: 5px;
  font-size: 12px;
`;

const AuthorProfile = styled(Link)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
  margin-right: 20px;
  cursor: pointer;
`;

const CommentText = styled.p`
  align-items: flex-start;
  font-size: 12px;
  width: 90%;
`;

const CommentNav = styled.nav`
  height: 20px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.red};
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
    border-top: 0.5px solid rgba(0, 0, 0, 0.3);
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
    font-size: 25px;
  }
`;

const Like = styled.div`
  display: flex;
  align-items: center;
`;

const LikeCount = styled.div`
  margin-left: 5px;
  font-size: 20px;
`;
