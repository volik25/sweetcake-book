import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { TogglePanel } from '@shared/toggle-panel/TogglePanel';
import { AuthContext } from '@web/_contexts/AuthContext';
import { CategoryService } from '@web/_services/category.service';
import { categoryConfig } from '@web/utils/category.config';
import { Header } from '@web/layout/Header/Header';
import { Separator } from '@shared/separator/Separator';
import { PillBtn } from '@shared/pill-btn/PillBtn';
import Link from 'next/link';
import { GetStaticProps } from 'next';

const questions = [
  {
    question: 'За сколько дней нужно сделать заказ?',
    answer:
      'Заказ можно сделать минимум за 2−3 дня, но чем раньше вы определитесь, тем лучше ☺️',
  },
  {
    question: 'Как сделать заказ?',
    answer: `1.Зайдите в нужный раздел и оформите заказ по кнопке, которая находится под каждой позицией
      2.Напишите нам в Инстаграмм @bakeryzerno
      3.Позвоните нам по телефону 48-01-48
      4.Подойдите в нашу кондитерскую и сделайте заказ на месте`,
  },
];

export default function Home({
  categories: initCategories,
}: {
  categories: CategoryEntity[];
}) {
  const categoryService = useMemo(() => new CategoryService(), []);
  const [categories, setCategories] = useState<any[]>(initCategories);
  const { openPanel, panelConfig, isAdmin } = useContext(AuthContext);

  const onCategorySave = async (category: CategoryEntity) => {
    await categoryService.update(category.id, { name: category.name });
  };

  const onCategoryCreate = async (category: CategoryEntity) => {
    return await categoryService.create({ name: category.name });
  };

  const onCreateCategoryClick = () => {
    const category = { id: categories.at(-1).id + 1, name: '', img: '' };
    categories.push(category);
    setCategories([...categories]);
    openPanel(
      categoryConfig(),
      async (value) => {
        category.name = value.name;
        const { id } = await onCategoryCreate(category as any);
        category.id = id;
      },
      (value, isCanceled) => {
        if (isCanceled) {
          setCategories([...categories.filter((c) => c.id !== category.id)]);
          return;
        }
        category.img = value.img?.imgSrc;
        category.name = value.name;
        setCategories([...categories]);
      }
    );
  };
  return (
    <div className="page-container py-5">
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className={styles.main__header}>
        <Header className={styles.header} />
      </div>
      <Separator img="/assets/images/heart.svg"></Separator>
      <div className={styles.main__body}>
        <p>Наш ассортимент 👇🏻</p>
        {categories.map((c, index) => (
          <Link href={`/category/${c.id}`} key={c.id}>
            <PillBtn
              key={c.id}
              img={c.img || 'https://taplink.st/p/c/6/0/5/35279297.jpg?0'}
              className={styles.category}
            >
              {c.name}

              {!panelConfig && isAdmin && (
                <>
                  <button
                    className="btn btn-link"
                    onClick={(event) => {
                      event.preventDefault();
                      openPanel(
                        categoryConfig(),
                        async (value) => {
                          c.name = value.name;
                          await onCategorySave(c);
                        },
                        (value) => {
                          c.img = value.img?.imgSrc;
                          c.name = value.name;
                          setCategories([...categories]);
                        },
                        { name: c.name }
                      );
                    }}
                  >
                    Изменить
                  </button>
                  {index == categories.length - 1 && (
                    <button
                      className="btn btn-link"
                      onClick={(event) => {
                        event.preventDefault();
                        onCreateCategoryClick();
                      }}
                    >
                      Добавить
                    </button>
                  )}
                </>
              )}
            </PillBtn>
          </Link>
        ))}
        <Separator img="/assets/images/heart.svg" hasFading></Separator>
        <a href="https://instagram.com/sweetcake.book?igshid=YmMyMTA2M2Y=">
          <PillBtn smImg={true} img="/assets/images/instagram.svg">
            Instagram
            {/* <button
            className="btn btn-link"
            onClick={(event) => {
              event.preventDefault();
              openPanel(linkConfig('Инстаграм'), {
                link: 'https://instagram.com/sweetcake.book?igshid=YmMyMTA2M2Y=',
              });
            }}
          >
            Изменить
          </button> */}
          </PillBtn>
        </a>
      </div>
      <div className={styles.main__footer}>
        {questions.map((q) => (
          <TogglePanel
            // onEdit={() => openPanel(questionConfig(), q)}
            title={q.question}
            key={q.question}
          >
            {q.answer}
          </TogglePanel>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await new CategoryService(true).find();

  return {
    props: {
      categories,
    },
  };
};
