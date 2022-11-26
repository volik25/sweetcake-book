import { Controller, Get, Param, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
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
