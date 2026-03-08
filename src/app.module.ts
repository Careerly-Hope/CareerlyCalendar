import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
 
import { join } from 'path';
import { ContentIdea } from './entities/content.entity';
import { ContentModule } from './module/content.module';
import { TeamMembersModule } from './module/team-members.module';
 

@Module({
  imports: [
    // Load .env
    ConfigModule.forRoot({ isGlobal: true }),

     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
      exclude: ['/api/(.*)'],
    }),

     TypeOrmModule.forRootAsync({
      inject: [ConfigService],
	  useFactory: (config: ConfigService) => ({
		type: 'postgres',
		url: config.get<string>('DATABASE_URL'),
		ssl: { rejectUnauthorized: false },
		entities: [ContentIdea],
		synchronize: config.get('NODE_ENV') !== 'production',
		logging: false,
 		extra: {
		  max: 1,               
		  idleTimeoutMillis: 10000,
		  connectionTimeoutMillis: 10000,
		},
	  }),

    }),


    ContentModule,
    TeamMembersModule,
  ],
})
export class AppModule {}