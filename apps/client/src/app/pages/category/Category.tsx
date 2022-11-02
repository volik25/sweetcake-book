import { ReactElement, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './Category.module.scss';
import { environment } from '../../../environments/environment';

export const Category = (): ReactElement => {
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(environment.baseUrl + '/category' + `/${id}`)
      .then((res) => res.text())
      .then((res) => {
        console.log(res ? JSON.parse(res) : '');
      })
      .catch((res) => {
        console.log(res);
      });
  });
  return (
    <div>
      Категория
      <NavLink to="/order-form">Заказать</NavLink>
    </div>
  );
};
