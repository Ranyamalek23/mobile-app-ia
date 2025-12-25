import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Session } from '../session/session.entity';
export declare class FeedbackService {
    private readonly feedbackRepository;
    private readonly sessionRepository;
    constructor(feedbackRepository: Repository<Feedback>, sessionRepository: Repository<Session>);
    create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    findAll(): Promise<Feedback[]>;
    findOne(id: number): Promise<Feedback>;
    update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback>;
    remove(id: number): Promise<void>;
}
