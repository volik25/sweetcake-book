import { AdminConfigBuilder } from "./admin-config.builder";

export const categoryConfig = () => new AdminConfigBuilder()
  .addImgControl('img', 'Картинка категории')
  .addTextControl('name', 'Название категории')
  .getResut();
