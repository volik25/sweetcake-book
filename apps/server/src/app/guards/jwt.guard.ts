import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization && !request.query.token) {
      return false;
    }
    const accessToken = request.headers.authorization || request.query.token;
    try {
      jwt.verify(accessToken, environment.jwtKey);
    } catch {
      return false;
    }
    return true;
  }
}
