import { CreateSessionDto } from './create-session.dto';
declare const UpdateSessionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSessionDto>>;
export declare class UpdateSessionDto extends UpdateSessionDto_base {
    user_id?: number;
    posture_id?: number;
    duration?: number;
    status?: 'En cours' | 'Terminée';
    posture_valid?: boolean;
    correct_duration?: number;
    posture_score?: number;
    start_time?: string;
    end_time?: string;
}
export {};
