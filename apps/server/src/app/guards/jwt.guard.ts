import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization || request.query.token;

    if (!accessToken) {
      return false;
    }
    
    try {
      jwt.verify(accessToken.replace('Bearer ', ''), environment.jwtKey);
    } catch {
      return false;
    }
    return true;
  }
}
