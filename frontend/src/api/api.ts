import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchTest = async () => {
  const response = await axios.get(`${BASE_URL}/test`);
  return response.data;
};
