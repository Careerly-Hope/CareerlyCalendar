import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { ContentStatus, ContentType } from 'src/entities/content.entity';
 
export class CreateContentDto {
  @IsOptional()
  @IsInt()
  contentNumber?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(['reel', 'carousel', 'other'])
  contentType: ContentType;

  @IsOptional()
  @IsString()
  week?: string;

  @IsOptional()
  @IsString()
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  handledBy?: string;

  @IsOptional()
  @IsEnum(['idea', 'draft', 'ready', 'posted'])
  status?: ContentStatus;
}

export class UpdateContentDto {
  @IsOptional()
  @IsInt()
  contentNumber?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['reel', 'carousel', 'other'])
  contentType?: ContentType;

  @IsOptional()
  @IsString()
  week?: string;

  @IsOptional()
  @IsString()
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  handledBy?: string;

  @IsOptional()
  @IsEnum(['idea', 'draft', 'ready', 'posted'])
  status?: ContentStatus;
}