import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const categoryConfig = new AdminConfigBuilder()
  // .addImgControl('logo', 'Логотип')
  .addTextControl('name', 'Название категории')
  .getResut();
