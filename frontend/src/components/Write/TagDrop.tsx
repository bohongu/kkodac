import React from 'react';
import styled from 'styled-components';

const TagDrop = () => {
  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
  };
  return (
    <DropWrapper>
      <Section>
        <label htmlFor="커플">
          <input
            type="checkbox"
            id="커플"
            name="tags"
            onChange={checkHandler}
            value="커플"
          />
          커플
        </label>
        <label htmlFor="싱글">
          <input
            type="checkbox"
            id="싱글"
            name="tags"
            onChange={checkHandler}
            value="싱글"
          />
          싱글
        </label>
        <label htmlFor="가족">
          <input
            type="checkbox"
            id="가족"
            name="tags"
            onChange={checkHandler}
            value="가족"
          />
          가족
        </label>
        <label htmlFor="친구">
          <input
            type="checkbox"
            id="친구"
            name="tags"
            onChange={checkHandler}
            value="친구"
          />
          친구
        </label>
        <label htmlFor="단체">
          <input
            type="checkbox"
            id="단체"
            name="tags"
            onChange={checkHandler}
            value="단체"
          />
          단체
        </label>
      </Section>
      <Section>
        <label htmlFor="카페">
          <input
            type="checkbox"
            id="카페"
            name="tags"
            onChange={checkHandler}
            value="카페"
          />
          카페
        </label>
        <label htmlFor="식당">
          <input
            type="checkbox"
            id="식당"
            name="tags"
            onChange={checkHandler}
            value="식당"
          />
          식당
        </label>
        <label htmlFor="술집">
          <input
            type="checkbox"
            id="술집"
            name="tags"
            onChange={checkHandler}
            value="술집"
          />
          술집
        </label>
        <label htmlFor="핫플">
          <input
            type="checkbox"
            id="핫플"
            name="tags"
            onChange={checkHandler}
            value="핫플"
          />
          핫플
        </label>
        <label htmlFor="관광지">
          <input
            type="checkbox"
            id="관광지"
            name="tags"
            onChange={checkHandler}
            value="관광지"
          />
          관광지
        </label>
      </Section>
      <Section>
        <label htmlFor="자연">
          <input
            type="checkbox"
            id="자연"
            name="tags"
            onChange={checkHandler}
            value="자연"
          />
          자연
        </label>
        <label htmlFor="역사">
          <input
            type="checkbox"
            id="역사"
            name="tags"
            onChange={checkHandler}
            value="역사"
          />
          역사
        </label>
        <label htmlFor="어드벤처">
          <input
            type="checkbox"
            id="어드벤처"
            name="tags"
            onChange={checkHandler}
            value="어드벤처"
          />
          어드벤처
        </label>
        <label htmlFor="이색체험">
          <input
            type="checkbox"
            id="이색체험"
            name="tags"
            onChange={checkHandler}
            value="이색체험"
          />
          이색체험
        </label>
      </Section>
      <Section>
        <label htmlFor="봄">
          <input
            type="checkbox"
            id="봄"
            name="tags"
            onChange={checkHandler}
            value="봄"
          />
          봄
        </label>
        <label htmlFor="여름">
          <input
            type="checkbox"
            id="여름"
            name="tags"
            onChange={checkHandler}
            value="여름"
          />
          여름
        </label>
        <label htmlFor="가을">
          <input
            type="checkbox"
            id="가을"
            name="tags"
            onChange={checkHandler}
            value="가을"
          />
          가을
        </label>
        <label htmlFor="겨울">
          <input
            type="checkbox"
            id="겨울"
            name="tags"
            onChange={checkHandler}
            value="겨울"
          />
          겨울
        </label>
      </Section>
    </DropWrapper>
  );
};

export default TagDrop;

const DropWrapper = styled.div`
  position: absolute;
  border: 1px solid black;
  width: 350px;
  top: 35px;
  left: -1px;
  background: white;
`;

const Section = styled.section`
  border: 1px solid black;
  display: flex;
`;
