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
exports.UpdateSessionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const create_session_dto_1 = require("./create-session.dto");
const class_validator_1 = require("class-validator");
class UpdateSessionDto extends (0, mapped_types_1.PartialType)(create_session_dto_1.CreateSessionDto) {
}
exports.UpdateSessionDto = UpdateSessionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "ID de l'utilisateur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSessionDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la posture' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSessionDto.prototype, "posture_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Durée de la session en secondes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSessionDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Statut de la session',
        enum: ['En cours', 'Terminée'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['En cours', 'Terminée']),
    __metadata("design:type", String)
], UpdateSessionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Indique si la posture est validée',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSessionDto.prototype, "posture_valid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Durée correcte (en secondes)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSessionDto.prototype, "correct_duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Score de la posture (0.0 à 100.0)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSessionDto.prototype, "posture_score", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Heure de début de la session (format ISO 8601)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSessionDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Heure de fin de la session (format ISO 8601)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSessionDto.prototype, "end_time", void 0);
//# sourceMappingURL=update-session.dto.js.map