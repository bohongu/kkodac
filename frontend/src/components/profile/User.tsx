import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { subscriberModalState } from './../../recoil/atoms';
import { MdFace } from 'react-icons/md';

const UserSection = () => {
  const setModal = useSetRecoilState(subscriberModalState);
  const [drop, setDrop] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [preview, setPreview] = useState('');
  const setEditProfileHandler = () => {
    setEditProfile(true);
  };
  const closeEditProfileHandler = () => {
    setEditProfile(false);
  };
  const removeImageHandler = () => {
    setPreview('');
  };

  const profileImageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    setPreview(URL.createObjectURL(files[0]));
  };
  return (
    <UserWrapper>
      <UserImageSection>
        <UserImage photo={preview} />
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
          <UserId>엄지혜</UserId>
          <Nickname>테스트닉네임</Nickname>
          <Introduce>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            autem aperiam quis fuga omnis quas cumque officia eveniet ratione
            minima necessitatibus illo fugiat sint ad eum esse debitis, ab
            illum?
          </Introduce>
        </>
      ) : (
        <Edit>
          <label htmlFor="nickname">Nickname</label>
          <input id="nickname" />
          <label htmlFor="introduce">Bio</label>
          <textarea id="introduce" />
          <div>
            <button>Save</button>
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
  border: 0.3px solid rgba(0, 0, 0, 0.3);
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
