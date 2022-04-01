import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RestrictToGuard } from '../guards/restrict-to.guard';
// import { IsOwnerGuard } from '../guards/is-owner.guard';

type AuthOptions = {
  // Sahibi mi?
  isOwner?: string;
  // Hangi Roller?
  roles?: ('admin' | 'user')[];
};

export const Auth = (options?: AuthOptions) => {
  const decorators = [];

  const guards: CanActivate[] | Function[] = [GqlAuthGuard];

  // Rol kısıtlaması var mı?
  if (options?.roles?.length > 0) {
    // Hangi roller?
    decorators.push(SetMetadata('roles', options.roles));

    // Kısıtlama Guard'ını ekle...
    guards.push(RestrictToGuard);
  }

  //   if (options?.isOwner) {
  //     decorators.push(SetMetadata('model', options.isOwner));

  //     guards.push(IsOwnerGuard);
  //   }

  // Eklenen Guardları devreye sok...
  decorators.push(UseGuards(...guards));

  // Decoratorleri uygula
  return applyDecorators(...decorators);
};
