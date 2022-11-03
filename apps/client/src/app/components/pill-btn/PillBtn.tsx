import { ReactElement } from 'react';
import styles from './PillBtn.module.scss';
import cn from 'classnames';
import { PillBtnProps } from './PillBtn.props';

export const PillBtn = ({
  className,
  img,
  smImg,
  children,
}: PillBtnProps): ReactElement => {
  return (
    <div className={cn(className, styles['pill-btn'])}>
      {img && <img className={cn({[styles.sm]: smImg})} src={img} />}
      <span className={styles['pill-btn__text']}>{children}</span>
    </div>
  );
};
