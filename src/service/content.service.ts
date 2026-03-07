import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentIdea } from '../entities/content.entity';
import { CreateContentDto, UpdateContentDto } from '../dto/content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentIdea)
    private readonly repo: Repository<ContentIdea>,
  ) {}

  findAll(status?: string, contentType?: string): Promise<ContentIdea[]> {
    const where: any = {};
    if (status) where.status = status;
    if (contentType) where.contentType = contentType;

    return this.repo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContentIdea> {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Content #${id} not found`);
    return item;
  }

  async create(dto: CreateContentDto): Promise<ContentIdea> {
    const item = this.repo.create({
      ...dto,
      status: dto.status ?? 'idea',
    });
    return this.repo.save(item);
  }

  async update(id: number, dto: UpdateContentDto): Promise<ContentIdea> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<{ message: string }> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: `Content #${id} deleted` };
  }
}