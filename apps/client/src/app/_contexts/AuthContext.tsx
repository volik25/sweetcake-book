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
