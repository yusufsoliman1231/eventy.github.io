import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserType {
  id?: string | any;
  name?: string | any;
  email?: string;
  access_token?: string;
  refresh_token?: string;
  userToken?: string;
  status?: string;
  event_uuid?: string;
  subdomain_name?: string;
  seenNotifications?: null;
  messageNotifications?: string[];
  messageBadge?: boolean;
  bottomNotifications?: null;
}

interface AuthContextType {
  user: UserType;
  signin: (value: UserType) => void;
  signout: () => void;
  setUser: (value: UserType) => void;
  notificaions: (value: UserType) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  access_token: '',
  status: '',
  userToken: '',
  event_uuid: '',
  subdomain_name: '',
  seenNotifications: null,
  messageNotifications: [],
  messageBadge: false,
  bottomNotifications: null,
};

const AuthContext = React.createContext<AuthContextType | null>(null);
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = React.useState(initialState);

  React.useEffect(() => {
    // try {
    //   AsyncStorage.getItem('token').then(token => {
    //     if (token) {
    //       // Get id and name from AsyncStorage here
    //       AsyncStorage.getItem('userId').then(id => {
    //         AsyncStorage.getItem('userName').then(name => {
    //           setUser((prev: any) => {
    //             return {
    //               ...prev,
    //               access_token: token,
    //               id: id,
    //               name: name,
    //             };
    //           });
    //         });
    //       });
    //     }
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const subDomain = await AsyncStorage.getItem('subdomain');
      const eventUuid = await AsyncStorage.getItem('uuid');
      if (token && subDomain && eventUuid) {
        const id = await AsyncStorage.getItem('userId');
        const name = await AsyncStorage.getItem('userName');
        setUser((prev: any) => {
          return {
            ...prev,
            access_token: token,
            id: id,
            name: name,
            subdomain_name: subDomain && subDomain,
            event_uuid: eventUuid && eventUuid,
          };
        });
      }
    };
    fetchUserData();
  }, [initialState.access_token]);

  const signin = (newUser: UserType) => {
    //@ts-ignore
    setUser(newUser);
  };

  const signout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userName');
    setUser(initialState);
  };

  const notificaions = (newUser: UserType) => {
    //@ts-ignore
    setUser(prev => ({...prev, ...newUser}));
  };

  return (
    //@ts-ignore
    <AuthContext.Provider value={{user, signin, signout, notificaions}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext) as AuthContextType;
  return auth;
};
