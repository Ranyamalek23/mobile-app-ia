import { PartialType } from '@nestjs/mapped-types';
import { CreatePostureDto } from './create-posture.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostureDto extends PartialType(CreatePostureDto) {
  @ApiPropertyOptional({ description: 'Nom de la posture' })
  name?: string;

  @ApiPropertyOptional({ description: 'Description de la posture' })
  description?: string;

  @ApiPropertyOptional({ description: 'Angle minimal' })
  min_angle?: number;

  @ApiPropertyOptional({ description: 'Angle maximal' })
  max_angle?: number;

  @ApiPropertyOptional({
    description: 'Niveau de difficulté',
    enum: ['Facile', 'Moyen', 'Difficile'],
  })
  difficulty?: 'Facile' | 'Moyen' | 'Difficile';
}
