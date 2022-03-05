import { createContext, useContext, useState } from 'react';
import { initUserInfoState, UserInfo } from '../types/user';
import {
  KakeiItem
} from '../types/kakei';

const UserContext = createContext<UserInfo>(initUserInfoState);

export function useUser(){
  return useContext(UserContext);
}

export function UserProvider({ children }){
  const [ name, setName ] = useState<string>("");
  const [ items, setItems ] = useState<KakeiItem[]>([]);
  const value = {
	name, setName,
	items, setItems
  }
  return (
	<UserContext.Provider value={ value }>
	{ children }
	</UserContext.Provider>
  );
}
