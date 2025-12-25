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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const posture_entity_1 = require("../posture/posture.entity");
const users_entity_1 = require("../users/users.entity");
const feedback_entity_1 = require("../feedback/feedback.entity");
let Session = class Session {
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'ID unique de la session' }),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.sessions),
    (0, swagger_1.ApiProperty)({ description: 'Utilisateur lié à la session' }),
    __metadata("design:type", users_entity_1.User)
], Session.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => posture_entity_1.Posture, (posture) => posture),
    (0, swagger_1.ApiProperty)({ description: 'Posture liée à la session' }),
    __metadata("design:type", posture_entity_1.Posture)
], Session.prototype, "posture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, (feedback) => feedback.session, { cascade: true }),
    (0, swagger_1.ApiProperty)({ description: 'Liste des feedbacks associés à la session' }),
    __metadata("design:type", Array)
], Session.prototype, "feedbacks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Durée de la session en secondes' }),
    __metadata("design:type", Number)
], Session.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['En cours', 'Terminée'], default: 'En cours' }),
    (0, swagger_1.ApiProperty)({ description: 'Statut de la session', enum: ['En cours', 'Terminée'] }),
    __metadata("design:type", String)
], Session.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ description: 'Posture validée', default: false }),
    __metadata("design:type", Boolean)
], Session.prototype, "posture_valid", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, swagger_1.ApiProperty)({ description: 'Durée correcte en secondes' }),
    __metadata("design:type", Number)
], Session.prototype, "correct_duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0.0 }),
    (0, swagger_1.ApiProperty)({ description: 'Score de posture' }),
    __metadata("design:type", Number)
], Session.prototype, "posture_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    (0, swagger_1.ApiProperty)({ description: 'Heure de début' }),
    __metadata("design:type", Date)
], Session.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Heure de fin', required: false }),
    __metadata("design:type", Date)
], Session.prototype, "end_time", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)('sessions')
], Session);
//# sourceMappingURL=session.entity.js.map