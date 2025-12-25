import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ description: 'ID de la session associée' })
  @IsNotEmpty()
  @IsNumber()
  session_id: number;

  @ApiProperty({ description: 'Message du feedback' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Type de feedback',
    enum: ['Conseil', 'Alerte'],
    default: 'Conseil',
  })
  @IsEnum(['Conseil', 'Alerte'])
  feedback_type: 'Conseil' | 'Alerte';

  @ApiProperty({
    description: 'Gravité du feedback',
    enum: ['Mineur', 'Majeur'],
    default: 'Mineur',
  })
  @IsEnum(['Mineur', 'Majeur'])
  severity: 'Mineur' | 'Majeur';
}
