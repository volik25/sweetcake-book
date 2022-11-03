import React, { ReactElement, useContext } from 'react';
import styles from './AdminPanel.module.scss';
import cn from 'classnames';
import logo from '@images/logo.png';
import { AuthContext } from '@web/_contexts/AuthContext';

export const AdminPanel = (): ReactElement => {
  const { isPanelOpened, closePanel, isAdmin, panelControls } =
    useContext(AuthContext);
  return (
    <>
      {isAdmin && (
        <aside
          className={cn(styles.panel, {
            [styles.opened]: isPanelOpened,
          })}
        >
          <div className={styles.panel__actions}>
            <button className={cn('btn', 'btn-outline-primary')}>Выйти</button>
            <div>
              <button
                className={cn('btn', 'btn-outline-primary')}
                onClick={() => closePanel()}
              >
                Отменить
              </button>
              <button className="btn btn-primary ms-2">Опубликовать</button>
            </div>
          </div>
          <div className={styles.panel__form}>
            {panelControls.map((control) => (
              <div className="mb-3" key={control.name}>
                <label>{control.displayName}</label>
                {control.getControl(control.value)}
              </div>
            ))}
          </div>
        </aside>
      )}
    </>
  );
};
