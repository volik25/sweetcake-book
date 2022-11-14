import { ReactElement, useContext } from 'react';
import { CakeProps } from '@web/components/cake/Cake.props';
import styles from './Cake.module.scss';
import * as cakeImg from '@images/cake.jpg';
import { weightTransformPipe } from '@web/utils/pipes/weight-transform.pipe';
import { currencyPipe } from '@web/utils/pipes/currency.pipe';
import { NavLink } from 'react-router-dom';
import { PillBtn } from '../pill-btn/PillBtn';
import { AuthContext } from '@web/_contexts/AuthContext';
import { UserLoginDTO } from '@interfaces/security/dtos/login.user.dto';

export const Cake = ({ cake, ...props }: CakeProps): ReactElement => {
  const { isAdmin } = useContext(AuthContext);
  return (
    <div style={{ marginBottom: '30px' }}>
      <div className={styles.cake} {...props}>
        <div
          className={styles.cake__image}
          style={{ backgroundImage: `url(${cakeImg.default})` }}
        ></div>
        <div className={styles.cake__text}>
          <div className={styles.cake__text_header}>{cake.name}</div>
          <div className={styles.cake__text_components}>
            {cake.components.map((component, index) => {
              return index
                ? `, ${component.name.toLowerCase()}`
                : component.name;
            })}
          </div>
          <div className={styles.cake__text_price}>
            {weightTransformPipe(cake.weight)} - {currencyPipe(cake.price)}
          </div>
        </div>
      </div>
      <NavLink to={'/order-form'}>
        <PillBtn
          className={styles['button-yellow']}
        >{`Заказать ${cake.name}`}</PillBtn>
      </NavLink>
    </div>
  );
};
