import { Session } from '../session/session.entity';
export declare class Feedback {
    id: number;
    session: Session;
    message: string;
    feedback_type: 'Conseil' | 'Alerte';
    severity: 'Mineur' | 'Majeur';
    created_at: Date;
}
