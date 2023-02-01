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
              <p>{user.result.introduce}</p>
            </Personal>
            <Btn>
              <button onClick={onFollow}>
                {canFollow ? 'UnFollow' : 'Follow'}
              </button>
            </Btn>
          </Text>
        </Info>
      )}

      <Posts>
        {posts &&
          posts.map((post) => (
            <Post
              key={post.postId}
              layoutId={post.postId}
              onClick={() => postDetailHandler(post.regionId.name, post.postId)}
            >
              <Thumb bgphoto={post.fileMappers[0].file.fileUrl} />
              <PostInfo>
                <h1>{post.title}</h1>
                <h2>{post.createdAt.slice(0, 10)}</h2>
                <p>
                  {post.description.length < 100
                    ? post.description
                    : post.description.slice(0, 100) + '...'}
                </p>
                <span>❤ 300</span>
              </PostInfo>
            </Post>
          ))}
      </Posts>
    </UserWrapper>
  );
};

export default UserScreen;

const UserWrapper = styled.div`
  margin: 0 30%;
  margin-top: 80px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Info = styled.div`
  border: 1px solid black;
  height: 21rem;
  display: grid;
  grid-template-columns: 21rem auto;
`;

const ImageSection = styled.div`
  display: flex;
  ${(props) => props.theme.flex.flexCenter}
`;

const Image = styled.div<{ bgphoto: string }>`
  border: 1px solid black;
  height: 19rem;
  width: 19rem;
  border-radius: 50%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const Text = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 3rem;
`;

const Statistic = styled.div`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Box = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Personal = styled.div`
  border: 1px solid yellow;
`;

const Btn = styled.div`
  border: 1px solid green;
`;

const Posts = styled.div`
  padding: 10px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 10px;
`;

const Post = styled(motion.div)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 15rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: white;
`;

const Thumb = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: 1px solid black;
  height: 15rem;
  width: 15rem;
  margin-right: 20px;
`;

const PostInfo = styled.div`
  padding: 5px;
  height: 15rem;
  h1 {
    font-size: 25px;
  }
  h2 {
    font-size: 12px;
  }
`;
