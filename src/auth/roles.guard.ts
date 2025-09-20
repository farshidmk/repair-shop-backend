import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get allowed roles from the decorator
    const allowedRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!allowedRoles) {
      return true; // no role restriction
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // JWT strategy sets this
    if (!user || !user.role) return false; // not authenticated or no role

    return allowedRoles.includes(user.role); // check if user role is allowed
  }
}
