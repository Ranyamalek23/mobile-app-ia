import { Session } from 'src/session/session.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    telephone: string;
    password: string;
    birthday: string;
    country: string;
    gender: string;
    weight: number;
    height: number;
    fitness_level: string;
    sessions: Session[];
    hashPassword(): Promise<void>;
}
