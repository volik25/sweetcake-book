/* eslint-disable no-unused-vars */
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLoginDTO } from '@interfaces/security/dtos/login.user.dto';
import { UserService } from '@web/_services/user.service';
import { ConfigControl } from '@web/utils/admin-config.builder';
import { UserEntity } from '@interfaces/security/entities/user.entity';

export interface IAuthContext {
  isAdmin: boolean;
  panelConfig: {
    controls: ConfigControl[];
    submitHandler: (value: { [key: string]: any }) => Promise<void>;
    handler?: (value: { [key: string]: any }, isCanceled?: boolean) => void;
  } | null;
  openPanel: (
    config: ConfigControl[],
    submitHandler: (value: { [key: string]: any }) => Promise<void>,
    handler?: (value: { [key: string]: any }, isCanceled?: boolean) => void,
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [panelConfig, setConfig] = useState<{
    controls: ConfigControl[];
    submitHandler: (value: { [key: string]: any }) => Promise<void>;
    handler?: (value: { [key: string]: any }, isCanceled?: boolean) => void;
  } | null>(null);

  useEffect(() => {
    if (!authService.token) {
      return;
    }
    authService
      .check()
      .then(() => {
        setIsAdmin(true);
      })
      .catch(() => {
        authService.removeToken();
        setIsAdmin(false);
      });
  }, [authService]);

  const login = async (data: UserLoginDTO) => {
    try {
      await authService.login(data);
      setIsAdmin(true);
      navigate(`/`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      navigate(`/`, { replace: true });
    } catch (error) {
      console.log(error);
    }
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
