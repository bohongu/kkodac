import { atom } from 'recoil';
import { v1 } from 'uuid';

/* Auth */
export const newAcountState = atom<boolean>({
  key: `newAccount/${v1()}`,
  default: false,
});

export const loggedInState = atom<boolean>({
  key: `loggedIn/${v1()}`,
  default: true,
});

export const currentUser = atom({
  key: `currentUser/${v1()}`,
  default: {},
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
