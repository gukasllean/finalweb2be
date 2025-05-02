import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // ✅ Allow all CORS preflight requests through
    if (request.method === 'OPTIONS') {
      return true;
    }

    return super.canActivate(context);
  }
}
