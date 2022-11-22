import React, { ReactElement, useContext, useEffect } from 'react';
import styles from './AdminPanel.module.scss';
import cn from 'classnames';
import { AuthContext } from '@web/_contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { ExclamationCircleFill, GearFill } from 'react-bootstrap-icons';

export const AdminPanel = (): ReactElement => {
  const {
    closePanel,
    isAdmin,
    panelConfig,
    isPanelOpened,
    togglePanel,
    logout,
  } = useContext(AuthContext);
  const {
    register,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isDirty },
    control: formControl,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    reset();
    const subscription = watch((value) => {
      panelConfig?.handler && panelConfig.handler(value);
    });
    return () => subscription.unsubscribe();
  }, [panelConfig]);

  const onSave = async () => {
    try {
      await panelConfig?.submitHandler(getValues());
      closePanel();
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    if (panelConfig?.handler) {
      const oldValue = panelConfig?.controls?.reduce((prev, cur) => {
        prev[cur.name] = cur.value;
        return prev;
      }, {} as { [x: string]: string });
      panelConfig.handler(oldValue, true);
    }

    closePanel();
  };

  return (
    <>
      {isAdmin && (
        <aside
          className={cn(styles.panel, {
            [styles.opened]: !!isPanelOpened && panelConfig,
          })}
        >
          {panelConfig && (
            <div className={styles['toggle-btn']} onClick={togglePanel}>
              <GearFill />
              {isDirty && (
                <span>
                  <ExclamationCircleFill />
                </span>
              )}
            </div>
          )}
          {isPanelOpened && (
            <div className="w-100 h-100 overflow-hidden">
              <div className={styles.panel__actions}>
                <button
                  className={cn('btn', 'btn-outline-primary')}
                  onClick={() => {
                    if (
                      isDirty &&
                      !confirm(
                        'Есть несохраненные изменения. Вы уверены, что хотите выйти?'
                      )
                    ) {
                      return;
                    }
                    onCancel();
                    logout();
                  }}
                >
                  Выйти
                </button>
                <div>
                  <button
                    className={cn('btn', 'btn-outline-primary')}
                    onClick={() => onCancel()}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => onSave()}
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
              <div className={styles.panel__form}>
                {panelConfig?.controls.map((control) => (
                  <div className="mb-3" key={control.name}>
                    <label>{control.displayName}</label>
                    {control.getControl(register, formControl, setValue)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
};
