import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const headerConfig = () =>
  new AdminConfigBuilder()
    .addImgControl('logo', 'Логотип')
    .addTextControl('title', 'Название компании', (value, setValue) => {
      setValue('product', value);
    })
    .addTextControl('product', 'Заголовок')
    .addTextAreaControl('description', 'Описание')
    .addTextControl('delivary', 'Доставка')
    .getResut();
