import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSessionDto } from './create-session.dto';
import { IsEnum, IsNumber, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiPropertyOptional({ description: "ID de l'utilisateur" })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiPropertyOptional({ description: 'ID de la posture' })
  @IsOptional()
  @IsNumber()
  posture_id?: number;

  @ApiPropertyOptional({ description: 'Durée de la session en secondes' })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({
    description: 'Statut de la session',
    enum: ['En cours', 'Terminée'],
  })
  @IsOptional()
  @IsEnum(['En cours', 'Terminée'])
  status?: 'En cours' | 'Terminée';

  @ApiPropertyOptional({
    description: 'Indique si la posture est validée',
  })
  @IsOptional()
  @IsBoolean()
  posture_valid?: boolean;

  @ApiPropertyOptional({
    description: 'Durée correcte (en secondes)',
  })
  @IsOptional()
  @IsNumber()
  correct_duration?: number;

  @ApiPropertyOptional({
    description: 'Score de la posture (0.0 à 100.0)',
  })
  @IsOptional()
  @IsNumber()
  posture_score?: number;

  @ApiPropertyOptional({
    description: "Heure de début de la session (format ISO 8601)",
  })
  @IsOptional()
  @IsDateString()
  start_time?: string;

  @ApiPropertyOptional({
    description: "Heure de fin de la session (format ISO 8601)",
  })
  @IsOptional()
  @IsDateString()
  end_time?: string;
}
