import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authenticationHeader = request.headers.authorization;
    if (!authenticationHeader) throw new UnauthorizedException();

    const token = authenticationHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
