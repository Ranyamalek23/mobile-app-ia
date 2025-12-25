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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedback_entity_1 = require("./feedback.entity");
const session_entity_1 = require("../session/session.entity");
let FeedbackService = class FeedbackService {
    constructor(feedbackRepository, sessionRepository) {
        this.feedbackRepository = feedbackRepository;
        this.sessionRepository = sessionRepository;
    }
    async create(createFeedbackDto) {
        const session = await this.sessionRepository.findOneBy({
            id: createFeedbackDto.session_id,
        });
        if (!session) {
            throw new common_1.NotFoundException(`Session ID ${createFeedbackDto.session_id} non trouvée`);
        }
        const feedback = this.feedbackRepository.create({
            ...createFeedbackDto,
            session,
        });
        return this.feedbackRepository.save(feedback);
    }
    async findAll() {
        return this.feedbackRepository.find({ relations: ['session'] });
    }
    async findOne(id) {
        const feedback = await this.feedbackRepository.findOne({
            where: { id },
            relations: ['session'],
        });
        if (!feedback) {
            throw new common_1.NotFoundException(`Feedback ID ${id} non trouvé`);
        }
        return feedback;
    }
    async update(id, updateFeedbackDto) {
        const feedback = await this.findOne(id);
        if (updateFeedbackDto.session_id) {
            const session = await this.sessionRepository.findOneBy({
                id: updateFeedbackDto.session_id,
            });
            if (!session) {
                throw new common_1.NotFoundException(`Session ID ${updateFeedbackDto.session_id} non trouvée`);
            }
            feedback.session = session;
        }
        Object.assign(feedback, updateFeedbackDto);
        return this.feedbackRepository.save(feedback);
    }
    async remove(id) {
        const feedback = await this.findOne(id);
        await this.feedbackRepository.remove(feedback);
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map