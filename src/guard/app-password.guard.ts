import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class AppPasswordGuard implements CanActivate {
	constructor(private readonly config: ConfigService) {}
  
	canActivate(context: ExecutionContext): boolean {
	  const req = context.switchToHttp().getRequest();
  
	  // Allow static HTML pages through — only guard /api/* routes
	  if (!req.path.startsWith('/api')) return true;
  
	  const provided = req.headers['x-app-password'];
	  const expected = this.config.get<string>('APP_PASSWORD');
  
	  if (!provided || provided !== expected) {
		throw new UnauthorizedException(
		  'Missing or wrong password. Send x-app-password header.',
		);
	  }
	  return true;
	}
  }