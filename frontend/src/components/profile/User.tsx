import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms';

const UserSection = () => {
  const setModal = useSetRecoilState(modalState);
  return (
    <UserWrapper>
      <UserImageSection>
        <UserImage />
        <UserImageBtn>O</UserImageBtn>
      </UserImageSection>
      <UserId>엄지혜</UserId>
      <Nickname>테스트닉네임</Nickname>
      <Introduce>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        autem aperiam quis fuga omnis quas cumque officia eveniet ratione minima
        necessitatibus illo fugiat sint ad eum esse debitis, ab illum?
      </Introduce>
      <UserInfoBtn>프로필 변경</UserInfoBtn>
      <Followers
        onClick={() => {
          setModal({ showModal: true, exit: false });
        }}
      >
        구독 : 4
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
  border: 1px solid black;
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

const Followers = styled.div``;
