import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(createFeedbackDto: CreateFeedbackDto): Promise<import("./feedback.entity").Feedback>;
    findAll(): Promise<import("./feedback.entity").Feedback[]>;
    findOne(id: number): Promise<import("./feedback.entity").Feedback>;
    update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<import("./feedback.entity").Feedback>;
    remove(id: number): Promise<void>;
}
