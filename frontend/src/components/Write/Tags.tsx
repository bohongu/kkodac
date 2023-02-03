import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';
import { useRecoilState } from 'recoil';
import { selectedTagState } from './../../recoil/atoms';

const Tag = () => {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useRecoilState(selectedTagState);

  const id = useRef(0);
  const submitTag = () => {
    const newTag = {
      id: id.current,
      data: tag,
    };
    setTagList([...tagList, newTag]);
    setTag('');
    id.current++;
  };

  const tagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.currentTarget.value);
  };
  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length !== 0 && event.key === 'Enter') {
      submitTag();
    }
  };
  const deleteTag = (id: number) => {
    setTagList(tagList.filter((list) => list.id !== id));
  };

  return (
    <TagSection>
      <Tags>
        {tagList.map((tag) => (
          <div key={tag.id}>
            #{tag.data}
            <TiDelete
              style={{ fontSize: '18px', marginLeft: '5px', cursor: 'pointer' }}
              onClick={() => deleteTag(tag.id)}
            />
          </div>
        ))}
      </Tags>
      <TagInput
        type="text"
        placeholder="#태그 입력"
        onChange={tagChange}
        value={tag}
        onKeyPress={keyPress}
      />
    </TagSection>
  );
};

export default Tag;

const TagSection = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  min-height: 50px;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 10px;
    padding-right: 5px;
    background-color: ${(props) => props.theme.colors.green};
    border-radius: 5px;
    color: white;
    font-size: 14px;
  }
`;

const TagInput = styled.input`
  background: #f8f9fa;
  width: auto;
  margin: 10px;
  display: inline-flex;
  outline: none;
  cursor: text;
  min-width: 8rem;
  border: none;
  line-height: 10px;
  font-family: Neo;
`;
