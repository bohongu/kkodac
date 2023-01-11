import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectedTagsState } from '../../recoil/atoms';
import { TAG_LIST } from '../../utils/jeju';

const TagDrop = () => {
  /* Recoil */
  const [selectTags, setSelectTags] =
    useRecoilState<string[]>(selectedTagsState);

  /* Handlers */
  const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;

    if (checked) {
      if (selectTags.length > 4) {
        alert('태그는 최대 5개까지 가능합니다.');
        return;
      }
      setSelectTags([...selectTags, value]);
    } else if (!checked) {
      setSelectTags(selectTags.filter((item) => item !== value));
    }
  };

  return (
    <DropWrapper>
      <h1>
        태그 <span>중복 선택 가능합니다 (5개)</span>
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
