import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const questionConfig = new AdminConfigBuilder()
  // .addImgControl('logo', 'Логотип')
  .addTextControl('question', 'Вопрос')
  .addTextAreaControl('answer', 'Ответ')
  .getResut();
