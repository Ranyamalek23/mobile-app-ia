import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nom complet de l’utilisateur' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Adresse email de l’utilisateur', example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Numéro de téléphone de l’utilisateur', example: '0612345678' })
  @IsString()
  telephone: string;

  @ApiProperty({ description: 'Mot de passe de l’utilisateur' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Date de naissance (format: YYYY-MM-DD)', example: '1995-01-01' })
  @IsString()
  birthday: string;

  @ApiProperty({ description: 'Pays de résidence', example: 'France' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'Genre de l’utilisateur', example: 'Homme' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Poids de l’utilisateur en kg', example: 75 })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'Taille de l’utilisateur en cm', example: 180 })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Niveau de fitness', example: 'Débutant' })
  @IsOptional()
  @IsString()
  fitness_level?: string;
}
