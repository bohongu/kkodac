import axios from 'axios';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const App = () => {
  async function testFetch() {
    const response = await axios.get(
      'https://pd674m4mc4.execute-api.ap-northeast-2.amazonaws.com/dev/test',
    );
    return response.data;
  }

  const { data, isLoading } = useQuery(['data'], testFetch);
  return (
    <Wrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{data}</div>
        </>
      )}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
