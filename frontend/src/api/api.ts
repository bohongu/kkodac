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

export const test = async (count: number) => {
  await axios.get(`${BASE_URL}/posts?count=${count}`);
};
