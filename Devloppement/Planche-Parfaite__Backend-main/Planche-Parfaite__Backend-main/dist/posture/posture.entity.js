"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posture = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Posture = class Posture {
};
exports.Posture = Posture;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'ID unique de la posture' }),
    __metadata("design:type", Number)
], Posture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)({ description: 'Nom de la posture' }),
    __metadata("design:type", String)
], Posture.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Description de la posture', required: false }),
    __metadata("design:type", String)
], Posture.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    (0, swagger_1.ApiProperty)({ description: 'Angle minimal de la posture' }),
    __metadata("design:type", Number)
], Posture.prototype, "min_angle", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    (0, swagger_1.ApiProperty)({ description: 'Angle maximal de la posture' }),
    __metadata("design:type", Number)
], Posture.prototype, "max_angle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Facile', 'Moyen', 'Difficile'], default: 'Moyen' }),
    (0, swagger_1.ApiProperty)({ description: 'Niveau de difficulté', enum: ['Facile', 'Moyen', 'Difficile'] }),
    __metadata("design:type", String)
], Posture.prototype, "difficulty", void 0);
exports.Posture = Posture = __decorate([
    (0, typeorm_1.Entity)('postures')
], Posture);
//# sourceMappingURL=posture.entity.js.map