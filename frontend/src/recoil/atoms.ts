import { atom } from 'recoil';
import { v1 } from 'uuid';

interface IUser {
  createdAt: string;
  googleAccount: string;
  introduce: string;
  kakaoAccount: string;
  nickname: string;
  password: string;
  refreshToken: string;
  updatedAt: string;
  userId: string;
  username: string;
  _id: string;
  fileId: { fileUrl: string; fileId: string };
}

interface ITag {
  id: number;
  data: string;
}

export const initialUser = {
  createdAt: '',
  googleAccount: '',
  introduce: '',
  kakaoAccount: '',
  nickname: '',
  password: '',
  refreshToken: '',
  updatedAt: '',
  userId: '',
  username: '',
  _id: '',
  fileId: { fileUrl: '', fileId: '' },
};

/* Auth */
export const newAcountState = atom<boolean>({
  key: `newAccount/${v1()}`,
  default: false,
});

export const loggedInState = atom({
  key: `loggedIn/${v1()}`,
  default: false,
});

export const currentUser = atom<IUser>({
  key: `currentUser/${v1()}`,
  default: initialUser,
});

export const accessToken = atom({
  key: `accessToken${v1()}`,
  default: '',
});

export const subscriberModalState = atom<{ showModal: boolean; exit: boolean }>(
  {
    key: `subscriberModal/${v1()}`,
    default: { showModal: false, exit: false },
  },
);

export const likeModalState = atom<{ showModal: boolean; exit: boolean }>({
  key: `likeModal/${v1()}`,
  default: { showModal: true, exit: false },
});

export const selectedRegionState = atom<string>({
  key: `selectedRegion/${v1()}`,
  default: '',
});

export const selectedTagState = atom<ITag[]>({
  key: `selectedTagState/${v1()}`,
  default: [],
});
