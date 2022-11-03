import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryService } from '@web/_services/category.service';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { Cake } from '@web/components/cake/Cake';

export const Category = (): ReactElement => {
  const { id } = useParams();
  const [category, setCategory] = useState<CategoryEntity>();
  const categoryService = useMemo(() => new CategoryService(), []);
  useEffect(() => {
    categoryService.findById(Number(id)).then((category) => {
      setCategory(category);
    });
  }, [categoryService]);
  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>{category?.name}</h1>
      {category?.cakes?.map((cake, index) => (
        <Cake key={index} cake={cake} />
      ))}
    </div>
  );
};
