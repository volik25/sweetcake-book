import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useContext, useMemo } from 'react';
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
import { PatchPlus } from 'react-bootstrap-icons';
import { questionConfig } from '@web/utils/questions.config';
import { linkConfig } from '@web/utils/link.config';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { StaticService } from '@web/_services/static.service';
import { QuestionsService } from '@web/_services/questions.service';
import { QuestionDto } from '@interfaces/questions/dtos/question.dto';
import { LinksService } from '@web/_services/links.service';
import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { useListWithImg } from '@web/hooks/useListWithImg';
import { useList } from '@web/hooks/useList';

export default function Home({
  categories: initCategories,
  headerData,
  questionsData,
  linksData,
}: {
  categories: CategoryEntity[];
  headerData: HeaderDto;
  questionsData: QuestionDto[];
  linksData: LinkDto[];
}) {
  const categoryService = useMemo(() => new CategoryService(), []);
  const questionsService = useMemo(() => new QuestionsService(), []);
  const linksService = useMemo(() => new LinksService(), []);
  const [categories, onCategoryCreate, onCategoryEdit, onCategoryRemove] =
    useListWithImg(
      initCategories,
      categoryConfig,
      categoryService.create.bind(categoryService),
      categoryService.update.bind(categoryService),
      categoryService.deleteById.bind(categoryService)
    );
  const [questions, onQuestionCreate, onQuestionEdit, onQuestionRemove] =
    useList(
      questionsData,
      questionConfig,
      questionsService.create.bind(questionsService),
      questionsService.update.bind(questionsService),
      questionsService.deleteById.bind(questionsService)
    );

  const [links, onLinkCreate, onLinkEdit, onLinkRemove] = useListWithImg(
    linksData,
    linkConfig,
    linksService.create.bind(linksService),
    linksService.update.bind(linksService),
    linksService.deleteById.bind(linksService)
  );
  const { panelConfig, isAdmin } = useContext(AuthContext);

  return (
    <div className="page-container py-5">
      <Head>
        <title>Наш ассортимент</title>
      </Head>
      <div className={styles.main__header}>
        <Header headerData={headerData || {}} className={styles.header} />
      </div>
      <Separator img="/static/assets/images/heart.svg"></Separator>
      <div className={styles.main__body}>
        <p>Наш ассортимент 👇🏻</p>
        {categories.map((c, index) => (
          <Link
            className={styles.category}
            href={`/category/${c.id}`}
            onClick={(event) => {
              if (panelConfig) {
                event.preventDefault();
              }
            }}
            key={c.id}
          >
            <PillBtn
              key={c.id}
              img={c.img}
              showEdit={!panelConfig && isAdmin}
              onRemove={() => onCategoryRemove(c.id)}
              onEdit={() => onCategoryEdit(c)}
            >
              {c.name}
            </PillBtn>
          </Link>
        ))}
        {isAdmin && (
          <PillBtn
            disabled={!!panelConfig}
            onClick={(event) => {
              event.preventDefault();
              onCategoryCreate();
            }}
          >
            <PatchPlus className="me-2" /> Добавить категорию
          </PillBtn>
        )}
        <Separator img="/static/assets/images/heart.svg" hasFading></Separator>
        {links.map((link) => (
          <a href={link.link} key={link.id} className={styles.category}>
            <PillBtn
              smImg={true}
              img={link.img}
              showEdit={!panelConfig && isAdmin}
              onRemove={() => onLinkRemove(link.id)}
              onEdit={() => {
                onLinkEdit(link);
              }}
            >
              {link.name}
            </PillBtn>
          </a>
        ))}
        {isAdmin && (
          <PillBtn
            disabled={!!panelConfig}
            onClick={(event) => {
              event.preventDefault();
              onLinkCreate();
            }}
          >
            <PatchPlus className="me-2" /> Добавить ссылку
          </PillBtn>
        )}
      </div>
      <div className={styles.main__footer}>
        {isAdmin && !panelConfig && (
          <button
            className="btn btn-primary mt-3"
            onClick={() => onQuestionCreate()}
          >
            Добавить вопрос
          </button>
        )}
        {questions.map((q) => (
          <TogglePanel
            onEdit={() => onQuestionEdit(q)}
            onRemove={() => onQuestionRemove(q.id)}
            title={q.question}
            key={q.id}
            showEdit={isAdmin && !panelConfig}
          >
            {q.answer}
          </TogglePanel>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [categories, headerData, questionsData, linksData] = await Promise.all([
    new CategoryService(true).find(),
    new StaticService(true).getHeader(),
    new QuestionsService(true).find(),
    new LinksService(true).find(),
  ]);

  return {
    props: {
      categories,
      headerData,
      questionsData,
      linksData,
    },
    revalidate: 5,
  };
};
