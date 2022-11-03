import { ReactElement } from 'react';
import { SeparatorProps } from './Separator.props';
import styles from './Separator.module.scss';
import cn from 'classnames';

export const Separator = ({
  className,
  img,
  hasFading,
}: SeparatorProps): ReactElement => {
  return (
    <div
      className={cn(className, styles.separator, {
        [styles['separator_fading']]: hasFading,
      })}
    >
      <img src={img} />
    </div>
  );
};
