import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentIdea } from '../entities/content.entity';
import { ContentService } from '../service/content.service';
import { ContentController } from '../controller/content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentIdea])],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}