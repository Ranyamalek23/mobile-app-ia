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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("./session.entity");
const users_entity_1 = require("../users/users.entity");
const posture_entity_1 = require("../posture/posture.entity");
let SessionService = class SessionService {
    constructor(sessionRepository, userRepository, postureRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.postureRepository = postureRepository;
    }
    async create(createSessionDto) {
        const user = await this.userRepository.findOneBy({ id: createSessionDto.user_id });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${createSessionDto.user_id} non trouvé`);
        }
        const posture = await this.postureRepository.findOneBy({ id: createSessionDto.posture_id });
        if (!posture) {
            throw new common_1.NotFoundException(`Posture avec l'ID ${createSessionDto.posture_id} non trouvée`);
        }
        const session = this.sessionRepository.create({
            ...createSessionDto,
            user,
            posture,
        });
        return this.sessionRepository.save(session);
    }
    async findAll() {
        return this.sessionRepository.find({ relations: ['user', 'posture'] });
    }
    async findOne(id) {
        const session = await this.sessionRepository.findOne({
            where: { id },
            relations: ['user', 'posture'],
        });
        if (!session) {
            throw new common_1.NotFoundException(`Session avec l'ID ${id} non trouvée`);
        }
        return session;
    }
    async update(id, updateSessionDto) {
        const session = await this.findOne(id);
        if (updateSessionDto.user_id) {
            const user = await this.userRepository.findOneBy({ id: updateSessionDto.user_id });
            if (!user) {
                throw new common_1.NotFoundException(`Utilisateur avec l'ID ${updateSessionDto.user_id} non trouvé`);
            }
            session.user = user;
        }
        if (updateSessionDto.posture_id) {
            const posture = await this.postureRepository.findOneBy({ id: updateSessionDto.posture_id });
            if (!posture) {
                throw new common_1.NotFoundException(`Posture avec l'ID ${updateSessionDto.posture_id} non trouvée`);
            }
            session.posture = posture;
        }
        Object.assign(session, updateSessionDto);
        return this.sessionRepository.save(session);
    }
    async remove(id) {
        const session = await this.findOne(id);
        await this.sessionRepository.remove(session);
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(posture_entity_1.Posture)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SessionService);
//# sourceMappingURL=session.service.js.map