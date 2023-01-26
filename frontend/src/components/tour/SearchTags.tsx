import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchTagState } from '../../recoil/atoms';
import {
  PLACE_TAG_LIST,
  WHO_TAG_LIST,
  TYPE_TAG_LIST,
  SEASON_TAG_LIST,
} from './../../utils/jeju';

const SearchTags = (props: any) => {
  const [tags, setTags] = useRecoilState(searchTagState);
  const [whoTag, setWhoTag] = useState('');
  const [placeTag, setPlaceTag] = useState('');
  const [typeTag, setTypeTag] = useState('');
  const [seasonTag, setSeasonTag] = useState('');

  const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    switch (name) {
      case 'who':
        setWhoTag(value);
        return;
      case 'place':
        setPlaceTag(value);
        return;
      case 'type':
        setTypeTag(value);
        return;
      case 'season':
        setSeasonTag(value);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const submit = () => {
    setTags(`${whoTag}${placeTag}${typeTag}${seasonTag}`);
    console.log(tags);
  };

  return (
    <>
      <TagCategory>
        <h1>싱커가친</h1>
        <TagWrapper>
          {WHO_TAG_LIST.map((list) => (
            <div key={list.id}>
              <Label check={whoTag === list.data ? true : false}>
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
              <Label check={placeTag === list.data ? true : false}>
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
              <Label check={typeTag === list.data ? true : false}>
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
              <Label check={seasonTag === list.data ? true : false}>
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
        <div onClick={submit}>검색하기</div>
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

const Label = styled.label<{ check: boolean }>`
  background: ${(props) => (props.check ? 'tomato' : 'white')};
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5px;
  border: 1px solid black;

  input {
    display: none;
  }
`;

const TagBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 100%;
    height: 100%;
    display: flex;
    ${(props) => props.theme.flex.flexCenter}
    font-size: 12px;
    cursor: pointer;
  }
`;
