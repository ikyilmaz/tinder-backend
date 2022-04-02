import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';

@Module({
  providers: [MatchService, MatchResolver]
})
export class MatchModule {}
