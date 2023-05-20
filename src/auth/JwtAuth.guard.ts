import { Injectable, ExecutionContext} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // GuardからControllerへデータを渡す

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      const response = context.switchToHttp().getResponse();
      response.redirect('/auth/login');
    }
    return user;
  }
}
