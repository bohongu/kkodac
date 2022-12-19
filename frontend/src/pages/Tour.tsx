import React from 'react';
import { useParams } from 'react-router-dom';

const Tour = () => {
  const { region } = useParams();
  return <div>{region} 페이지</div>;
};

export default Tour;
