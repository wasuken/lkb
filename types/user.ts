import { KakeiItem } from "./kakei";

export interface ItemIndexTemplate<T, K> {
  key: string;
  children: K | Map<string, T[]>;
}

export interface ItemIndexNode
  extends ItemIndexTemplate<ItemIndexNode, ItemIndexNode> {}
export interface ItemIndexLeaf
  extends ItemIndexTemplate<KakeiItem, ItemIndexNode> {}

export interface UserInfo {
  name: string;
  setName: (v: string) => void;
  items: KakeiItem[];
  itemIndexes: ItemIndexNode[];
  setItems: (v: KakeiItem[]) => void;
  jsonAutoSave: boolean;
  setJsonAutoSave: (v: boolean) => void;
  setItemsFromLS: () => void;
}

export const initUserInfoState: UserInfo = {
  name: "",
  items: [],
  setName: (v) => v,
  setItems: (v) => v,
  itemIndexes: [],
  jsonAutoSave: false,
  setJsonAutoSave: (v) => v,
  setItemsFromLS: () => {},
};
