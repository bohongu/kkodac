import React from 'react';
import styled from 'styled-components';

const SubscriptionScreen = () => {
  return (
    <SubscriptionWrapper>
      <Subscribers>
        <Subscriber>
          <div></div>
          <h1>닉네임</h1>
        </Subscriber>
      </Subscribers>
      <Posts>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </Posts>
    </SubscriptionWrapper>
  );
};

export default SubscriptionScreen;

const SubscriptionWrapper = styled.div`
  height: 100vh;
  padding-top: 80px;
  margin: 0 auto;
  width: 70%;
`;

const Subscribers = styled.div`
  display: flex;
  overflow: scroll;
  border: 1px solid black;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Subscriber = styled.div`
  height: 100px;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  div {
    border: 1px solid black;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  h1 {
    margin-top: 5px;
    font-size: 12px;
  }
`;

const Posts = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Post = styled.div`
  border: 1px solid black;
  height: 300px;
`;
