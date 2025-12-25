export declare class CreateFeedbackDto {
    session_id: number;
    message: string;
    feedback_type: 'Conseil' | 'Alerte';
    severity: 'Mineur' | 'Majeur';
}
