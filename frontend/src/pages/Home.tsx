import React from 'react';
import { useQuery } from 'react-query';
import { fetchTest } from './../api/api';

const Home = () => {
  const { isLoading, data, isError, error } = useQuery('test', fetchTest);
  return (
    <>
      <div>{data}</div>
    </>
  );
};

export default Home;
