/* eslint-disable no-unused-vars */
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserLoginDTO } from '@interfaces/security/dtos/login.user.dto';
import { UserService } from '@web/_services/user.service';
import { ConfigControl } from '@web/utils/admin-config.builder';

export interface IAuthContext {
  isAdmin: boolean;
  isPanelOpened: boolean;
  panelControls: ConfigControl[];
  openPanel: (
    config: ConfigControl[],
    values: { [key: string]: string }
  ) => void;
  closePanel: () => void;
  login: (data: UserLoginDTO) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const authService = useMemo(() => new UserService(), []);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [panelControls, setControls] = useState<ConfigControl[]>([]);
  const [isPanelOpened, setIsPanelOpened] = useState<boolean>(false);

  useEffect(() => {
    // const tokens = getTokens();
    // if (tokens) {
    //   authService.getAuthorInfo().then((author) => {
    //     setAuthor(author);
    //     setIsAuthReady(true);
    //     if (location.pathname === '/login') {
    //       navigate(`/profile/${author.login}`, { replace: true });
    //     }
    //   });
    //   return;
    // }
    // setIsAuthReady(true);
    // navigate('/login', { replace: true });
  }, [authService]);

  const login = async (data: UserLoginDTO) => {
    // try {
    //   await authService.logIn(data);
    //   navigate(`/`, { replace: true });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const logout = () => {
    // saveTokens(null);
    // setAuthor(null);
    // navigate('/login');
  };

  const openPanel = (
    config: ConfigControl[],
    values: { [key: string]: string }
  ) => {
    config.forEach((field) => {
      field.value = values[field.name];
    });
    setIsPanelOpened(true);
    setControls(config);
  };

  const closePanel = () => {
    setIsPanelOpened(false);
    setControls([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isPanelOpened,
        panelControls,
        login,
        logout,
        openPanel,
        closePanel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
