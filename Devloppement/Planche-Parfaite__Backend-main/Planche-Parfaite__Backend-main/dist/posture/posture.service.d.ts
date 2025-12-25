import { Repository } from 'typeorm';
import { Posture } from './posture.entity';
import { CreatePostureDto } from './dto/create-posture.dto';
import { UpdatePostureDto } from './dto/update-posture.dto';
export declare class PostureService {
    private readonly postureRepository;
    constructor(postureRepository: Repository<Posture>);
    create(createPostureDto: CreatePostureDto): Promise<Posture>;
    findAll(): Promise<Posture[]>;
    findOne(id: number): Promise<Posture>;
    update(id: number, updatePostureDto: UpdatePostureDto): Promise<Posture>;
    remove(id: number): Promise<void>;
}
