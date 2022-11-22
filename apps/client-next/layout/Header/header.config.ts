import { AdminConfigBuilder } from '@web/utils/admin-config.builder';
import React from 'react';

export const headerConfig = () =>
  new AdminConfigBuilder()
    .addImgControl('logo', 'Логотип')
    .addTextControl(
      'title',
      'Название компании',
      (value, setValue, allFields) => {
        setValue('product', value);
        const ref = allFields.find((f) => f.name === 'product')?.ref;
        if (!ref) {
          return;
        }
        ref.style.display = 'none';
      }
    )
    .addTextControl('product', 'Заголовок')
    .addTextAreaControl('description', 'Описание')
    .addTextControl('delivary', 'Доставка')
    .getResut();
