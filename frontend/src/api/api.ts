import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

interface ISignUp {
  userName: string;
  password: string;
  nickname: string;
}

export const signUpAtom = async (data: ISignUp) => {
  await axios.post(`${BASE_URL}/kkodac`, data);
};

export const test = async () => {
  const { data } = await axios.get(`${BASE_URL}/kkodac/posts?count=1&index=1`);
  return data.result;
};

export const getWeather = async (lat: number, lon: number) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
  );
  return data;
};
