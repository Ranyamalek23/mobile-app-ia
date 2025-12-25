import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Session } from '../session/session.entity';
import { InjectRepository as InjectSessionRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,

    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    // Vérifier l’existence de la session
    const session = await this.sessionRepository.findOneBy({
      id: createFeedbackDto.session_id,
    });
    if (!session) {
      throw new NotFoundException(`Session ID ${createFeedbackDto.session_id} non trouvée`);
    }

    const feedback = this.feedbackRepository.create({
      ...createFeedbackDto,
      session,
    });
    return this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find({ relations: ['session'] });
  }

  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['session'],
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback ID ${id} non trouvé`);
    }
    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.findOne(id);

    // Si session_id est fourni, vérifier l’existence de la nouvelle session
    if (updateFeedbackDto.session_id) {
      const session = await this.sessionRepository.findOneBy({
        id: updateFeedbackDto.session_id,
      });
      if (!session) {
        throw new NotFoundException(`Session ID ${updateFeedbackDto.session_id} non trouvée`);
      }
      feedback.session = session;
    }

    // Mettre à jour les autres champs
    Object.assign(feedback, updateFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async remove(id: number): Promise<void> {
    const feedback = await this.findOne(id);
    await this.feedbackRepository.remove(feedback);
  }
}
