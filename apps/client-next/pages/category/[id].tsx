import React, { ReactElement, useContext, useMemo, useState } from 'react';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { CategoryService } from '@web/_services/category.service';
import { Cake } from '@shared/cake/Cake';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { AuthContext } from '@web/_contexts/AuthContext';
import { useListWithImg } from '@web/hooks/useListWithImg';
import { cakeConfig } from '@web/utils/cake.config';
import { CakeService } from '@web/_services/cake.service';
import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';

export default function Category({
  category,
  components,
}: {
  category: CategoryEntity;
  components: CakeComponentEntity[];
}): ReactElement {
  const { panelConfig, isAdmin } = useContext(AuthContext);
  const cakeService = useMemo(() => new CakeService(), []);
  const [cakes, onCakeCreate, onCakeEdit, onCakeRemove] = useListWithImg(
    category?.cakes,
    () => cakeConfig(components),
    cakeService.create.bind(cakeService),
    cakeService.update.bind(cakeService),
    cakeService.deleteById.bind(cakeService)
  );
  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>{category?.name}</h1>
      {isAdmin && !panelConfig && (
        <button
          className="btn btn-primary w-100 mb-4"
          onClick={() => onCakeCreate({ category: { id: category?.id } })}
        >
          Добавить товар
        </button>
      )}
      {cakes?.map((cake, index) => (
        <Cake
          key={index}
          cake={cake}
          onEdit={() => onCakeEdit(cake)}
          onRemove={() => onCakeRemove(cake.id)}
        />
      ))}
    </div>
  );
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params)
    return {
      notFound: true,
    };
  const [category, components] = await Promise.all([
    new CategoryService(true).findById(Number(params.id)),
    new CakeService(true).findComponents(),
  ]);
  return {
    props: {
      category,
      components,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await new CategoryService(true).find();

  return {
    paths: categories.map((category) => '/category/' + category.id),
    fallback: true,
  };
};
