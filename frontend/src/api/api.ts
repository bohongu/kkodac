import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

interface ISignUp {
  userName: string;
  password: string;
  nickname: string;
}

export const signUpAtom = async (data: ISignUp) => {
  await axios.post(`${BASE_URL}/kkodac`, data);
};

export const test = async () => {
  const { data } = await axios.get(
    `https://lgluum6zo5.execute-api.ap-northeast-2.amazonaws.com/dev/kkodac/posts?count=1&index=1`,
  );
  return data.result;
};

//
