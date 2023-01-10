import { atom } from 'recoil';
import { v1 } from 'uuid';

export const newAcountState = atom({
  key: `newAccount/${v1()}`,
  default: false,
});

export const loggedInState = atom({
  key: `loggedIn/${v1()}`,
  default: true,
});

export const subscriberModalState = atom({
  key: `subscriberModal/${v1()}`,
  default: { showModal: false, exit: false },
});

export const selectedTagsState = atom<string[]>({
  key: `selectedTags/${v1()}`,
  default: [],
});

export const selectedRegionState = atom({
  key: `selectedRegion/${v1()}`,
  default: '',
});
