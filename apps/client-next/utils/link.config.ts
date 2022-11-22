import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const linkConfig = (value?: LinkDto) =>
  new AdminConfigBuilder()
    .addImgControl('img', 'Логотип', value && { imgSrc: value.img })
    .addTextControl('name', 'Название', value?.name)
    .addTextControl('link', 'Ссылка', value?.link)
    .getResut();
