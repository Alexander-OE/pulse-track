import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new HttpException(
        'Authorization header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }

    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret) as {
        id: string;
        email: string;
      };

      const { id, email } = decoded;

      request.user = { id, email };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
