import React, { useState } from 'react';
import styled from 'styled-components';

import {
  PLACE_TAG_LIST,
  WHO_TAG_LIST,
  TYPE_TAG_LIST,
  SEASON_TAG_LIST,
} from './../../utils/jeju';

const SearchTags = () => {
  const [tags, setTags] = useState<string[]>([]);

  const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.currentTarget;

    console.log(value, checked, name);
  };

  const resetSearch = () => {
    window.location.reload();
  };

  return (
    <>
      <TagCategory>
        <h1>싱커가친</h1>
        <TagWrapper>
          {WHO_TAG_LIST.map((list) => (
            <div key={list.id}>
              <Label>
                <input
                  type="radio"
                  value={list.data}
                  name={list.name}
                  onChange={tagChangeHandler}
                />
                {list.data}
              </Label>
            </div>
          ))}
        </TagWrapper>
      </TagCategory>
      <TagCategory>
        <h1>카맛술관</h1>
        <TagWrapper>
          {PLACE_TAG_LIST.map((list) => (
            <div key={list.id}>
              <Label>
                <input
                  type="radio"
                  value={list.data}
                  name={list.name}
                  onChange={tagChangeHandler}
                />
                {list.data}
              </Label>
            </div>
          ))}
        </TagWrapper>
      </TagCategory>
      <TagCategory>
        <h1>자역어이</h1>
        <TagWrapper>
          {TYPE_TAG_LIST.map((list) => (
            <div key={list.id}>
              <Label>
                <input
                  type="radio"
                  value={list.data}
                  name={list.name}
                  onChange={tagChangeHandler}
                />
                {list.data}
              </Label>
            </div>
          ))}
        </TagWrapper>
      </TagCategory>
      <TagCategory>
        <h1>봄여가겨</h1>
        <TagWrapper>
          {SEASON_TAG_LIST.map((list) => (
            <div key={list.id}>
              <Label>
                <input
                  type="radio"
                  value={list.data}
                  name={list.name}
                  onChange={tagChangeHandler}
                />
                {list.data}
              </Label>
            </div>
          ))}
        </TagWrapper>
      </TagCategory>
      <TagBtns>
        <div onClick={resetSearch}>검색 초기화</div>
        <div>검색하기</div>
      </TagBtns>
    </>
  );
};

export default SearchTags;

const TagCategory = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 5px;

  h1 {
    font-size: 12px;
    padding: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid black;
  }
`;

const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  gap: 5px;
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5px;
`;

const TagBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 100%;
    height: 45%;
    display: flex;
    ${(props) => props.theme.flex.flexCenter}
    font-size: 12px;
    cursor: pointer;
  }
`;
