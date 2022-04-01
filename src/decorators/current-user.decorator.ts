import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

// Şu anki kullanıcı
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // GraphQL'e uygun context'i alalım
    const ctx = GqlExecutionContext.create(context);

    // Context içerisindeki request nesnesinden şu anki kullanıcıyı alalım
    return ctx.switchToHttp().getRequest<Request>().user;
  },
);
