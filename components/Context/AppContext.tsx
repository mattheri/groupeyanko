import { AxiosResponse } from "axios";
import useLocalStorage from "components/Hooks/useLocalStorage";
import { useState, createContext, PropsWithChildren, useEffect } from "react";
import ApiService from "services/ApiService";
import { BasicUserInformation, UserInformation } from "services/domain/User";

const EMPTY_USER_INFORMATIONS:Omit<AppState, "wooId" | "id" | "connected"> = {
  address: '',
  city: '',
  company: '',
  email: '',
  firstname: '',
  lastname: '',
  phoneNumber: '',
  postalCode: '',
  province: '',
}

export const AppContext = createContext({ 
  id:'',
  connected: false,
  login: (u:UserInformation) => {},
  logout: () => {},
  userInformations: EMPTY_USER_INFORMATIONS,
  updateUserInformation: (informations:BasicUserInformation) => {}
});

interface AppState extends UserInformation {
  connected:boolean;
  id:string | null;
}

const EMPTY_USER:AppState = {
  address: '',
  city: '',
  company: '',
  connected: false,
  email: '',
  firstname: '',
  id: null,
  lastname: '',
  phoneNumber: '',
  postalCode: '',
  province: '',
  wooId: 0,
}

export function AppContextProvider<T>(props: PropsWithChildren<T>) {
  const { setItem, getItem, removeItem } = useLocalStorage();

  const userId:string = getItem('user');

  const [appState, setAppState] = useState<AppState>({
    connected: false,
    id: null,
    ...EMPTY_USER,
  });

  const userInformations = async (id:string) => {
    const response:AxiosResponse<UserInformation> = await ApiService.post({
      url: '/api/user',
      data: {
        id
      }
    });

    return response.data;
  }

  const connected = appState.connected;
  const id = appState.id;
  const currentUserInformations:Omit<UserInformation, "wooId" | "id"> = {
    address: appState.address,
    city: appState.city,
    company: appState.company,
    email: appState.email,
    firstname: appState.firstname,
    lastname: appState.lastname,
    phoneNumber: appState.phoneNumber,
    postalCode: appState.postalCode,
    province: appState.province,
  }

  const logout = () => {
    removeItem('user');
    setAppState({
      ...EMPTY_USER
    });
  }

  const login = (userInformation:UserInformation) => {
    setItem('user', userInformation.id);
    setAppState({
      connected: true,
      ...userInformation
    })
  }

  const updateUserInformation = (information:BasicUserInformation) => {
    setAppState((state) => ({ ...state, ...information }));
  }

  useEffect(() => {
    if (!!userId && !appState.connected) {
      (async () => {
        const user = await userInformations(userId);
        login(user)
      })();
    }
  }, [userId, appState.connected]);

  return (
    <AppContext.Provider value={{ id, connected, login, logout, userInformations: currentUserInformations, updateUserInformation }}>
      {props.children}
    </AppContext.Provider>
  );
}
