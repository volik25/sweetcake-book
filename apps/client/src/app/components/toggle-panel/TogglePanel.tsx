import { ReactElement, useState } from 'react';
import { TogglePanelProps } from './TogglePanel.props';
import styles from './TogglePanel.module.scss';
import cn from 'classnames';

export const TogglePanel = ({
  className,
  title,
  children,
}: TogglePanelProps): ReactElement => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div
      className={cn(className, styles['toggle-panel'], {
        [styles.opened]: isOpened,
      })}
    >
      <div
        className={styles['toggle-panel__title']}
        onClick={() => setIsOpened(!isOpened)}
      >
        <span className={styles['toggle-panel__btn']}></span>
        <span>{title}</span>
      </div>
      <div className={styles['toggle-panel__content']}>{children}</div>
    </div>
  );
};
