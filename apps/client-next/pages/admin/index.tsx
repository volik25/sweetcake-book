import { ReactElement, useContext } from 'react';
import styles from './Login.module.scss';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'apps/client-next/_contexts/AuthContext';
import { useRouter } from 'next/router';

export default function LoginForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, logout, isAdmin } = useContext(AuthContext);

  const router = useRouter();

  if (isAdmin) {
    router.replace('/');
  }

  const onSubmit = (data: any) => {
    isAdmin ? logout() : login(data);
    return;
  };

  return (
    <div className="page-container">
      <div className={styles['login-form-container']}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles['login-form-container__login']}
        >
          <div className="form-floating">
            <input
              {...register('email', { required: true })}
              type="text"
              className="form-control"
              placeholder="name@example.com"
              id="floatingInput"
              readOnly={isAdmin}
            />
            <label htmlFor="floatingInput">Логин</label>
          </div>
          <div className={cn('form-floating', 'my-3')}>
            <input
              {...register('password', { required: true })}
              type="password"
              className="form-control"
              itemID="floatingInput"
              placeholder="Password"
              readOnly={isAdmin}
            />
            <label htmlFor="floatingInput">Пароль</label>
          </div>
          <button className="btn btn-primary" type="submit">
            {isAdmin ? 'Выйти' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
