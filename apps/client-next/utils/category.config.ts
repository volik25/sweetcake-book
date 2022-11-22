import { AdminConfigBuilder } from './admin-config.builder';

export const categoryConfig = (value?: { img: string; name: string }) =>
  new AdminConfigBuilder()
    .addImgControl('img', 'Картинка категории', value && { imgSrc: value.img })
    .addTextControl('name', 'Название категории', value?.name)
    .getResut();
