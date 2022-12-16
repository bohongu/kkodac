import axios from 'axios';

const BASE_URL = 'https://pd674m4mc4.execute-api.ap-northeast-2.amazonaws.com';

export const fetchTest = async () => {
  const response = await axios.get(`${BASE_URL}/dev/test`);
  return response.data;
};
