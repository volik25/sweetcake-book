import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeepPartial } from 'typeorm';
import jwt = require('jsonwebtoken');
import { ApplicationRequest } from '@api/core/request';
import { CreateUserDTO } from '@interfaces/security/dtos/create.user.dto';
import { UserCryptoService } from '@api/core/user.crypto.service';
import { logger } from '@interfaces/logger/logger';
import { UserLoginDTO } from '@interfaces/security/dtos/login.user.dto';
import { UserEntity } from '@interfaces/security/entities/user.entity';
import { AccessTokenEntity } from '@interfaces/security/entities/access.token.entity';
import { baseException } from '@api/core/base-exception';
import { ResetTokenEntity } from '@interfaces/security/entities/reset.token.entity';
import path = require('path');
import { environment } from 'apps/server/src/environments/environment';

@Injectable()
export class UserService {
  private key = environment.jwtKey;

  constructor(@Inject(REQUEST) private readonly request: ApplicationRequest) {}

  async create(user: CreateUserDTO) {
    user.password = UserCryptoService.encrypt(user.password);

    try {
      return await UserEntity.create({ ...user }).save();
    } catch (err) {
      baseException('[UserService]: create: ', err);
    }
  }

  async update(id: number, user: DeepPartial<UserEntity>) {
    let editableUser: UserEntity;

    try {
      editableUser = await UserEntity.findOneBy({ id });
    } catch (err) {
      baseException('[UserService]: update: ', err);
    }

    if (editableUser.password) {
      editableUser.password = UserCryptoService.encrypt(user.password);
    }

    try {
      return await UserEntity.update(id, editableUser);
    } catch (err) {
      baseException('[UserService]: update: ', err);
    }
  }

  async find() {
    try {
      return await UserEntity.find();
    } catch (err) {
      baseException('[UserService]: find: ', err);
    }
  }

  async findOne(id: number) {
    try {
      return await UserEntity.findOneBy({ id });
    } catch (err) {
      baseException('[UserService]: findOne: ', err);
    }
  }

  async login(login: UserLoginDTO) {
    const hash = UserCryptoService.encrypt(login.password);

    logger.info('User request login (login): ' + login.email + ', ' + hash);

    let foundUser;
    try {
      foundUser = await UserEntity.findOne({
        where: { email: login.email },
      });
    } catch (err) {
      baseException('[UserService]: login: ', err);
    }

    if (!foundUser) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    let user;
    try {
      user = await UserEntity.findOne({
        where: { email: login.email, password: hash },
      });
    } catch (err) {
      baseException('[UserService]: login: ', err);
    }

    if (!user) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    const tokenData = {
      exp: expiration,
      username: user.name,
      email: user.email,
      id: user.id,
    };

    const result = {
      email: user.email,
      expires: expiration,
      token: jwt.sign(tokenData, this.key),
    };

    const t: any = {};

    t.token = result.token;
    t.expires = tokenData.exp;
    t.user = user;
    logger.info(t.token);
    await AccessTokenEntity.create(t).save();

    return { user, token: result.token };
  }

  async logout(req: ApplicationRequest) {
    try {
      await AccessTokenEntity.delete({
        user: { id: +req.session.user.id },
        token: req.session.token,
      }).catch(console.error);

      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
      });
      return '';
    } catch (e) {
      logger.error('Error' + e);
      throw new BadRequestException();
    }
  }

  async check(req) {
    const accessToken = req.headers.authorization;
    if (req.session && req.session.token === accessToken && req.session.user) {
      logger.verbose('User ' + req.session.user.name + ' has session');

      try {
        jwt.verify(accessToken, this.key);

        logger.verbose(
          'Authorized by session (login.check): ' + req.session.user.name
        );

        return await Promise.resolve(req.session.user);
      } catch (err) {
        throw new ForbiddenException({ message: 'Token expired' });
      }
    } else {
      logger.verbose('User has no session');

      try {
        jwt.verify(accessToken, this.key);
      } catch (err) {
        const token = await AccessTokenEntity.findOne({
          where: { token: accessToken },
        });
        if (token) await AccessTokenEntity.delete({ id: token.id });
        throw new ForbiddenException({ message: 'Token expired' });
      }

      const token = await AccessTokenEntity.findOne({
        where: { token: accessToken },
        relations: ['user'],
      });

      if (token && token.user) {
        const user = await UserEntity.findOneBy({ id: token.user.id });

        req.user = user;

        req.session.user = user;
        req.session.token = token.token;

        logger.verbose('Authorized by token');

        return user;
      } else {
        throw new ForbiddenException({ message: 'Token not found' });
      }
    }
  }

  public async reset(request, email) {
    logger.info('Password reset requested with email: ' + email);

    let foundUser: UserEntity;
    try {
      foundUser = await UserEntity.findOne({ where: { email } });
    } catch (err) {
      logger.error(err);
      throw new BadRequestException(err.message);
    }

    if (!foundUser) {
      throw new NotFoundException(
        'Пользователь с указанным Вами email не найден'
      );
    }

    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 3;

    const tokenData = {
      exp: expiration,
      username: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
    };

    const token = jwt.sign(tokenData, this.key);

    const t: any = {
      token,
      expires: tokenData.exp,
      created: new Date(),
      user: foundUser,
    };

    await ResetTokenEntity.save(t);

    const resetUrl =
      request.protocol +
      '://' +
      path.join(request.get('host'), 'reset-password', '?token=' + token);

    return;
  }

  public async resetPassword(token, password) {
    try {
      jwt.verify(token, 'ZaOblako_KIT');
    } catch (err) {
      throw new ForbiddenException({ message: 'Token expired' });
    }

    const resetToken = await ResetTokenEntity.findOne({
      where: { token },
      relations: ['user'],
    });

    if (resetToken && resetToken.user) {
      const user: UserEntity = resetToken.user;

      user.password = password;

      await this.update(user.id, user);

      logger.verbose(
        `Successfully reset the password for user with ID: ${user.id}`
      );

      return user;
    } else {
      throw new ForbiddenException({ message: 'Token not found' });
    }
  }

  async checkEmail(email) {
    let user;
    try {
      user = await UserEntity.findOneBy({ email });
    } catch (err) {
      baseException('[UserService]: checkEmail: ', err);
    }
    if (user) {
      throw new ConflictException('Пользователь с таким e-mail уже существует');
    }
    return true;
  }
}
