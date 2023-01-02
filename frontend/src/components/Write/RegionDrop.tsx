import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedRegionState } from '../../recoil/atoms';

const REGION_LIST = [
  { id: 0, data: '한경면' },
  { id: 1, data: '한립읍' },
  { id: 2, data: '애월읍' },
  { id: 3, data: '제주시' },
  { id: 4, data: '조천읍' },
  { id: 5, data: '구좌읍' },
  { id: 6, data: '성산읍' },
  { id: 7, data: '표선면' },
  { id: 8, data: '남원읍' },
  { id: 9, data: '서귀포' },
  { id: 10, data: '중문' },
  { id: 11, data: '안덕면' },
  { id: 12, data: '대정면' },
  { id: 13, data: '우도면' },
];

const RegionDrop = () => {
  const [region, setRegion] = useRecoilState(selectedRegionState);
  const regionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.currentTarget.value);
  };
  return (
    <DropWrapper>
      <h1>
        지역 <span>하나만 선택해 주세요</span>
      </h1>
      <Tags>
        {REGION_LIST.map((item) => (
          <Label key={item.id} check={region === item.data ? true : false}>
            {item.data}
            <Radio
              value={item.data}
              name="region"
              onChange={regionChangeHandler}
              required
            />
          </Label>
        ))}
      </Tags>
    </DropWrapper>
  );
};

export default RegionDrop;

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

const Radio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const Tags = styled.div`
  display: grid;
  height: 320px;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const Label = styled.label<{ check: boolean }>`
  border: 1px solid black;
  ${(props) => props.theme.flex.flexCenter}
  background: ${(props) => (props.check ? 'tomato' : 'white')};
  cursor: pointer;
`;
