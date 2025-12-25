import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreatePostureDto {
  @ApiProperty({ description: 'Nom de la posture', example: 'Planche' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description de la posture', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Angle minimal (ex: 85.0)', example: 85.0 })
  @IsNumber()
  min_angle: number;

  @ApiProperty({ description: 'Angle maximal (ex: 95.0)', example: 95.0 })
  @IsNumber()
  max_angle: number;

  @ApiProperty({
    description: 'Niveau de difficulté',
    enum: ['Facile', 'Moyen', 'Difficile'],
    example: 'Moyen',
  })
  @IsEnum(['Facile', 'Moyen', 'Difficile'])
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}
