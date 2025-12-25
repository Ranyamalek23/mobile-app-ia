import { Posture } from '../posture/posture.entity';
import { User } from '../users/users.entity';
import { Feedback } from 'src/feedback/feedback.entity';
export declare class Session {
    id: number;
    user: User;
    posture: Posture;
    feedbacks: Feedback[];
    duration: number;
    status: 'En cours' | 'Terminée';
    posture_valid: boolean;
    correct_duration: number;
    posture_score: number;
    start_time: Date;
    end_time?: Date;
}
