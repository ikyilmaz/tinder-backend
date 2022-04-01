import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

// Role Göre Kısıtlama
@Injectable()
export class RestrictToGuard implements CanActivate {
  constructor(private readonly $reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    // GraphQL'e uygun context'i aldım
    const ctx = GqlExecutionContext.create(context);

    // Context içerisinden request nesnesini aldım
    const req = ctx.getContext<{ req: Request }>().req;

    // İzin verilen rolleri aldım
    const roles = this.$reflector.get<string[]>('roles', context.getHandler());

    // Kullanıcının rolünü aldım
    const userRole = req.user.role;

    // İzin verilen roller kullanıcının rolünü içeriyor mu?
    return roles.includes(userRole);
  }
}
