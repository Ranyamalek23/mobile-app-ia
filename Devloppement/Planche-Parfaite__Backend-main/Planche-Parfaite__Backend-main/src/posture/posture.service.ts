import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posture } from './posture.entity';
import { CreatePostureDto } from './dto/create-posture.dto';
import { UpdatePostureDto } from './dto/update-posture.dto';

@Injectable()
export class PostureService {
  constructor(
    @InjectRepository(Posture)
    private readonly postureRepository: Repository<Posture>,
  ) {}

  // Créer une nouvelle posture
  async create(createPostureDto: CreatePostureDto): Promise<Posture> {
    const posture = this.postureRepository.create(createPostureDto);
    return this.postureRepository.save(posture);
  }

  // Récupérer toutes les postures
  async findAll(): Promise<Posture[]> {
    return this.postureRepository.find();
  }

  // Récupérer une posture par ID
  async findOne(id: number): Promise<Posture> {
    const posture = await this.postureRepository.findOneBy({ id });
    if (!posture) {
      throw new NotFoundException(`Posture avec l'ID ${id} non trouvée`);
    }
    return posture;
  }

  // Mettre à jour une posture
  async update(id: number, updatePostureDto: UpdatePostureDto): Promise<Posture> {
    const posture = await this.findOne(id);
    Object.assign(posture, updatePostureDto);
    return this.postureRepository.save(posture);
  }

  // Supprimer une posture
  async remove(id: number): Promise<void> {
    const posture = await this.findOne(id);
    await this.postureRepository.remove(posture);
  }
}
