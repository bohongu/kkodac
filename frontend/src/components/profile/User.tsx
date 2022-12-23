import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { subscriberModalState } from './../../recoil/atoms';

const UserSection = () => {
  const setModal = useSetRecoilState(subscriberModalState);
  const [editProfile, setEditProfile] = useState(false);
  const setEditProfileHandler = () => {
    setEditProfile(true);
  };
  const closeEditProfileHandler = () => {
    setEditProfile(false);
  };
  return (
    <UserWrapper>
      <UserImageSection>
        <UserImage />
        <UserImageBtn>O</UserImageBtn>
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
        <>
          <label htmlFor="nickname">Nickname</label>
          <input id="nickname" />
          <label htmlFor="introduce">Bio</label>
          <textarea id="introduce" />
          <div>
            <button>Save</button>
            <button onClick={closeEditProfileHandler}>Cancel</button>
          </div>
        </>
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

const UserImage = styled.img`
  border: 0.5px solid red;
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;

const UserImageBtn = styled.button`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 0.5px solid black;
`;

const UserId = styled.div`
  font-size: 30px;
`;

const Nickname = styled.div`
  font-size: 20px;
`;

const Introduce = styled.div``;

const UserInfoBtn = styled.button``;

const Followers = styled.span`
  span {
    margin-left: 5px;
    cursor: pointer;
  }
`;
