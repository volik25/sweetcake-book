import { ReactElement, useEffect, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CategoryService } from '@web/_services/category.service';

export const Category = (): ReactElement => {
  const { id } = useParams();
  const categoryService = useMemo(() => new CategoryService(), []);
  useEffect(() => {
    categoryService.findById(Number(id)).then((res) => {
      console.log(res);
    });
  }, [categoryService]);
  return (
    <div>
      Категория
      <NavLink to="/order-form">Заказать</NavLink>
    </div>
  );
};
