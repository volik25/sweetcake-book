import { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Footer } from '../../layout/Footer/Footer';
import { Header } from '../../layout/Header/Header';
import styles from './Main.module.scss';

export const Main = (): ReactElement => {
  return (
    <div className="page-container">
      <div className={styles.main__header}>
        <Header className={styles.header} />
      </div>
      <div className={styles.main__body}>
        <NavLink to="/category/1">Категория 2</NavLink>
      </div>
      <div className={styles.main__footer}>
        <Footer className={styles.footer} />
      </div>
    </div>
  );
};
