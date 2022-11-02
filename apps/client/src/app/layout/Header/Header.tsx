import React, { ReactElement, useContext } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';

export const Header = ({ className }: HeaderProps): ReactElement => {
  return <header className={cn(className, styles.header)}>Header</header>;
};
