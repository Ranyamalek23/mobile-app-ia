import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @ApiPropertyOptional({ description: 'ID de la session associée' })
  @IsOptional()
  @IsNumber()
  session_id?: number;

  @ApiPropertyOptional({ description: 'Message du feedback' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    description: 'Type de feedback',
    enum: ['Conseil', 'Alerte'],
  })
  @IsOptional()
  @IsEnum(['Conseil', 'Alerte'])
  feedback_type?: 'Conseil' | 'Alerte';

  @ApiPropertyOptional({
    description: 'Gravité du feedback',
    enum: ['Mineur', 'Majeur'],
  })
  @IsOptional()
  @IsEnum(['Mineur', 'Majeur'])
  severity?: 'Mineur' | 'Majeur';
}
