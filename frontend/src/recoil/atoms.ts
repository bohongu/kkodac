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

export const postModalState = atom({
  key: `postModal/${v1()}`,
  default: false,
});
