import { ReactElement, useMemo, useState } from 'react';
import styles from './Login.module.scss';
import { PillBtn } from '@shared/pill-btn/PillBtn';
import cn from 'classnames';

export const LoginForm = (): ReactElement => {
  const [formData, setFormData] = useState<any>({});
  const [isLogin, setIsLogin] = useState(true);
  const setData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const onSubmit = async () => {
    if (isLogin) {
      const { login: loginValue, password } = formData;
      // login && login({ login: loginValue, password });
      return;
    }

    // signin && signin(formData);
  };

  return (
    <div className={'page-container'}>
      <div className={styles['login-form-container']}>
        <div className={styles['login-form-container__login']}>
          <div className={'form-floating'}>
            <input
              type={'email'}
              className={'form-control'}
              itemID={'floatingInput'}
              onInput={({ currentTarget }) =>
                setData('email', currentTarget.value)
              }
            />
            <label htmlFor={'floatingInput'}>Логин</label>
          </div>
          <div className={cn('form-floating', 'my-3')}>
            <input
              type={'password'}
              className={'form-control'}
              itemID={'floatingInput'}
              onInput={({ currentTarget }) =>
                setData('password', currentTarget.value)
              }
            />
            <label htmlFor={'floatingInput'}>Пароль</label>
          </div>
          <PillBtn onClick={() => (isLogin ? onSubmit() : setIsLogin(true))}>
            Войти
          </PillBtn>
        </div>
      </div>
    </div>
  );
};
