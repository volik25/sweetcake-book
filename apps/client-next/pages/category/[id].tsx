import { ReactElement, useEffect, useMemo, useState } from 'react';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { CategoryService } from '@web/_services/category.service';
import { Cake } from '@shared/cake/Cake';
import { useRouter } from 'next/router';

export default function Category(): ReactElement {
  const {
    query: { id },
  } = useRouter();
  const [category, setCategory] = useState<CategoryEntity>();
  const categoryService = useMemo(() => new CategoryService(), []);
  useEffect(() => {
    if (!id) {
      return;
    }
    categoryService.findById(Number(id)).then((category) => {
      setCategory(category);
    });
  }, [id, categoryService]);
  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>{category?.name}</h1>
      {category?.cakes?.map((cake, index) => (
        <Cake key={index} cake={cake} />
      ))}
    </div>
  );
}
