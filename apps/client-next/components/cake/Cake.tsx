import { ReactElement, useContext } from 'react';
import { CakeProps } from '@web/components/cake/Cake.props';
import styles from './Cake.module.scss';
import { weightTransformPipe } from '@web/utils/pipes/weight-transform.pipe';
import { currencyPipe } from '@web/utils/pipes/currency.pipe';
import { PillBtn } from '../pill-btn/PillBtn';
import { AuthContext } from '@web/_contexts/AuthContext';
import Link from 'next/link';

export const Cake = ({
  cake,
  onEdit,
  onRemove,
  ...props
}: CakeProps): ReactElement => {
  const { panelConfig, isAdmin } = useContext(AuthContext);
  return (
    <div style={{ marginBottom: '30px' }}>
      <div className={styles.cake} {...props}>
        <div
          className={styles.cake__image}
          style={{ backgroundImage: `url(${cake.img})` }}
        ></div>
        <div className={styles.cake__text}>
          <div className={styles.cake__text_header}>{cake.name}</div>
          <div className={styles.cake__text_components}>
            {cake.components &&
              cake.components.map((component, index) => {
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
      <Link href={'/order-form'}>
        {onRemove && onEdit && (
          <PillBtn
            key={cake.id}
            className={styles['button-yellow']}
            showEdit={!panelConfig && isAdmin}
            onRemove={() => onRemove()}
            onEdit={() => onEdit()}
          >{`Заказать ${cake.name}`}</PillBtn>
        )}
      </Link>
    </div>
  );
};
