import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Controller('api/health')
export class HealthController {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly config: ConfigService,
  ) {}

  @Get()
  async check(@Headers('x-app-password') password: string) {
    // Reuse your existing password guard so the endpoint isn't public
    const appPassword = this.config.get<string>('APP_PASSWORD');
    if (appPassword && password !== appPassword) {
      throw new UnauthorizedException();
    }

    const start = Date.now();

    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'ok',
        db: 'connected',
        latency_ms: Date.now() - start,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      return {
        status: 'degraded',
        db: 'unreachable',
        error: err.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}