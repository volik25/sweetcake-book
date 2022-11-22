import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { AdminConfigBuilder } from '@web/utils/admin-config.builder';

export const headerConfig = (value?: HeaderDto) =>
  new AdminConfigBuilder()
    .addImgControl('logo', 'Логотип', value && { imgSrc: value.logo })
    .addTextControl('title', 'Название компании', value?.title)
    .addTextControl('product', 'Заголовок', value?.product)
    .addTextAreaControl('description', 'Описание', value?.description)
    .addTextControl('delivary', 'Доставка', value?.delivary)
    .getResut();
