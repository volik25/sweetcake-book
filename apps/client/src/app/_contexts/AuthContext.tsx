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
  panelConfig: {
    controls: ConfigControl[];
    submitHandler: (value: { [key: string]: string }) => Promise<void>;
    handler?: (value: { [key: string]: string }, isCanceled?: boolean) => void;
  } | null;
  openPanel: (
    config: ConfigControl[],
    submitHandler: (value: { [key: string]: string }) => Promise<void>,
    handler?: (value: { [key: string]: string }, isCanceled?: boolean) => void,
    values?: { [key: string]: string }
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
  const [panelConfig, setConfig] = useState<{
    controls: ConfigControl[];
    submitHandler: (value: { [key: string]: string }) => Promise<void>;
    handler?: (value: { [key: string]: string }, isCanceled?: boolean) => void;
  } | null>(null);

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
    submitHandler: (value: { [key: string]: string }) => Promise<void>,
    handler?: (value: { [key: string]: string }, isCanceled?: boolean) => void,
    values?: { [key: string]: string }
  ) => {
    if (values) {
      config.forEach((field) => {
        field.value = values[field.name];
      });
    }

    setConfig({ controls: config, handler, submitHandler });
  };

  const closePanel = () => {
    setConfig(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        panelConfig,
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
