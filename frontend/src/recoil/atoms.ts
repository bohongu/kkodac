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
