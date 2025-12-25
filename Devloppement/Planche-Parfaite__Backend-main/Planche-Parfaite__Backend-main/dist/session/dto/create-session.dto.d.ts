export declare class CreateSessionDto {
    user_id: number;
    posture_id: number;
    duration: number;
    status: 'En cours' | 'Terminée';
    posture_valid: boolean;
    correct_duration: number;
    posture_score: number;
    start_time: string;
    end_time?: string;
}
