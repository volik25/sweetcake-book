import { AdminConfigBuilder } from "apps/client-next/utils/admin-config.builder";



export const categoryConfig = () => new AdminConfigBuilder()
  .addImgControl('img', 'Картинка категории')
  .addTextControl('name', 'Название категории')
  .getResut();
