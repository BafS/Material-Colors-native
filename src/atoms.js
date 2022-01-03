import {atom} from 'recoil';

export const settingsState = atom({
  key: 'settingsState',
  default: {
    colorTheme: 'material',
  },
});
