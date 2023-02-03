import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { deleteFollow, getUser, getUserPost } from '../../api/api';
import styled from 'styled-components';
import { IGetUser, IPost, IFollow } from './../../utils/interface';
import { motion } from 'framer-motion';
import { createFollow, getFollows } from './../../api/api';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../recoil/atoms';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ContentVariants, HoverDownVariants } from '../../utils/variants';

const UserScreen = () => {
  const [canFollow, setCanFollow] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();

  const cUser = useRecoilValue(currentUser);

  const { data: posts, isLoading: postsLoading } = useQuery<IPost[]>(
    'getOtherUserPost',
    () => getUserPost(userId!),
  );
  const { data: user, isLoading: userLoading } = useQuery<IGetUser>(
    'getUserProfile',
    () => getUser(userId!),
  );
  const follow = useMutation(createFollow);
  const unFollow = useMutation(deleteFollow);
  const { data: follows, isLoading: dataLoading } = useQuery<IFollow>(
    'follows',
    () => getFollows(userId!),
  );

  const postDetailHandler = (region: string, postId: string) => {
    navigate(`/tour/${region}/${postId}`);
  };

  const onFollow = () => {
    if (canFollow === false) {
      follow.mutate(
        { userId: cUser.userId, followedUserId: userId! },
        {
          onSuccess: () => {
            setCanFollow(true);
            alert('팔로잉하였습니다');
          },
        },
      );
    } else {
      unFollow.mutate(
        { userId: cUser.userId, followedUserId: userId! },
        {
          onSuccess: () => {
            setCanFollow(false);
            alert('언팔로우하였습니다');
          },
        },
      );
    }
  };

  useEffect(() => {
    const checkFollow = () => {
      if (follows) {
        if (
          follows.users_follow_user.find((user) => user.userId === cUser.userId)
        ) {
          setCanFollow(true);
        } else {
          setCanFollow(false);
        }
      }
    };

    checkFollow();
  }, [cUser.userId, follows]);

  return (
    <UserWrapper>
      {postsLoading && <LoadingSpinner />}
      {userLoading && <LoadingSpinner />}
      {dataLoading && <LoadingSpinner />}
      {user && posts && (
        <Info>
          <ImageSection>
            <Image bgphoto={user.result.fileId.fileUrl} />
          </ImageSection>
          <Text>
            <Statistic>
              <Box>
                <h1>글</h1>
                <h2>{posts!.length}</h2>
              </Box>
              <Box>
                <h1>팔로우</h1>
                <h2>{user.follower[0].count}</h2>
              </Box>
              <Box>
                <h1>팔로잉</h1>
                <h2>{user.follow[0].count}</h2>
              </Box>
            </Statistic>
            <Personal>
              <h1>{user.result.nickname}</h1>
              <h2>{user.result.username}</h2>
              {user.result.introduce ? <h3>{user.result.introduce}</h3> : null}
            </Personal>
          </Text>
          <Btn>
            <button onClick={onFollow}>
              {canFollow ? 'UnFollow' : 'Follow'}
            </button>
          </Btn>
        </Info>
      )}

      <Posts>
        {posts && posts.length < 0 ? (
          <span>게시물이 없습니다.</span>
        ) : (
          posts?.map((post) => (
            <Post
              key={post.postId}
              variants={HoverDownVariants}
              whileHover="hover"
              layoutId={post.postId}
              onClick={() => postDetailHandler(post.regionId.name, post.postId)}
              bgphoto={post.fileMappers[0].file.fileUrl}
            >
              <PostInfo variants={ContentVariants}>
                <h1>{post.title}</h1>
                <h4>{post.createdAt.slice(0, 10)}</h4>
                <h2>{post.regionId.name}</h2>
                <h3>
                  <span>❤</span>&nbsp;{post.likes.length}
                </h3>
              </PostInfo>
            </Post>
          ))
        )}
      </Posts>
    </UserWrapper>
  );
};

export default UserScreen;

const UserWrapper = styled.div`
  margin: 0 150px;
  margin-top: 80px;
`;

const Info = styled.div`
  display: flex;
  padding: 20px 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray};
`;

const ImageSection = styled.div`
  display: flex;
  ${(props) => props.theme.flex.flexCenter}
  margin-right: 50px;
`;

const Image = styled.div<{ bgphoto: string }>`
  border: 0.5px solid ${(props) => props.theme.colors.gray};
  height: 11rem;
  width: 11rem;
  border-radius: 50%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Statistic = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Box = styled.div`
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
`;

const Personal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 14px;
    color: ${(props) => props.theme.colors.hardGray};
    margin: 10px 0;
  }
  h3 {
    font-size: 12px;
  }
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  button {
    font-family: Neo;
    padding: 6px 7px;
    border-radius: 9px;
    border: none;
    font-weight: bold;
    color: white;
    background: ${(props) => props.theme.colors.green};
    &:hover {
      background: ${(props) => props.theme.colors.hardGreen};
    }
  }
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Post = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 20rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const PostInfo = styled(motion.div)`
  padding: 10px;
  height: 120px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #f1f3f5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: 0;
  h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 10px;
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: end;
    span {
      color: ${(props) => props.theme.colors.red};
    }
  }
  h4 {
    margin-bottom: 10px;
    font-size: 10px;
  }
`;
