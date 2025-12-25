import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name?: string;
    email?: string;
    telephone?: string;
    password?: string;
    birthday?: string;
    country?: string;
    gender?: string;
    weight?: number;
    height?: number;
    fitness_level?: string;
}
export {};
