import { Module } from '@nestjs/common';
import { TeamMembersController } from '../Controller/team-members.controller';

@Module({
  controllers: [TeamMembersController],
})
export class TeamMembersModule {}