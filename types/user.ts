import { KakeiItem } from './kakei';

export interface UserInfo {
  name: string;
  setName: (v) => void;
  items: KakeiItem[];
  setItems: (v) => void,
}
export const initUserInfoState: UserInfo = {
  name: "",
  items: [],
  setName: (v) => {},
  setItems: (v) => {},
}
