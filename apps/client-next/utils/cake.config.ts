import { AdminConfigBuilder } from '@web/utils/admin-config.builder';
import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';

export const cakeConfig = (components: CakeComponentEntity[]) =>
  new AdminConfigBuilder()
    .addImgControl('img', 'Изображение товара')
    .addTextControl('name', 'Наименование товара')
    .addMultiSelectControl('components', 'Компоненты', components)
    .addTextControl('price', 'Стоимость товара')
    .addTextControl('weight', 'Минимальный вес товара')
    .getResut();
