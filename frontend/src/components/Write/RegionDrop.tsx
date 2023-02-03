import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedRegionState } from '../../recoil/atoms';
import { REGION_LIST } from '../../utils/jeju';

const RegionDrop = () => {
  /* Recoil */
  const [region, setRegion] = useRecoilState(selectedRegionState);

  /* Handlers */
  const regionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.currentTarget.value);
  };

  return (
    <DropWrapper>
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
  grid-template-columns: repeat(14, 1fr);
  gap: 10px;
  margin: 10px 0;
`;

const Label = styled.label<{ check: boolean }>`
  ${(props) => props.theme.flex.flexCenter}
  background: ${(props) =>
    props.check ? props.theme.colors.hardGreen : 'white'};
  color: ${(props) => (props.check ? 'white' : 'black')};
  border-radius: 8px;
  padding: 10px 3px;
  cursor: pointer;
  font-size: 12px;
  border: 0.5px solid ${(props) => props.theme.colors.gray};
`;
