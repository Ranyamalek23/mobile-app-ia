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
exports.UpdateFeedbackDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const create_feedback_dto_1 = require("./create-feedback.dto");
const class_validator_1 = require("class-validator");
class UpdateFeedbackDto extends (0, mapped_types_1.PartialType)(create_feedback_dto_1.CreateFeedbackDto) {
}
exports.UpdateFeedbackDto = UpdateFeedbackDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la session associée' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFeedbackDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message du feedback' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFeedbackDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type de feedback',
        enum: ['Conseil', 'Alerte'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Conseil', 'Alerte']),
    __metadata("design:type", String)
], UpdateFeedbackDto.prototype, "feedback_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Gravité du feedback',
        enum: ['Mineur', 'Majeur'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Mineur', 'Majeur']),
    __metadata("design:type", String)
], UpdateFeedbackDto.prototype, "severity", void 0);
//# sourceMappingURL=update-feedback.dto.js.map