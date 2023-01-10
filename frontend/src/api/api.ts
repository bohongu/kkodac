import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

interface ISignUp {
  userName: string;
  password: string;
  nickname: string;
}

interface IPost {
  title: string;
  description: string;
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
  await axios.post(`${BASE_URL}/kkodac`, data);
};

export const test = async () => {
  const { data } = await axios.get(`${BASE_URL}/kkodac/posts?count=1&index=1`);
  return data.result;
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
