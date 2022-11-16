import { ReactElement } from 'react';
import { SeparatorProps } from './Separator.props';
import styles from './Separator.module.scss';
import cn from 'classnames';
import Image from 'next/image';

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
      <Image width={1} height={1} src={img} alt=""/>
    </div>
  );
};
