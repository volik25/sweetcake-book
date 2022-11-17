import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import cn from 'classnames';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router';
import { useContext } from 'react';
import { AdminPanel } from './AdminPanel/AdminPanel';

export const Layout = () => {
  return (
    <>
      <AdminPanel />
      <Outlet />
    </>
  );
};
