import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectedTagsState } from '../../recoil/atoms';

const TAG_LIST = [
  { id: 0, data: '싱글' },
  { id: 1, data: '커플' },
  { id: 2, data: '가족' },
  { id: 3, data: '친구' },
  { id: 4, data: '단체' },
  { id: 5, data: '카페' },
  { id: 6, data: '식당' },
  { id: 7, data: '술집' },
  { id: 8, data: '핫플' },
  { id: 9, data: '관광지' },
  { id: 10, data: '자연' },
  { id: 11, data: '역사' },
  { id: 12, data: '어드벤처' },
  { id: 13, data: '이색체험' },
  { id: 14, data: '봄' },
  { id: 15, data: '여름' },
  { id: 16, data: '가을' },
  { id: 17, data: '겨울' },
];

const TagDrop = () => {
  const [selectTags, setSelectTags] =
    useRecoilState<string[]>(selectedTagsState);
  const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;
    if (checked) {
      setSelectTags([...selectTags, value]);
    } else if (!checked) {
      setSelectTags(selectTags.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    console.log(selectTags);
  }, [selectTags]);

  return (
    <DropWrapper>
      <h1>
        태그 <span>중복 선택 가능합니다</span>
      </h1>
      <Tags>
        {TAG_LIST.map((item) => (
          <Label
            key={item.id}
            check={selectTags.includes(item.data) ? true : false}
          >
            {item.data}
            <input
              type="checkbox"
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
