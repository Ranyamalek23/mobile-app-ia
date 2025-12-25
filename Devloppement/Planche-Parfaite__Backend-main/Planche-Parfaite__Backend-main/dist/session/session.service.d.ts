import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { User } from '../users/users.entity';
import { Posture } from '../posture/posture.entity';
export declare class SessionService {
    private readonly sessionRepository;
    private readonly userRepository;
    private readonly postureRepository;
    constructor(sessionRepository: Repository<Session>, userRepository: Repository<User>, postureRepository: Repository<Posture>);
    create(createSessionDto: CreateSessionDto): Promise<Session>;
    findAll(): Promise<Session[]>;
    findOne(id: number): Promise<Session>;
    update(id: number, updateSessionDto: UpdateSessionDto): Promise<Session>;
    remove(id: number): Promise<void>;
}
