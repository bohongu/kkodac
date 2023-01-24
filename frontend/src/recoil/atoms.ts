import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
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

export const selectedTagsState = atom<string[]>({
  key: `selectedTags/${v1()}`,
  default: [],
});

export const selectedRegionState = atom<string>({
  key: `selectedRegion/${v1()}`,
  default: '',
});
