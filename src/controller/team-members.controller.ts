import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppPasswordGuard } from '../guard/app-password.guard';

@UseGuards(AppPasswordGuard)
@Controller('api/team-members')
export class TeamMembersController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  findAll() {
    const raw = this.config.get<string>('TEAM_MEMBERS') ?? '';
    const members = raw.split(',').map((m) => m.trim()).filter(Boolean);
    return { members };
  }
}