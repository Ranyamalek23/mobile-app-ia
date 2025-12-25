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
exports.CreateSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSessionDto {
}
exports.CreateSessionDto = CreateSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID de l'utilisateur" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessionDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la posture' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessionDto.prototype, "posture_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Durée de la session en secondes', example: 300 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessionDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Statut de la session',
        enum: ['En cours', 'Terminée'],
        default: 'En cours',
    }),
    (0, class_validator_1.IsEnum)(['En cours', 'Terminée']),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indique si la posture est validée',
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSessionDto.prototype, "posture_valid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Durée (en secondes) pendant laquelle la posture est correcte',
        default: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessionDto.prototype, "correct_duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Score de la posture (0.0 à 100.0)',
        default: 0.0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessionDto.prototype, "posture_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Heure de début de la session (format ISO 8601 : 'YYYY-MM-DDTHH:mm:ssZ')",
        example: '2025-01-25T10:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Heure de fin de la session (optionnelle)",
        example: '2025-01-25T10:05:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "end_time", void 0);
//# sourceMappingURL=create-session.dto.js.map