import { Module } from '@nestjs/common';
import { TeamMembersController } from '../controller/team-members.controller';

@Module({
  controllers: [TeamMembersController],
})
export class TeamMembersModule {}