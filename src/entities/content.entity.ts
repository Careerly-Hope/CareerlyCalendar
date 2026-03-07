import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
  } from 'typeorm';
  
  export type ContentStatus = 'idea' | 'draft' | 'ready' | 'posted';
  export type ContentType = 'reel' | 'carousel' | 'other';
  
  @Entity('content_ideas')
  export class ContentIdea {
	@PrimaryGeneratedColumn()
	id: number;
  
	@Column({ name: 'content_number', type: 'int', nullable: true })
	contentNumber: number;
  
	@Column({ type: 'text' })
	title: string;
  
	@Column({ type: 'text' })
	description: string;
  
	@Column({
	  name: 'content_type',
	  type: 'enum',
	  enum: ['reel', 'carousel', 'other'],
	})
	contentType: ContentType;
  
	@Column({ type: 'text', nullable: true })
	week: string;
  
	@Column({ name: 'scheduled_date', type: 'text', nullable: true })
	scheduledDate: string;
  
	@Column({ name: 'handled_by', type: 'text', nullable: true })
	handledBy: string;
  
	@Column({
	  type: 'enum',
	  enum: ['idea', 'draft', 'ready', 'posted'],
	  default: 'idea',
	})
	status: ContentStatus;
  
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
  
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
  }