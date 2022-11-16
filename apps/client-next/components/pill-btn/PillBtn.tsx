import { ReactElement } from 'react';
import styles from './PillBtn.module.scss';
import cn from 'classnames';
import { PillBtnProps } from './PillBtn.props';
import Image from 'next/image';
import { PencilFill } from 'react-bootstrap-icons';

export const PillBtn = ({
  className,
  img,
  smImg,
  children,
  showEdit,
  disabled,
  onEdit,
  onClick,
}: PillBtnProps): ReactElement => {
  return (
    <div
      className={cn(styles['pill-btn'], className, {
        [styles['pill-btn_disabled']]: disabled,
      })}
      onClick={(event) => !disabled && onClick && onClick(event)}
    >
      {img && (
        <Image
          className={cn({ [styles.sm]: smImg })}
          width={48}
          height={48}
          src={img}
          alt=""
        />
      )}
      <span className={styles['pill-btn__text']}>{children}</span>
      {showEdit && onEdit && (
        <span
          className={styles['pill-btn__edit']}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onEdit();
          }}
        >
          <PencilFill />
        </span>
      )}
    </div>
  );
};
