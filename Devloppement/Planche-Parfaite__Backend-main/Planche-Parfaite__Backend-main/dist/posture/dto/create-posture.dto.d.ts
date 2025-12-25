export declare class CreatePostureDto {
    name: string;
    description?: string;
    min_angle: number;
    max_angle: number;
    difficulty: 'Facile' | 'Moyen' | 'Difficile';
}
