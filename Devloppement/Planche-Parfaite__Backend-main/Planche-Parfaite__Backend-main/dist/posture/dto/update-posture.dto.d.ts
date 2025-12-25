import { CreatePostureDto } from './create-posture.dto';
declare const UpdatePostureDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePostureDto>>;
export declare class UpdatePostureDto extends UpdatePostureDto_base {
    name?: string;
    description?: string;
    min_angle?: number;
    max_angle?: number;
    difficulty?: 'Facile' | 'Moyen' | 'Difficile';
}
export {};
