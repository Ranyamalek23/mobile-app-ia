import { CreateFeedbackDto } from './create-feedback.dto';
declare const UpdateFeedbackDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFeedbackDto>>;
export declare class UpdateFeedbackDto extends UpdateFeedbackDto_base {
    session_id?: number;
    message?: string;
    feedback_type?: 'Conseil' | 'Alerte';
    severity?: 'Mineur' | 'Majeur';
}
export {};
