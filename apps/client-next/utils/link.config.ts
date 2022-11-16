import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const linkConfig = () =>
  new AdminConfigBuilder()
    .addImgControl('logo', 'Логотип')
    .addTextControl('name', 'Название')
    .addTextControl('link', 'Ссылка')
    .getResut();
