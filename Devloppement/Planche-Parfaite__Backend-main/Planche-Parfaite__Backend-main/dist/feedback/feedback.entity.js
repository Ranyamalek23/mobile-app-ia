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
exports.Feedback = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const session_entity_1 = require("../session/session.entity");
let Feedback = class Feedback {
};
exports.Feedback = Feedback;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'ID unique du feedback' }),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => session_entity_1.Session, (session) => session.feedbacks, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({ description: 'Session associée à ce feedback' }),
    __metadata("design:type", session_entity_1.Session)
], Feedback.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, swagger_1.ApiProperty)({ description: 'Message du feedback' }),
    __metadata("design:type", String)
], Feedback.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Conseil', 'Alerte'],
        default: 'Conseil',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Type de feedback',
        enum: ['Conseil', 'Alerte'],
        default: 'Conseil',
    }),
    __metadata("design:type", String)
], Feedback.prototype, "feedback_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Mineur', 'Majeur'],
        default: 'Mineur',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Gravité du feedback',
        enum: ['Mineur', 'Majeur'],
        default: 'Mineur',
    }),
    __metadata("design:type", String)
], Feedback.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'Date de création du feedback' }),
    __metadata("design:type", Date)
], Feedback.prototype, "created_at", void 0);
exports.Feedback = Feedback = __decorate([
    (0, typeorm_1.Entity)('feedback')
], Feedback);
//# sourceMappingURL=feedback.entity.js.map