import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('postures')
export class Posture {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID unique de la posture' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Nom de la posture' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Description de la posture', required: false })
  description?: string;

  @Column('decimal')
  @ApiProperty({ description: 'Angle minimal de la posture' })
  min_angle: number;

  @Column('decimal')
  @ApiProperty({ description: 'Angle maximal de la posture' })
  max_angle: number;

  @Column({ type: 'enum', enum: ['Facile', 'Moyen', 'Difficile'], default: 'Moyen' })
  @ApiProperty({ description: 'Niveau de difficulté', enum: ['Facile', 'Moyen', 'Difficile'] })
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}
