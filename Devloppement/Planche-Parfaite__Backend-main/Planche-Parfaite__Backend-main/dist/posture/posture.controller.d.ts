import { PostureService } from './posture.service';
import { CreatePostureDto } from './dto/create-posture.dto';
import { UpdatePostureDto } from './dto/update-posture.dto';
export declare class PostureController {
    private readonly postureService;
    constructor(postureService: PostureService);
    create(createPostureDto: CreatePostureDto): Promise<import("./posture.entity").Posture>;
    findAll(): Promise<import("./posture.entity").Posture[]>;
    findOne(id: number): Promise<import("./posture.entity").Posture>;
    update(id: number, updatePostureDto: UpdatePostureDto): Promise<import("./posture.entity").Posture>;
    remove(id: number): Promise<void>;
}
