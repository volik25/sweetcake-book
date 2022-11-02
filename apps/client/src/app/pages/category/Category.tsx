import { ReactElement, useEffect, useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CategoryService } from '@web/_services/category.service';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';

export const Category = (): ReactElement => {
  const { id } = useParams();
  const categoryService = useMemo(() => new CategoryService(), []);
  useEffect(() => {
    categoryService.findById<CategoryEntity>(Number(id)).then((res) => {
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
