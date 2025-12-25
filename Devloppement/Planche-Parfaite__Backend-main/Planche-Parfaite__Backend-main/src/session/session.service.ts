import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { UpdateSessionDto} from './dto/update-session.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { User } from '../users/users.entity';
import { Posture } from '../posture/posture.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Posture)
    private readonly postureRepository: Repository<Posture>,
  ) {}

  // Créer une nouvelle session
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const user = await this.userRepository.findOneBy({ id: createSessionDto.user_id });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${createSessionDto.user_id} non trouvé`);
    }

    const posture = await this.postureRepository.findOneBy({ id: createSessionDto.posture_id });
    if (!posture) {
      throw new NotFoundException(`Posture avec l'ID ${createSessionDto.posture_id} non trouvée`);
    }

    const session = this.sessionRepository.create({
      ...createSessionDto,
      user,
      posture,
    });
    return this.sessionRepository.save(session);
  }

  // Récupérer toutes les sessions
  async findAll(): Promise<Session[]> {
    return this.sessionRepository.find({ relations: ['user', 'posture'] });
  }

  // Récupérer une session par ID
  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['user', 'posture'],
    });
    if (!session) {
      throw new NotFoundException(`Session avec l'ID ${id} non trouvée`);
    }
    return session;
  }

  // Mettre à jour une session par ID
  async update(id: number, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const session = await this.findOne(id); // Vérifie si la session existe

    if (updateSessionDto.user_id) {
      const user = await this.userRepository.findOneBy({ id: updateSessionDto.user_id });
      if (!user) {
        throw new NotFoundException(`Utilisateur avec l'ID ${updateSessionDto.user_id} non trouvé`);
      }
      session.user = user;
    }

    if (updateSessionDto.posture_id) {
      const posture = await this.postureRepository.findOneBy({ id: updateSessionDto.posture_id });
      if (!posture) {
        throw new NotFoundException(`Posture avec l'ID ${updateSessionDto.posture_id} non trouvée`);
      }
      session.posture = posture;
    }

    Object.assign(session, updateSessionDto);
    return this.sessionRepository.save(session);
  }

  // Supprimer une session par ID
  async remove(id: number): Promise<void> {
    const session = await this.findOne(id); // Vérifie si la session existe
    await this.sessionRepository.remove(session);
  }
}
