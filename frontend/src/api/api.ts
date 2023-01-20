import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

interface ISignUp {
  username: string;
  password: string;
  nickname: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface IPost {
  title: string;
  description: string;
  tagString: string;
  files: string[];
  tags: string[];
  authorId: string;
  regionId: string;
}

/* 날씨 API */

export const getWeather = async (lat: number, lon: number) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
  );
  return data;
};

/* 인증 API */

export const signUpAtom = async (data: ISignUp) => {
  return await axios.post(`${BASE_URL}/kkodac/user/join`, data);
};

export const loginAtom = async (data: ILogin) => {
  return await axios.post(`${BASE_URL}/kkodac/user/auth/login`, data);
};

/* 파일 API */

export const postFile = async (data: FormData) => {
  return await axios.post(`${BASE_URL}/kkodac/file`, data);
};

export const deleteFile = async (id: string) => {
  return await axios.delete(`${BASE_URL}/kkodac/file/${id}`);
};

/* 게시물 API */

export const createPost = async (data: IPost) => {
  return await axios.post(`${BASE_URL}/kkodac/post`, data);
};

export const getPostRegion = async (region: string) => {
  const { data } = await axios.get(`${BASE_URL}/kkodac/posts?region=${region}`);
  return data.result;
};

export const getPostDetail = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/kkodac/post/${id}`);
  return data.result;
};
