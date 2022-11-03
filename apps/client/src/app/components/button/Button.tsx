import { ReactElement } from 'react';
import { ButtonProps } from '@shared/button/Button.props';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.scss';

export const Button = ({
  label,
  navTo,
  hostStyles,
  ...props
}: ButtonProps): ReactElement => {
  const button = (
    <button className={styles.button_container__button} {...props}>
      {label}
    </button>
  );

  return (
    <div className={styles.button_container} style={hostStyles}>
      {navTo ? (
        <NavLink to={navTo} className={styles.button_container__link}>
          {button}
        </NavLink>
      ) : (
        button
      )}
    </div>
  );
};
