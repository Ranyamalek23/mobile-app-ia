import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ description: "ID de l'utilisateur" })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'ID de la posture' })
  @IsNumber()
  posture_id: number;

  @ApiProperty({ description: 'Durée de la session en secondes', example: 300 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Statut de la session',
    enum: ['En cours', 'Terminée'],
    default: 'En cours',
  })
  @IsEnum(['En cours', 'Terminée'])
  status: 'En cours' | 'Terminée';

  @ApiProperty({
    description: 'Indique si la posture est validée',
    default: false,
  })
  @IsBoolean()
  posture_valid: boolean;

  @ApiProperty({
    description: 'Durée (en secondes) pendant laquelle la posture est correcte',
    default: 0,
  })
  @IsNumber()
  correct_duration: number;

  @ApiProperty({
    description: 'Score de la posture (0.0 à 100.0)',
    default: 0.0,
  })
  @IsNumber()
  posture_score: number;

  @ApiProperty({
    description: "Heure de début de la session (format ISO 8601 : 'YYYY-MM-DDTHH:mm:ssZ')",
    example: '2025-01-25T10:00:00Z',
  })
  
  @IsDateString()
  start_time: string;

  @ApiProperty({
    description: "Heure de fin de la session (optionnelle)",
    example: '2025-01-25T10:05:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_time?: string;
}
