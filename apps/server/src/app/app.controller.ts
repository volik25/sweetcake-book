import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  home() {
    return {};
  }
  @Get('/admin')
  @Render('admin')
  admin() {
    return {};
  }

  @Get('/category/:id')
  @Render('category/[id]')
  category(@Param('id') id: string) {
    return {};
  }
}
