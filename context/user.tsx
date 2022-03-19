import { ReactNode, createContext, useContext, useState } from "react";
import { initUserInfoState, UserInfo } from "../types/user";
import { KakeiItem } from "../types/kakei";

const UserContext = createContext<UserInfo>(initUserInfoState);

export function useUser() {
  return useContext(UserContext);
}

interface Props {
  children: ReactNode;
}

export function UserProvider(props: Props) {
  const { children } = props;
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<KakeiItem[]>([]);
  const [jsonAutoSave, setJsonAutoSave] = useState<boolean>(false);
  function setItemsSLS(is: KakeiItem[]) {
    setItems(is);
    localStorage.setItem("items", JSON.stringify(is));
  }
  function setItemsFromLS() {
    let v: KakeiItem[] = JSON.parse(localStorage.getItem("items") ?? "[]");
    v.forEach((_, i) => (v[i].date = new Date(v[i].date)));
    setItems(v);
  }
  const value: UserInfo = {
    name,
    setName,
    items,
    setItems: jsonAutoSave ? setItemsSLS : setItems,
    jsonAutoSave,
    setJsonAutoSave,
    setItemsFromLS,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
