import React, { ReactElement, useContext, useEffect } from 'react';
import styles from './AdminPanel.module.scss';
import cn from 'classnames';
import logo from '@images/logo.png';
import { AuthContext } from '@web/_contexts/AuthContext';
import { useForm } from 'react-hook-form';

export const AdminPanel = (): ReactElement => {
  const { isPanelOpened, closePanel, isAdmin, panelConfig } =
    useContext(AuthContext);
  const { register, watch, reset } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const values = panelConfig?.controls?.reduce((prev, cur) => {
      prev[cur.name] = cur.value;
      return prev;
    }, {} as { [x: string]: string });
    reset(values);
    const subscription = watch((value) => {
      panelConfig?.handler && panelConfig.handler(value);
    });
    return () => subscription.unsubscribe();
  }, [panelConfig]);

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
            {panelConfig?.controls.map((control) => (
              <div className="mb-3" key={control.name}>
                <label>{control.displayName}</label>
                {control.getControl(register)}
              </div>
            ))}
          </div>
        </aside>
      )}
    </>
  );
};
