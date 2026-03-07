import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
  } from '@nestjs/common';
  import { AppPasswordGuard } from '../guard/app-password.guard';
  import { ContentService } from '../service/content.service';
  import { CreateContentDto, UpdateContentDto } from '../dto/content.dto';
  
  @UseGuards(AppPasswordGuard)
  @Controller('api/content')
  export class ContentController {
	constructor(private readonly service: ContentService) {}
  
	// GET /api/content
	// GET /api/content?status=draft
	// GET /api/content?contentType=reel
	@Get()
	findAll(
	  @Query('status') status?: string,
	  @Query('contentType') contentType?: string,
	) {
	  return this.service.findAll(status, contentType);
	}
  
	// GET /api/content/:id
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
	  return this.service.findOne(id);
	}
  
	// POST /api/content
	@Post()
	create(@Body() dto: CreateContentDto) {
	  return this.service.create(dto);
	}
  
	// PATCH /api/content/:id
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContentDto) {
	  return this.service.update(id, dto);
	}
  
	// DELETE /api/content/:id
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
	  return this.service.remove(id);
	}
  }