import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Session } from '../session/session.entity';
  
  @Entity('feedback')
  export class Feedback {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID unique du feedback' })
    id: number;
  
    @ManyToOne(() => Session, (session) => session.feedbacks, { onDelete: 'CASCADE' })
    @ApiProperty({ description: 'Session associée à ce feedback' })
    session: Session;
  
    @Column('text')
    @ApiProperty({ description: 'Message du feedback' })
    message: string;
  
    @Column({
      type: 'enum',
      enum: ['Conseil', 'Alerte'],
      default: 'Conseil',
    })
    @ApiProperty({
      description: 'Type de feedback',
      enum: ['Conseil', 'Alerte'],
      default: 'Conseil',
    })
    feedback_type: 'Conseil' | 'Alerte';
  
    @Column({
      type: 'enum',
      enum: ['Mineur', 'Majeur'],
      default: 'Mineur',
    })
    @ApiProperty({
      description: 'Gravité du feedback',
      enum: ['Mineur', 'Majeur'],
      default: 'Mineur',
    })
    severity: 'Mineur' | 'Majeur';
  
    @CreateDateColumn()
    @ApiProperty({ description: 'Date de création du feedback' })
    created_at: Date;
  }
  