import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedRegionState } from '../../recoil/atoms';
import { REGION_LIST } from '../../utils/jeju';

const RegionDrop = () => {
  const [region, setRegion] = useRecoilState(selectedRegionState);
  const regionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.currentTarget.value);
  };
  return (
    <DropWrapper>
      <h1>
        지역 <span>하나만 선택해 주세요 (필수)</span>
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
