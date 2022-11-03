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
import { UserEntity } from '@interfaces/security/entities/user.entity';

export interface IAuthContext {
  isAdmin: boolean;
  login: (data: UserLoginDTO) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const authService = useMemo(() => new UserService(), []);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
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

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
