import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  placeTagState,
  seasonTagState,
  typeTagState,
  whoTagState,
} from '../../recoil/atoms';
import { TAG_LIST } from '../../utils/jeju';

const TagDrop = () => {
  /* Recoil */
  const [whoTag, setWhoTag] = useRecoilState(whoTagState);
  const [placeTag, setPlaceTag] = useRecoilState(placeTagState);
  const [typeTag, setTypeTag] = useRecoilState(typeTagState);
  const [seasonTag, setSeasonTag] = useRecoilState(seasonTagState);
  /* Handlers */
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

  return (
    <DropWrapper>
      <h1>태그</h1>
      <Tags>
        {TAG_LIST.map((item) => (
          <Label
            check={
              whoTag === item.data
                ? true
                : false || placeTag === item.data
                ? true
                : false || typeTag === item.data
                ? true
                : false || seasonTag === item.data
                ? true
                : false
            }
            key={item.id}
          >
            {item.data}
            <input
              type="radio"
              name={item.name}
              value={item.data}
              onChange={tagChangeHandler}
            />
          </Label>
        ))}
      </Tags>
    </DropWrapper>
  );
};

export default TagDrop;

const DropWrapper = styled.div`
  height: 100%;
  h1 {
    font-size: 14px;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    span {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const Label = styled.label<{ check: boolean }>`
  border: 1px solid black;
  ${(props) => props.theme.flex.flexCenter}
  background: ${(props) => (props.check ? 'tomato' : 'white')};
  cursor: pointer;
`;

const Tags = styled.div`
  display: grid;
  height: 320px;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;

  input {
    display: none;
  }
`;
