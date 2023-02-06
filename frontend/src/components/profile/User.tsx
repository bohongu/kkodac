import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  currentUser,
  subscriberModalState,
  likeModalState,
} from './../../recoil/atoms';
import { MdFace } from 'react-icons/md';
import { FILE_MAX_SIZE } from '../../utils/jeju';
import { useMutation, useQuery } from 'react-query';
import { getUserPost, likePosts, postFile } from '../../api/api';
import { editingProfile, getFollows } from './../../api/api';
import { IFollow, ILikePost, IPost } from './../../utils/interface';
import LoadingSpinner from '../ui/LoadingSpinner';

const UserSection = () => {
  /* State */
  const [drop, setDrop] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  /* Recoil */
  const setModal = useSetRecoilState(subscriberModalState);
  const setLikeModal = useSetRecoilState(likeModalState);
  const cUser = useRecoilValue(currentUser);

  const [profileImage, setProfileImage] = useState<{
    id: string;
    url: string;
  }>({ id: cUser.fileId.fileId, url: cUser.fileId.fileUrl });

  /* React-Query */
  const sendFile = useMutation(postFile);
  const updateProfile = useMutation(editingProfile);

  const { data: posts } = useQuery<IPost[]>('getUserPost', () =>
    getUserPost(cUser.userId),
  );

  const { data: follow, isLoading: followLoading } = useQuery<IFollow>(
    'getFollowsUser',
    () => getFollows(cUser.userId),
  );
  const { data: likePostDatas, isLoading: likeLoading } = useQuery<ILikePost[]>(
    'likePosts',
    () => likePosts(cUser.userId),
  );

  /* Handlers */
  const setEditProfileHandler = () => {
    setEditProfile(true);
  };
  const closeEditProfileHandler = () => {
    setBio('');
    setNickname('');
    setProfileImage({ id: cUser.fileId.fileId, url: cUser.fileId.fileUrl });
    setEditProfile(false);
  };
  const removeImageHandler = () => {
    setProfileImage({
      ...profileImage,
      id: cUser.fileId.fileId,
      url: cUser.fileId.fileUrl,
    });
  };

  const profileImageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.currentTarget;
    const formData = new FormData();
    if (!files) {
      return;
    }
    if (files[0].size > FILE_MAX_SIZE) {
      alert('업로드 가능한 최대 용량은 3MB입니다.');
    } else {
      formData.append('file', files[0]);
      sendFile.mutate(formData, {
        onSuccess: (data) => {
          const profileImageInfo = {
            id: data.data.id,
            url: data.data.url,
          };
          setProfileImage(profileImageInfo);
        },
      });
    }
  };

  const nicknameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNickname(event.currentTarget.value);
  };

  const bioChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.currentTarget.value);
  };

  const submitProfileHandler = () => {
    if (nickname.length > 8 || nickname.length < 3) {
      alert('닉네임을 3-8자로 작성해주세요');
      setNickname('');
      return;
    }

    updateProfile.mutate(
      {
        userId: cUser.userId,
        introduce: bio ? bio : cUser.introduce,
        fileId: profileImage.id,
        nickname: nickname ? nickname : cUser.nickname,
      },
      {
        onSuccess: () => {
          alert('회원 정보를 변경하였습니다');
          setNickname(nickname);
          setBio(bio);
          setEditProfile(false);
        },
        onError(error, variables, context) {
          console.log(error);
        },
      },
    );
  };

  return (
    <UserWrapper>
      {followLoading && <LoadingSpinner />}
      {likeLoading && <LoadingSpinner />}
      <UserImageSection>
        <UserImage photo={profileImage.url} />
        {editProfile && (
          <>
            <UserImageBtn>
              <MdFace
                onClick={() => {
                  setDrop((prev) => !prev);
                }}
              />
            </UserImageBtn>
            {drop && (
              <Drop>
                <div onClick={removeImageHandler}>Remove photo</div>
                <label htmlFor="profile-image">
                  <div>Upload a photo</div>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  onChange={profileImageChangeHandler}
                />
              </Drop>
            )}
          </>
        )}
      </UserImageSection>
      {!editProfile ? (
        <Info>
          <Nickname>{cUser.nickname}</Nickname>
          <UserId>{cUser.username}</UserId>
          <Introduce>
            {cUser.introduce ? cUser.introduce : '자기소개가 없습니다.'}
          </Introduce>
        </Info>
      ) : (
        <Edit>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            value={nickname}
            onChange={nicknameChangeHandler}
          />
          <label htmlFor="introduce">자기소개</label>
          <textarea id="introduce" value={bio} onChange={bioChangeHandler} />
          <div>
            <button onClick={submitProfileHandler}>Save</button>
            <button onClick={closeEditProfileHandler}>Cancel</button>
          </div>
        </Edit>
      )}
      {!editProfile && (
        <UserInfoBtn onClick={setEditProfileHandler}>프로필 변경</UserInfoBtn>
      )}
      <Followers>
        <section>
          팔로잉 :
          <span
            onClick={() => {
              setModal({ showModal: true, exit: false });
            }}
          >
            {follow?.users_followed_by_user.length}
          </span>
        </section>
        <section>
          내가 좋아요한 게시물 :
          <span
            onClick={() => {
              setLikeModal({ showModal: true, exit: false });
            }}
          >
            {likePostDatas?.length}
          </span>
        </section>
        <section>
          나의 게시물 :
          <span
            onClick={() => {
              alert(`나의 게시물은 ${posts?.length}개 입니다.`);
            }}
          >
            {posts?.length}
          </span>
        </section>
      </Followers>
    </UserWrapper>
  );
};

export default UserSection;

const UserWrapper = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  padding-top: 50px;
  margin-left: 100px;
`;

const UserImageSection = styled.div`
  ${(props) => props.theme.flex.flexCenter}
  margin-bottom: 10%;
  position: relative;
`;

const UserImage = styled.img<{ photo: string }>`
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
`;

const UserImageBtn = styled.div`
  border: none;
  ${(props) => props.theme.flex.flexCenter}
  height: 30px;
  width: 30px;
  border-radius: 50%;
  bottom: 55px;
  left: 280px;
  font-size: 30px;
  border: 0.5px solid black;
  color: black;
  position: absolute;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.hardGreen};
    border-color: ${(props) => props.theme.colors.hardGreen};
  }
`;

const Drop = styled.div`
  ${(props) => props.theme.flex.flexCenterColumn}
  bottom: 10px;
  right: -40px;
  position: absolute;
  border: 0.5px solid black;
  border-radius: 5px;
  background: white;
  &:hover {
    border-color: ${(props) => props.theme.colors.hardGreen};
  }
  div {
    width: 100px;
    padding: 5px;
    font-size: 10px;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.colors.hardGreen};
      border-color: ${(props) => props.theme.colors.hardGreen};
    }
  }

  input {
    display: none;
  }
`;

const Info = styled.div`
  padding: 5px;
  margin: 10px 0;
`;

const Nickname = styled.div`
  font-size: 25px;
  color: black;
`;

const UserId = styled.div`
  font-size: 16px;
  margin: 5px 0;
  color: ${(props) => props.theme.colors.hardGray};
`;

const Introduce = styled.div`
  font-size: 12px;
  margin-top: 15px;
  line-height: 22px;
`;

const UserInfoBtn = styled.button`
  padding: 5px;
  margin-bottom: 15px;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.ivory};
  font-family: Neo;
  font-weight: bold;
  border: none;
  background: ${(props) => props.theme.colors.green};
  &:hover {
    background: ${(props) => props.theme.colors.hardGreen};
  }
`;

const Followers = styled.span`
  padding: 10px 0;
  ${(props) => props.theme.flex.flexCenterColumn}
  section {
    margin: 5px 0;
  }

  span {
    margin-left: 5px;
    font-size: bold;
    cursor: pointer;
  }
`;

const Edit = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: 600;
    font-size: 14px;
    margin: 5px 0;
  }
  input {
    height: 30px;
    padding-left: 5px;
    font-family: Neo;
  }
  textarea {
    height: 100px;
    resize: none;
    font-family: Neo;
    padding: 5px;
  }
  div {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
    button {
      font-family: Neo;
      margin-left: 8px;
      padding: 5px;
      border-radius: 8px;
      border: none;
      background: ${(props) => props.theme.colors.green};
      font-size: bold;
      color: white;
      &:hover {
        background: ${(props) => props.theme.colors.hardGreen};
      }
    }
  }
`;
