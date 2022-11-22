/* eslint-disable no-unused-vars */
import { UserLoginDTO } from '@interfaces/security/dtos/login.user.dto';
import { IConfigControl } from '@web/utils/admin-config.builder';
import { UserService } from '@web/_services/user.service';
import { useRouter } from 'next/router';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface IAuthContext {
  isAdmin: boolean;
  isPanelOpened: boolean;
  panelConfig: {
    controls: IConfigControl[];
    submitHandler: (value: { [key: string]: any }) => Promise<void>;
    handler?: (value: { [key: string]: any }, isCanceled?: boolean) => void;
  } | null;
  openPanel: (
    config: IConfigControl[],
    submitHandler: (value: { [key: string]: any }) => Promise<void>,
    handler?: (value: { [key: string]: any }, isCanceled?: boolean) => void
  ) => void;
  closePanel: () => void;
  login: (data: UserLoginDTO) => void;
  logout: () => void;
  togglePanel: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const authService = useMemo(() => new UserService(), []);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isPanelOpened, setIsPanelOpened] = useState<boolean>(false);
  const [panelConfig, setConfig] = useState<{
    controls: IConfigControl[];
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
      router.replace(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAdmin(false);
      router.replace(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const openPanel = (
    config: IConfigControl[],
    submitHandler: (value: { [key: string]: string }) => Promise<void>,
    handler?: (value: { [key: string]: string }, isCanceled?: boolean) => void
  ) => {
    setConfig({ controls: config, handler, submitHandler });
    setIsPanelOpened(true);
  };

  const togglePanel = () => {
    setIsPanelOpened(!isPanelOpened);
  };

  const closePanel = () => {
    setConfig(null);
    setIsPanelOpened(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isPanelOpened,
        panelConfig,
        login,
        logout,
        openPanel,
        closePanel,
        togglePanel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
