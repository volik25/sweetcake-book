import { ReactElement, useState } from 'react';
import { TogglePanelProps } from './TogglePanel.props';
import styles from './TogglePanel.module.scss';
import cn from 'classnames';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';

export const TogglePanel = ({
  className,
  title,
  children,
  showEdit,
  onEdit,
  onRemove,
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
        <span className='me-2'>{title}</span>
        {showEdit && (
          <button
            className="btn btn-link py-0 px-1 text-dark"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onEdit && onEdit();
            }}
          >
            <PencilFill />
          </button>
        )}
        {showEdit && (
          <button
            className="btn btn-link py-0 px-1 text-dark"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onRemove && onRemove();
            }}
          >
            <Trash3Fill />
          </button>
        )}
      </div>
      <div
        style={{ whiteSpace: 'pre' }}
        className={styles['toggle-panel__content']}
      >
        {children}
      </div>
    </div>
  );
};
