import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const linkConfig = (linkName: string) =>
  new AdminConfigBuilder()
    // .addImgControl('logo', 'Логотип')
    .addTextControl('link', linkName)
    .getResut();
