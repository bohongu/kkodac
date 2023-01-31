import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { currentUser, subscriberModalState } from './../../recoil/atoms';
import { MdFace } from 'react-icons/md';
import { FILE_MAX_SIZE } from '../../utils/jeju';
import { useMutation } from 'react-query';
import { postFile } from '../../api/api';
import { editingProfile } from './../../api/api';

const UserSection = () => {
  /* State */
  const [drop, setDrop] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  /* Recoil */
  const setModal = useSetRecoilState(subscriberModalState);
  const user = useRecoilValue(currentUser);

  const [profileImage, setProfileImage] = useState<{
    id: string;
    url: string;
  }>({ id: '', url: user.fileId.fileUrl });

  /* React-Query */
  const sendFile = useMutation(postFile);
  const updateProfile = useMutation(editingProfile);

  /* Handlers */
  const setEditProfileHandler = () => {
    setEditProfile(true);
  };
  const closeEditProfileHandler = () => {
    setBio('');
    setNickname('');
    setProfileImage({ id: '', url: user.fileId.fileUrl });
    setEditProfile(false);
  };
  const removeImageHandler = () => {
    setProfileImage({ ...profileImage, url: user.fileId.fileUrl });
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
        id: user.userId,
        data: { introduce: bio, fileId: profileImage.url, nickname },
      },
      {
        onSuccess: () => {
          console.log('성공');
          setNickname('');
          setBio('');
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
          <UserId>{user.nickname}</UserId>
          <Nickname>{user.username}</Nickname>
          <Introduce>
            {user.introduce ? user.introduce : '자기소개가 없습니다.'}
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
          4
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
