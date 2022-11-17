import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useContext, useMemo, useState } from 'react';
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
import { CreateQuestionDto } from '@interfaces/questions/dtos/create-question.dto';
import { QuestionsService } from '@web/_services/questions.service';
import { UpdateQuestionDto } from '@interfaces/questions/dtos/update-question.dto';
import { QuestionDto } from '@interfaces/questions/dtos/question.dto';
import { LinksService } from '@web/_services/links.service';
import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { UpdateLinkDto } from '@interfaces/links/dtos/update-link.dto';
import { CreateLinkDto } from '@interfaces/links/dtos/create-link.dto';
import { FilesService } from '@web/_services/files.service';

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
  const fileService = useMemo(() => new FilesService(), []);
  const linksService = useMemo(() => new LinksService(), []);
  const [categories, setCategories] = useState<any[]>(initCategories);
  const [questions, setQuestions] = useState<any[]>(questionsData);
  const [links, setLinks] = useState<any[]>(linksData);
  const { openPanel, panelConfig, isAdmin } = useContext(AuthContext);

  const onQuestionCreate = async (question: CreateQuestionDto) => {
    return await questionsService.create(question);
  };
  const onQuestionUpdate = async (id: number, question: UpdateQuestionDto) => {
    return await questionsService.update(id, question);
  };

  const onCreateQuestionClick = () => {
    const question = { id: questions.at(-1)?.id + 1, question: '', answer: '' };
    questions.push(question);
    setQuestions([...questions]);
    openPanel(
      questionConfig(),
      async (value) => {
        question.question = value.question;
        question.answer = value.answer;
        const { id } = await onQuestionCreate(question);
        question.id = id;
      },
      (value, isCanceled) => {
        if (isCanceled) {
          setQuestions([...questions.filter((c) => c.id !== question.id)]);
          return;
        }
        question.question = value.question;
        question.answer = value.answer;
        setQuestions([...questions]);
      }
    );
  };

  const onQuestionRemove = async (questionId: number) => {
    if (!confirm('Уверены, что хотите удалить вопрос?')) {
      return;
    }
    await questionsService.deleteById(questionId);
    setQuestions(questions.filter((c) => c.id !== questionId));
  };

  const onCategorySave = async (category: CategoryEntity) => {
    if ((category.img as any).imgFile) {
      category.img = await fileService.uploadFile(
        (category.img as any).imgFile
      );
    } else {
      category.img = (category.img as any).imgSrc;
    }
    await categoryService.update(category.id, {
      name: category.name,
      img: category.img,
    });
  };

  const onCategoryRemove = async (categoryId: number) => {
    if (!confirm('Уверены, что хотите удалить категорию?')) {
      return;
    }
    await categoryService.deleteById(categoryId);
    setCategories(categories.filter((c) => c.id !== categoryId));
  };

  const onCategoryCreate = async (category: CategoryEntity) => {
    if ((category.img as any).imgFile) {
      category.img = await fileService.uploadFile(
        (category.img as any).imgFile
      );
    } else {
      category.img = (category.img as any).imgSrc;
    }
    return await categoryService.create({
      name: category.name,
      img: category.img,
    });
  };

  const onCreateCategoryClick = () => {
    const category = { id: categories.at(-1)?.id + 1, name: '', img: '' };
    categories.push(category);
    setCategories([...categories]);
    openPanel(
      categoryConfig(),
      async (value) => {
        category.name = value.name;
        category.img = value.img;
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

  const onLinkCreate = async (link: CreateLinkDto) => {
    if ((link.img as any).imgFile) {
      link.img = await fileService.uploadFile((link.img as any).imgFile);
    } else {
      link.img = (link.img as any).imgSrc;
    }
    return await linksService.create(link);
  };
  const onLinkRemove = async (linkId: number) => {
    if (!confirm('Уверены, что хотите удалить ссылку?')) {
      return;
    }
    await linksService.deleteById(linkId);
    setLinks(links.filter((c) => c.id !== linkId));
  };
  const onLinkUpdate = async (id: number, link: UpdateLinkDto) => {
    if ((link.img as any).imgFile) {
      link.img = await fileService.uploadFile((link.img as any).imgFile);
    } else {
      link.img = (link.img as any).imgSrc;
    }
    return await linksService.update(id, {
      name: link.name,
      link: link.link,
      img: link.img,
    });
  };

  const onCreateLinkClick = () => {
    const link = { id: links.at(-1)?.id + 1, name: '', link: '', img: null };
    links.push(link);
    setLinks([...links]);
    openPanel(
      linkConfig(),
      async (value) => {
        link.name = value.name;
        link.link = value.link;
        link.img = value.img;
        const { id } = await onLinkCreate(link as any);
        link.id = id;
      },
      (value, isCanceled) => {
        if (isCanceled) {
          setLinks([...links.filter((c) => c.id !== link.id)]);
          return;
        }
        link.name = value.name;
        link.link = value.link;
        link.img = value.img?.imgSrc;
        setLinks([...links]);
      }
    );
  };

  return (
    <div className="page-container py-5">
      <Head>
        <title>Наш ассортимент</title>
      </Head>
      <div className={styles.main__header}>
        <Header headerData={headerData || {}} className={styles.header} />
      </div>
      <Separator img="/assets/images/heart.svg"></Separator>
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
              img={c.img || 'https://taplink.st/p/c/6/0/5/35279297.jpg?0'}
              showEdit={!panelConfig && isAdmin}
              onRemove={() => onCategoryRemove(c.id)}
              onEdit={() => {
                openPanel(
                  categoryConfig(),
                  async (value) => {
                    c.name = value.name;
                    c.img = value.img;
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
              {c.name}
            </PillBtn>
          </Link>
        ))}
        {isAdmin && (
          <PillBtn
            disabled={!!panelConfig}
            onClick={(event) => {
              event.preventDefault();
              onCreateCategoryClick();
            }}
          >
            <PatchPlus className="me-2" /> Добавить категорию
          </PillBtn>
        )}
        <Separator img="/assets/images/heart.svg" hasFading></Separator>
        {links.map((link) => (
          <a href={link.link} key={link.name} className={styles.category}>
            <PillBtn
              smImg={true}
              img={link.img || '/assets/images/instagram.svg'}
              showEdit={!panelConfig && isAdmin}
              onRemove={() => onLinkRemove(link.id)}
              onEdit={() => {
                openPanel(
                  linkConfig(),
                  async (value) => {
                    link.name = value.name;
                    link.link = value.link;
                    link.img = value.img?.imgSrc;
                    await onLinkUpdate(link.id, value as UpdateLinkDto);
                  },
                  (value) => {
                    link.img = value.img?.imgSrc;
                    link.name = value.name;
                    link.link = value.link;
                    setLinks([...links]);
                  },
                  link
                );
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
              onCreateLinkClick();
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
            onClick={() => onCreateQuestionClick()}
          >
            Добавить вопрос
          </button>
        )}
        {questions.map((q) => (
          <TogglePanel
            onEdit={() =>
              openPanel(
                questionConfig(),
                async (value) => {
                  q.question = value.question;
                  q.answer = value.answer;
                  await onQuestionUpdate(q.id, value as UpdateQuestionDto);
                },
                (value) => {
                  q.question = value.question;
                  q.answer = value.answer;
                  setQuestions([...questions]);
                },
                q
              )
            }
            onRemove={() => onQuestionRemove(q.id)}
            title={q.question}
            key={q.question}
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
  };
};
