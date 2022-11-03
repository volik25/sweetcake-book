import React, { ReactElement, useContext } from 'react';
import styles from './AdminPanel.module.scss';
import cn from 'classnames';
import logo from '@images/logo.png';

export const AdminPanel = (): ReactElement => {
  return (
    <aside>
      <div className={styles.panel}>
        <div className={styles.panel__actions}>
          <button className={cn('btn', 'btn-outline-primary')}>Выйти</button>
          <div>
            <button className={cn('btn', 'btn-outline-primary')}>Отменить</button>
            <button className={cn('btn', 'btn-primary')}>Опубликовать</button>
          </div>
        </div>
        <div className={styles.panel__form}>
            <label>Name</label>
            <input type="text" className="from-control" />
        </div>
      </div>
    </aside>
  );
};
