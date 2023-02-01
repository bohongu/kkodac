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
import { likePosts, postFile } from '../../api/api';
import { editingProfile, getFollows } from './../../api/api';
import { IFollow, ILikePost } from './../../utils/interface';

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

  const { data: follow } = useQuery<IFollow>('getFollowsUser', () =>
    getFollows(cUser.userId),
  );
  const { data: likePostDatas } = useQuery<ILikePost[]>('likePosts', () =>
    likePosts(cUser.userId),
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
        <>
          <UserId>{cUser.nickname}</UserId>
          <Nickname>{cUser.username}</Nickname>
          <Introduce>
            {cUser.introduce ? cUser.introduce : '자기소개가 없습니다.'}
          </Introduce>
        </>
      ) : (
        <Edit>
          <label htmlFor="nickname">Nickname</label>
          <input
            id="nickname"
            value={nickname}
            onChange={nicknameChangeHandler}
          />
          <label htmlFor="introduce">Bio</label>
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
        구독 :
        <span
          onClick={() => {
            setModal({ showModal: true, exit: false });
          }}
        >
          {follow?.users_followed_by_user.length}
        </span>
        내가 좋아요한 게시물 :
        <span
          onClick={() => {
            setLikeModal({ showModal: true, exit: false });
          }}
        >
          {likePostDatas?.length}
        </span>
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
  margin-left: 50px;
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
`;

const UserImageBtn = styled.div`
  border: 1px solid black;
  ${(props) => props.theme.flex.flexCenter}
  height: 30px;
  width: 30px;
  border-radius: 50%;
  bottom: 55px;
  right: 45px;
  font-size: 30px;
  background: white;
  position: absolute;
  cursor: pointer;
`;

const Drop = styled.div`
  ${(props) => props.theme.flex.flexCenterColumn}
  bottom: 5px;
  right: -30px;
  position: absolute;
  border: 1px solid black;
  border-radius: 5px;
  div {
    width: 100px;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background: tomato;
    }
  }

  input {
    display: none;
  }
`;

const UserId = styled.div`
  font-size: 25px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Nickname = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.6);
`;

const Introduce = styled.div`
  font-size: 12px;
  margin: 10px 0;
  line-height: 22px;
`;

const UserInfoBtn = styled.button``;

const Followers = styled.span`
  padding: 10px 0;
  ${(props) => props.theme.flex.flexCenter}
  border:1px solid black;
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
  }
  textarea {
    height: 100px;
    resize: none;
  }
  div {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
    button {
      margin-left: 5px;
      height: 30px;
      border-radius: 5px;
      border: none;
      background: tomato;
      font-size: bold;
      color: white;
    }
  }
`;
