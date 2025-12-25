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
exports.CreateFeedbackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFeedbackDto {
}
exports.CreateFeedbackDto = CreateFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la session associée' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFeedbackDto.prototype, "session_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message du feedback' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type de feedback',
        enum: ['Conseil', 'Alerte'],
        default: 'Conseil',
    }),
    (0, class_validator_1.IsEnum)(['Conseil', 'Alerte']),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "feedback_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gravité du feedback',
        enum: ['Mineur', 'Majeur'],
        default: 'Mineur',
    }),
    (0, class_validator_1.IsEnum)(['Mineur', 'Majeur']),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "severity", void 0);
//# sourceMappingURL=create-feedback.dto.js.map