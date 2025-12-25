import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    create(createSessionDto: CreateSessionDto): Promise<import("./session.entity").Session>;
    findAll(): Promise<import("./session.entity").Session[]>;
    findOne(id: number): Promise<import("./session.entity").Session>;
    update(id: number, updateSessionDto: UpdateSessionDto): Promise<import("./session.entity").Session>;
    remove(id: number): Promise<void>;
}
