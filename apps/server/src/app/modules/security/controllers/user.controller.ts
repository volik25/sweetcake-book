import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserService } from '@api/modules/security/services/user.service';
import { JwtGuard } from '@api/guards/jwt.guard';
import { UserLoginDTO } from '@interfaces/security/dtos/login.user.dto';
import { CreateUserDTO } from '@interfaces/security/dtos/create.user.dto';
import { ApplicationRequest } from '@api/core/request';
import { UserEntity } from '@interfaces/security/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { logger } from '@interfaces/logger/logger';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: ApplicationRequest
  ) {}

  @Get('check')
  async check(@Req() req) {
    return await this.userService.check(req);
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.CREATED)
  async logout(@Req() req: ApplicationRequest) {
    return await this.userService.logout(req);
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id) {
    return await this.userService.findOne(id);
  }

  @Get()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async find() {
    return await this.userService.find();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  // @Put(':id')
  // @UseGuards(JwtGuard)
  // async update(@Param('id', ParseIntPipe) id, @Body() user: UpdateUserDTO) {
  //   return await this.userService.update(id, user);
  // }

  @Post('login')
  async login(
    @Body() login: UserLoginDTO,
    @Req() req,
    @Res() res
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const service = await this.userService.login(login);
      req.user = service.user;
      req.token = service.token;

      req.session.user = await UserEntity.findOne({
        where: service.user.id,
        relations: ['tokens'],
      });
      req.session.token = service.token;
      return res.send(service);
    } catch (error) {
      logger.error(error);
      console.log(error);

      return null;
    }
  }

  @Post('check-email')
  async checkEmail(@Body() email: { email: string }) {
    return await this.userService.checkEmail(email);
  }

  // @Post('reset')
  // async reset(@Req() request, @Body('email') email: UserResetDto) {
  //   return await this.userService.reset(request, email);
  // }

  // @Post('change')
  // async resetPassword(@Body() resetData: UserResetPasswordDto) {
  //   return await this.userService.resetPassword(
  //     resetData.token,
  //     resetData.password
  //   );
  // }
}
