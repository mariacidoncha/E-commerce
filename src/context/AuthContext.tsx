import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import { User } from '../utils/interfaces/user';
import { getUsers } from '../utils';

interface IAuthContextProps {
  children?: ReactNode;
}

interface AuthContextType {
  user: User | null;
  setUser: any;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: IAuthContextProps) {
  const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
  const [user, setUser] = useState<User | null>(userLocalStorage);
  // const userLocalStorage = JSON.parse(localStorage.getItem('user')!);
  // const [user, setUser] = useState<User | null>(userLocalStorage);
  // const [allUsers, setAllUsers] = useState([] as User[]);
  // const userFound = allUsers.find((user) => {
  //   return user.id === userLocalStorage;
  // });
  // const userContext = userFound ? setUser(userFound) : setUser(null);
  // console.log('🚀 ~ AuthContextProvider ~ userContext:', userContext);
  // console.log('🚀 ~ AuthContextProvider ~ user:', user);

  // useEffect(() => {
  //   async function setUsersAPI() {
  //     const response = await getUsers();
  //     setAllUsers(response);
  //   }

  //   setUsersAPI();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children ? props.children : <Outlet />}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a DataContextProvider');
  }

  return context;
}
