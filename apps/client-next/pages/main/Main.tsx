import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../../layout/Header/Header';
import styles from './Main.module.scss';
import heart from '@images/heart.svg';
import inst from '@images/instagram.svg';
import { headerConfig } from '../../layout/Header/header.config';
import { categoryConfig } from './category.config';
import { linkConfig } from './link.config';
import { questionConfig } from './questions.config';
import { Separator } from '@web/components/separator/Separator';
import { PillBtn } from '@web/components/pill-btn/PillBtn';
import { TogglePanel } from '@web/components/toggle-panel/TogglePanel';
import { AuthContext } from '@web/_contexts/AuthContext';
import { CategoryService } from '@web/_services/category.service';

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

export const Main = (): ReactElement => {
  const categoryService = useMemo(() => new CategoryService(), []);
  const [categories, setCategories] = useState<any[]>([]);
  const { openPanel, panelConfig, isAdmin } = useContext(AuthContext);
  useEffect(() => {
    categoryService.find().then((res) => {
      setCategories(res);
    });
  }, [categoryService]);

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
      <div className={styles.main__header}>
        <Header className={styles.header} />
      </div>
      <Separator img={heart}></Separator>
      <div className={styles.main__body}>
        <p>Наш ассортимент 👇🏻</p>
        {categories.map((c, index) => (
          <NavLink to={`/category/${c.id}`} key={c.id}>
            <PillBtn
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
          </NavLink>
        ))}
        <Separator img={heart} hasFading></Separator>
        <a href="https://instagram.com/sweetcake.book?igshid=YmMyMTA2M2Y=">
          <PillBtn smImg={true} img={inst}>
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

        {/* <TogglePanel title="Можно ли будет оформить торт по нашему желанию?">
          Да! Мы с радостью воплотим вашу идею и сделаем торт о котором вы
          мечтали
        </TogglePanel>
        <TogglePanel title="Возможна ли доставка?">
          Да, мы можем доставить торт в удобное для Вас место! Доставка тортов
          по городу бесплатна.
        </TogglePanel>
        <TogglePanel title="Как сделать заказ?">
          1.Зайдите в нужный раздел и оформите заказ по кнопке, которая
          находится под каждой позицией <br />
          2.Напишите нам в Инстаграмм @bakeryzerno
          <br />
          3.Позвоните нам по телефону 48-01-48
          <br />
          4.Подойдите в нашу кондитерскую и сделайте заказ на месте
          <br />
        </TogglePanel>
        <TogglePanel title="Как вас найти?">
          Наш адрес — ул. Карла Маркса 80, кофейня «Зерно»
        </TogglePanel> */}
      </div>
    </div>
  );
};
