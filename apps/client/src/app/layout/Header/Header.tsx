import React, { ReactElement, useContext } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import logo from '../../../assets/logo.png';

export const Header = ({ className }: HeaderProps): ReactElement => {
  return (
    <header className={cn(className, styles.header)}>
      <img className={styles.header__logo} src={logo} alt="" />
      <p>Кондитерская «Зерно»</p>
      <p>ТОРТЫ И ДЕСЕРТЫ НА ЗАКАЗ</p>
      <p>
        Вкуснейшие торты для ваших важных событий 🎂 <br />
        ‌Необычные десерты, как дополнение праздничного стола ❤️ <br />
        Яркие эмоции и воспоминания 😍
      </p>
      <b>БЕСПЛАТНАЯ ДОСТАВКА ТОРТОВ ПО ГОРОДУ! </b>
    </header>
  );
};
