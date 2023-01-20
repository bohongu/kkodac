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
}

/* Auth */
export const newAcountState = atom<boolean>({
  key: `newAccount/${v1()}`,
  default: false,
});

export const loggedInState = atom<boolean>({
  key: `loggedIn/${v1()}`,
  default: false,
});

export const currentUser = atom<IUser>({
  key: `currentUser/${v1()}`,
  default: {
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
  },
});

export const subscriberModalState = atom<{ showModal: boolean; exit: boolean }>(
  {
    key: `subscriberModal/${v1()}`,
    default: { showModal: false, exit: false },
  },
);

export const selectedTagsState = atom<string[]>({
  key: `selectedTags/${v1()}`,
  default: [],
});

export const selectedRegionState = atom<string>({
  key: `selectedRegion/${v1()}`,
  default: '',
});
